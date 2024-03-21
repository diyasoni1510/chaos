import { NextResponse,NextRequest } from "next/server"
import Post from "@/models/postModel"
import connect from "@/dbConfig/dbConfig"

export const dynamic = 'force-dynamic';


connect()

export async function POST(request : NextRequest){
    try {
        const reqBody = await request.json()
        const {_id,like,add} = reqBody
        if(add)
        var userToBeUpdate = await Post.findOneAndUpdate({ _id },{ $addToSet: { likes: like }})
    else
    var userToBeUpdate = await Post.findOneAndUpdate({ _id },{ $pull: { likes: like }})

        return NextResponse.json({message:"updated post likes succesfully",success:true})
        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}