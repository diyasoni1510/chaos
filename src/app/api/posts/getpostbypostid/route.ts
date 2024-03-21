import mongoose from "mongoose";
import connect from "@/dbConfig/dbConfig";
import Post from "@/models/postModel";
import { NextResponse, NextRequest } from "next/server";

export const dynamic = "force-dynamic";

connect();

export async function POST(request: NextRequest) {
  try {
    const { postId } = await request.json();
    const allPosts = await Post.findOne({ _id: postId });
    if (allPosts) {
      const savepostinfo = await Post.aggregate([
        {
          $match: { _id: allPosts._id }, // Match the post by its _id
        },
        {
          $lookup: {
            from: "users",
            localField: "username",
            foreignField: "username",
            as: "userDetails",
          },
        },
        {
            $match: { "userDetails.0.deleted": { $ne: true } }
        },
        {
          $sort: { createdAt: -1 }, // Newest posts first based on 'createdAt'
        },
      ]);
      const response = NextResponse.json({
        message: "all posts",
        data: savepostinfo,
      });
      return response;
    } else {
      const response = NextResponse.json({
        message: "erorrs",
      });
      return response;
    }

    // return NextResponse.json({message:"all posts",data:allPosts})
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
