import { NextResponse,NextRequest } from "next/server"
import Saved from "@/models/savePostsModel"
import connect from "@/dbConfig/dbConfig"

export const dynamic = 'force-dynamic';

connect()

export async function POST(request : NextRequest){
    try {
        const reqBody = await request.json()
        const {userId} = reqBody

        var savePosts = await Saved.find({userId})
        return NextResponse.json({message:"all saved posts",success:true,data:savePosts})
        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}