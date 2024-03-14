import connect from "@/dbConfig/dbConfig"
import { NextRequest,NextResponse } from "next/server" 
import Post from "@/models/postModel" 

export const dynamic = 'force-dynamic';
connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {userId,username,post,caption} = reqBody

        const newPost = new Post({
            userId,
            username,
            post,
            caption
        })

        const savedPost = await newPost.save()
        console.log(savedPost)

        return NextResponse.json({message:"Post Uploaded successfully",status:201,savedPost})

    } catch (error:any) {
        return NextResponse.json({error : error.message},{status:500})
    }
}