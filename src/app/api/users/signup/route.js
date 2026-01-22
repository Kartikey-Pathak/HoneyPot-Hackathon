import { connect } from "@/dbconfig/dbconfig.js";
import { User } from "@/models/User";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcryptjs"
 
connect();  //DB Connection

export async function POST(req) {
    try {
        const body=await req.json();
        const {username,email,password}=body;

        console.log(body);
        const user=await User.findOne({email})
        if(user){
             return NextResponse.json({message:"User Exists"},{status:401})
        }
        const hash=await bcrypt.hash(password,10);

       const newuser= new User({
            username,
            email,
            password:hash
        })

        const save=await newuser.save();
        console.log(save);
         
         return NextResponse.json({message:"User Created",success:true,newuser},{status:201})

        
    } catch (error) {
        console.log(error,"Problem occured");
        return NextResponse.json({error:"Server Error"},{status:500})
    }
    
}