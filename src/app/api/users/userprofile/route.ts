import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/userModal";
import connect from "@/dbConfig/dbConfig";

export const dynamic = 'force-dynamic';

const getDataFromToken = (request:NextRequest) => {
    try {
        const token = request.cookies.get("userToken")?.value || '';
        const decodedToken:any = jwt.verify(token,process.env.TOKEN_SECRET!)
        return decodedToken.id
    } catch (error:any) {
        throw new Error(error.message)
    }
}

connect()

export async function GET(request:NextRequest) {
    try {
        const userId = await getDataFromToken(request)
        const user = await User.findOne({_id:userId}).select("-password")
        return NextResponse.json({message:"user found",data:user})
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}