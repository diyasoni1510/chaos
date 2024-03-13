import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModal";
import connect from "@/dbConfig/dbConfig";

export const dynamic = "force-dynamic";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { _id, follow, add } = reqBody;
    console.log(add);
    if (add) {
      var userToBeUpdate = await User.findOneAndUpdate(
        { _id },
        { $addToSet: { following: follow } }
      );
      var userToBeUpdate = await User.findOneAndUpdate(
        { _id: follow },
        { $addToSet: { followers: _id } }
      );
    } else {
      var userToBeUpdate = await User.findOneAndUpdate(
        { _id },
        { $pull: { following: follow } }
      );
      var userToBeUpdate = await User.findOneAndUpdate(
        { _id: follow },
        { $pull: { followers: _id } }
      );
    }

    return NextResponse.json({
      message: "updated followers succesfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
