import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModal";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const dynamic = 'force-dynamic';

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { username, password } = reqBody;

    const user = await User.findOne({ username, deleted : {$ne : true}} );
    
    if (user) {
  try {
    const validPassword = await bcryptjs.compare(password, user.password);
    console.log("validPassword", validPassword);

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

    else {
      return NextResponse.json(
        { message: "user does not exist" },
        { status: 400 }
      );
    }

    const tokenData = {
        id: user._id,
        username : user.username,
        email : user.email
    }
    const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!)

    const response = NextResponse.json({
        messae:"Login successfull",
        success:true,
        data:user
    })
    response.cookies.set("userToken",token,{httpOnly:true})

    return response
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
