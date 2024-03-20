import { NextResponse,NextRequest } from "next/server"
import Chat from "@/models/chatModel"
import connect from "@/dbConfig/dbConfig"

export const dynamic = 'force-dynamic';


connect()

export async function POST(request : NextRequest){
    try {
        const reqBody = await request.json()
        const {chatId,post,user,sender} = reqBody

        const newSentPost = {
            post,
            user,
            sender
        };
       
        var sentMessage = await Chat.findOneAndUpdate({ _id:chatId },{ $addToSet: { sentpost: newSentPost }})
        return NextResponse.json({message:"post sent",success:true,data:sentMessage})
        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}