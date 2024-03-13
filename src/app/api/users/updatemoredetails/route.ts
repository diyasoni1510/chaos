import { NextResponse,NextRequest } from "next/server"
import User from "@/models/userModal"
import connect from "@/dbConfig/dbConfig"
export const dynamic = 'force-dynamic';

connect()

export async function POST(request : NextRequest){
    try {
        const reqBody = await request.json()
        const {username,name,bio,pic} = reqBody

        const userToBeUpdate = await User.findOneAndUpdate({username},{$set:{name,bio,pic}})

        return NextResponse.json({message:"updated user succesfully",success:true})
        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}