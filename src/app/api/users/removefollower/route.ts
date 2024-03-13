import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModal";
import connect from "@/dbConfig/dbConfig";

export const dynamic = "force-dynamic";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { _id, follow } = reqBody;
      var userToBeUpdate = await User.findOneAndUpdate(
        { _id },
        { $pull: { followers: follow } }
      );
      var userToBeUpdate = await User.findOneAndUpdate(
        { _id: follow },
        { $pull: { following: _id } }
      );
    return NextResponse.json({
      message: "updated followers succesfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
