import connect from "@/dbConfig/dbConfig";
import Chat from "@/models/chatModel";
import { NextResponse,NextRequest } from "next/server";
export const dynamic = 'force-dynamic';

connect()

export async function POST(request:NextRequest){
    try {
        const { chatId } = await request.json()
        const allMessages = await Chat.findOne({_id:chatId})
        return NextResponse.json({message: "all chats", data: allMessages});
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
        
    }
}