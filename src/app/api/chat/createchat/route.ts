import connect from "@/dbConfig/dbConfig";
import Chat from "@/models/chatModel"
import { NextResponse,NextRequest } from "next/server";
export const dynamic = 'force-dynamic';

connect()

export async function POST(request:NextRequest) {
    const {userOne,userTwo} = await request.json()

    console.log("userOne - ",userOne,"userTwo - ",userTwo)
    
    var chatRoom ;

    if(userOne !== userTwo ){
        chatRoom = await Chat.findOne({users:{$all:[userOne,userTwo]}})
    }
    else if(userOne === userTwo){
        chatRoom = await Chat.findOne({users:{$eq:[userOne,userTwo]}})
    }

    if(chatRoom)
    return NextResponse.json({message:"chat room exist",data:chatRoom})

    const newChatRoom = new Chat({
        users:[userOne,userTwo]
    })

    const data = await newChatRoom.save()

    return NextResponse.json({message:"chat room created",data})
}