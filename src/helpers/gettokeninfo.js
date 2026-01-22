import { NextResponse,NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function gettokeninfo(req){

    try{
    const token=req.cookies.get("token")?.value;
    if (!token) {
      throw new Error("Token not found");
    }
    const encode_data=jwt.verify(token,process.env.TOKEN_SECRET);
    
    return encode_data.id;

    }catch(error){
        throw new Error(error.message);
    }

}