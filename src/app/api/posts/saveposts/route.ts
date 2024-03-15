import connect from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Saved from "@/models/savePostsModel";

export const dynamic = "force-dynamic";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { userId, postId } = reqBody;

    const isSaved = await Saved.findOne({userId,postId})

    if(isSaved){
        return NextResponse.json({
            message: "Post exists in saved ",
            status: 201,
            isSaved,
          });
    }

    const newSaved = new Saved({
      userId,
      postId,
    });

    const saved = await newSaved.save();

    return NextResponse.json({
      message: "Post Saved successfully",
      status: 201,
      saved,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
