import CredentialsProvider from "next-auth/providers/credentials";
import LinkedinProvider from "next-auth/providers/linkedin";
import GitHubProvider from "next-auth/providers/github";
import authenticateUser from "@/utils/authenticateUser";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    LinkedinProvider({
      clientId: process.env.LINKEDIN_ID,
      clientSecret: process.env.LINKEDIN_SECRET,
      profile(profile) {
        console.log({ profile });
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
        console.log({ profile });
        return {
          ...profile,
          role: profile.role ?? "user",
          id: profile.id.toString(),
          image: profile.avatar_url,
        };
      },
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter your username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        return authenticateUser(credentials);
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      console.log({ JWT: token, user });
      if (user) token.role = user.role;
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
};
