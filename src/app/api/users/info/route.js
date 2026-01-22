import { NextResponse } from "next/server";
import { gettokeninfo } from "@/helpers/gettokeninfo";
import { User } from "@/models/User";
import { connect } from "@/dbconfig/dbconfig";

connect();

export async function GET(req){
    try {
       const id=await gettokeninfo(req);
       const user=await User.findOne({_id:id});
       if(!user){
            return NextResponse.json({error:"Didnt  Found Name"},{status:400});
       }

         return NextResponse.json({ username: user.username },{status:200});
        
        
    } catch (error) {

        return NextResponse.json({error:"Error In Info"},{status:500});
        
    }

}