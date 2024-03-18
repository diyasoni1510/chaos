import mongoose from "mongoose";
import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModal";
import { NextResponse,NextRequest } from "next/server";

export const dynamic = 'force-dynamic';

connect()

export async function GET(request:NextRequest) {
    try {
        const headers = {
            "Custom-Header": "Custom Value",
          };
        const allUsers = await User.find({ deleted: { $ne: true } })
        return NextResponse.json({message:"all users",data:allUsers})
    } catch (error :any) {
        return NextResponse.json({error:error.message},{status:500})
    }
} 