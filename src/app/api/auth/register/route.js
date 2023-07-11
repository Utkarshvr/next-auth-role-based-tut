import connect from "@/connection/connect";
import User from "@/models/User.model.js";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await connect();
    const { name, email, password } = await req.json();
    console.log({ name, email, password });
    const userDB = await User.findOne({ email });
    if (userDB)
      return NextResponse.json("User already exists", { status: 409 });
    const hashedPass = await hash(password, 5);
    const newUser = await User.create({
      name,
      email,
      password: hashedPass,
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
};
