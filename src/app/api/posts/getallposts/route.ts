import mongoose from "mongoose";
import connect from "@/dbConfig/dbConfig";
import Post from "@/models/postModel";
import { NextResponse,NextRequest } from "next/server";

export const dynamic = 'force-dynamic';

connect()

export async function GET(request:NextRequest) {
    try {
        const allPosts = await Post.aggregate([
            {
              $lookup: {
                from: "users",     
                localField: "username",  
                foreignField: "username", 
                as: "userDetails"  
              }
            },
            {
                $sort: { "createdAt": -1 }  // Newest posts first based on 'createdAt'
            }
          ]);
        // return NextResponse.json({message:"all posts",data:allPosts})
        const response = NextResponse.json({message: "all posts", data: allPosts});
        response.headers.set('Cache-Control', 'no-cache');
        return response
    } catch (error :any) {
        return NextResponse.json({error:error.message},{status:500})
    }
} 