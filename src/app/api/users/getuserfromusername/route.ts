import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/userModal";
import connect from "@/dbConfig/dbConfig";

export const dynamic = 'force-dynamic';
connect();

export async function POST(request: NextRequest) {
  try {
    const { username } = await request.json();
    const user = await User.findOne({ username });
    if (user) return NextResponse.json({ message: "user found", data: user });
    else
      return NextResponse.json(
        { message: "user does not exist" },
        { status: 400 }
      );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
