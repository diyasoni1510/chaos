import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModal";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const dynamic = "force-dynamic";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { username, password } = reqBody;

    const user = await User.findOne({ username });
    if (user) {
      try {
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
          return NextResponse.json(
            { message: "Password is incorrect" },
            { status: 400 }
          );
        }
      } catch (error) {
        // Handle any errors that might occur during the password comparison
        console.error("Error comparing passwords:", error);
        return NextResponse.json(
          { message: "Error comparing passwords" },
          { status: 500 }
        );
      }
    } 
    await User.findOneAndUpdate({ username }, { deleted: true });
    const response = NextResponse.json({
      messae: "Deletion successfull",
      success: true,
      data: user,
    });
    response.cookies.set("userToken","")

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
