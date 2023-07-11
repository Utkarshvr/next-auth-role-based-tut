import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png",
      required: false,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

//If the User collection does not exist create a new one.
const User = models.User || model("User", userSchema);
export default User;
