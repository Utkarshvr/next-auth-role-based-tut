import CredentialsProvider from "next-auth/providers/credentials";
import LinkedinProvider from "next-auth/providers/linkedin";
import GitHubProvider from "next-auth/providers/github";
import connect from "@/connection/connect";
import User from "@/models/User.model";
import { compare } from "bcrypt";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    LinkedinProvider({
      clientId: process.env.LINKEDIN_ID,
      clientSecret: process.env.LINKEDIN_SECRET,
      async profile(profile) {
        return {
          ...profile,
          role: profile.role ?? "user",
          id: profile.id.toString(),
          image:
            profile.profilePicture["displayImage~"].elements[3].identifiers[0]
              .identifier,
          name: profile.localizedFirstName + " " + profile.localizedLastName,
        };
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      profile(profile) {
        return {
          ...profile,
          role: profile.role ?? "user",
          id: profile.id.toString(),
          image: profile.avatar_url,
        };
      },
    }),
    CredentialsProvider({
      id: "credentials",
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      async authorize(credentials, req) {
        console.log(credentials);
        //Check if the user exists.
        await connect();

        try {
          const user = await User.findOne({
            email: credentials.email,
          });

          if (user) {
            const isPasswordCorrect = await compare(
              credentials.password,
              user.password
            );

            if (isPasswordCorrect) {
              return user;
            } else {
              throw new Error("Wrong Credentials!");
            }
          } else {
            throw new Error("User not found!");
          }
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, profile }) {
      if (user) token.role = user?.role;
      console.log({ user, profile, jwt: token });
      return token;
    },
    async session({ session }) {
      // Get the data of the user every single time
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      // Auto-created id sent by google is updated by the auto-created ID through MongdoDB
      session.user.id = sessionUser?._id.toString();
      session.user.role = sessionUser?.role;
      return session;
    },
    async signIn({ profile }) {
      // When someone signs in with Google Auth, his profile will be passed to this function
      // Then, we save the user to our database after adding some logic
      try {
        // Serverless => lambda => dynamodb
        await connect();
        // Check if a user already exists
        const userExists = await User.findOne({
          email: profile.email,
        });
        console.log({ SignInProfile: profile });
        // If not => create a new user and save user in MongoDB
        if (!userExists) {
          await User.create({
            name: profile?.name,
            email: profile?.email,
            image: profile?.picture,
            password: "OAuth2",
          });
        }

        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  },
  pages: {
    // Specify URLs to be used if you want to create custom sign in, sign out and error pages.
    signIn: "/auth/login",
  },
};
