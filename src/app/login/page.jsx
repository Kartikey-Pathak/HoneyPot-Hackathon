"use client";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import { use, useState } from "react";
import Link from 'next/link'
import { useRouter } from "next/navigation";



export default function Login() {
    const [loading, setloading] = useState(false);
    const router = useRouter();
    const [user, setuser] = useState({
        email: "",
        password: ""
    });

    const notify = () => toast('Logged In Account.');

    const Login = async () => {
      
        if (!user.email || !user.password) {
            alert("Fill The Details");
            return;
        }
        try {
            setloading(true);
             const resp= await axios.post("/api/users/login",user);
             console.log("Sign Up Success",resp.data);

             router.push("/");
              notify();
        } catch (error) {
         const message =error?.response?.data?.error || "Something went wrong";

    toast.error(message);
    console.log(error);

        } finally {
            setloading(false);
        }



    }


    return (
        <>
            <div className=" w-full h-screen flex items-center flex-col justify-center">
                <Toaster />

                <h1 className=" font-bold text-white text-5xl mb-11">LogIn Account</h1>
                {loading ? <h1 className=" font-bold text-white text-xl mb-2">Logging In....</h1> : null}
                <div className=" flex items-center justify-center flex-col gap-5">
                    <div className=" flex items-center w-full max-w-md gap-5 justify-between">
                        <label htmlFor="email">Email : </label>
                        <input type="email" id="email" className=" border-2 border-gray-300 rounded-xl p-2" placeholder="Enter email" onChange={(e) => { setuser({ ...user, email: e.target.value }) }} />
                    </div>
                    <div className=" flex items-center gap-5 w-full  max-w-md justify-between">
                        <label htmlFor="password">Password : </label>
                        <input type="password" id="password" className=" border-2 border-gray-300 rounded-xl p-2" placeholder="Enter password" onChange={(e) => { setuser({ ...user, password: e.target.value }) }} />
                    </div>
                    <button onClick={Login} className=" text-white bg-gray-700 px-7 py-3 mt-5 border-2 border-gray-950 cursor-pointer hover:opacity-85 transition-all active:opacity-85 rounded-xl">Submit</button>

                    <h3 className=" mt-5 text-gray-400 font-medium text-xl">Already have account? <Link href="/signup" className=" text-blue-700">SignUp</Link></h3>
                </div>
            </div>
        </>
    )
}