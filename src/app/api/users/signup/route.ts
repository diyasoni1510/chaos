import connect from "@/dbConfig/dbConfig"
import User from "@/models/userModal"
import { NextRequest,NextResponse } from "next/server" 
import bcryptjs from "bcryptjs" 
import jwt from "jsonwebtoken";
export const dynamic = 'force-dynamic';

connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {username,email,password,pic} = reqBody

        console.log(reqBody)

        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error: "user already exists"},{status:200})
        }
        
        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password,salt)

        const tokenData = {
            username,
            email ,
            password
        }
        const token =  jwt.sign(tokenData,process.env.TOKEN_SECRET!)

        const newUser = new User({
            username,
            email,
            password:hashPassword,
            pic,
        })

        const data = await newUser.save()

        const response = NextResponse.json({message:"User created successfully",status:201,data})
        response.cookies.set("userToken",token,{httpOnly:true})
        

        return response

    } catch (error:any) {
        return NextResponse.json({error : error.message},{status:500})
    }
}