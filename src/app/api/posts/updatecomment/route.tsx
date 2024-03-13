import { NextResponse,NextRequest } from "next/server"
import Post from "@/models/postModel"
import connect from "@/dbConfig/dbConfig"

export const dynamic = 'force-dynamic';


connect()

export async function POST(request : NextRequest){
    try {
        const reqBody = await request.json()
        const {_id,user,userpic,comment} = reqBody
        const newComment = {
            user,
            userpic,
            comment,
            createdAt: new Date()  
        };
        var postToBeUpdate = await Post.findOneAndUpdate({ _id },{ $addToSet: { comments: newComment }})
        return NextResponse.json({message:"updated post comment succesfully",success:true,data:postToBeUpdate})
        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}