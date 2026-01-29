"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Input } from "../../components/ui/input";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Chat() {
    const [side, setside] = useState();
    const [input,setinput]=useState("");
    const ref=useRef();
    const [chats, setchats] = useState([{
        title: "",
        role: "",
        content: ""
    }]);
    useEffect(() => {
        const handlesize = () => {
            if (window.innerWidth < 1100) {
                setside(true);
            } else {
                setside(false);
            }
        }
        window.addEventListener("resize", handlesize);
        handlesize();

        return () => window.removeEventListener("resize", handlesize);
    })

    useEffect(() => {
        const gettitle = async () => {
            try {
                let resp = await axios.get("/api/chatai", { withCredentials: true });
                console.log(resp);

            } catch (error) {
                console.log(error);
            }
        }
        gettitle();
    })

    const send=async()=>{
        try {
            let resp=axios.post("/ap/chatai",{chats:chats},{ withCredentials: true });
            
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <nav className="h-12 border-b-2 border-[#CBCBCB] flex-row flex justify-between items-center p-5 dark:border-[#303030]">
                <h2 className="dark:text-white text-black text-2xl font-medium">LLama</h2>
                {side ?
                    <div>
                        <div className="drawer">
                            <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
                            <div className="drawer-content ">
                                {/* Page content here */}
                                <label htmlFor="my-drawer-1" className=" drawer-button"><i class="fa-solid fa-bars text-2xl cursor-pointer hover:text-gray-500 transition-all active:text-gray-500"></i></label>
                            </div>
                            <div className="drawer-side bg-[#181818]">
                                <label htmlFor="my-drawer-1" aria-label="close sidebar" className="drawer-overlay"></label>
                                <ul className="menu bg-[#181818] min-h-full w-80 p-4 ">
                                    {/* Sidebar content here */}
                                    <li><a>Sidebar Item 1</a></li>
                                    <li><a>Sidebar Item 2</a></li>
                                </ul>
                            </div>
                        </div>
                    </div> : null
                }

            </nav>

            <section className=" flex dark:bg-[#212121]  h-[40.3rem] w-full bg-white ">
                {/* side Area */}
                <div className=" h-full w-80 bg-[#181818] overflow-hidden">
                    <div className="  mt-10 w-full h-full overflow-y-scroll">
                        {



                        }
                    </div>
                </div>

                {/* chat area */}

                <div className="  relative w-full h-full overflow-y-scroll ">
                    <div className="chat chat-start">
                        <div className="chat-bubble">
                            It's over Anakin,
                            <br />
                            I have the high ground.
                        </div>
                    </div>
                    <div className="chat chat-end">
                        <div className="chat-bubble">You underestimate my power!</div>
                    </div>


                    <div className="absolute bottom-10 z-50 left-0 flex flex-row items-center justify-center w-full mx-auto right-0 flex-col gap-1">
                        <Input
                        ref={ref}
                            type="text"
                            placeholder="Ask Anything"
                            onChange={(e) => setUser(setinput(e.target.value))}
                            value={chats.value}

                            className=" p-5 cursor-pointer rounded-4xl h-14  w-[55rem]"
                        />
                        <button className=" cursor-pointer hover:bg-gray-300 hover:dark:bg-gray-300 transition-all active:dark:bg-gray-400 active:bg-gray-400 size-12 dark:bg-white bg-black rounded-full flex items-center justify-center"><i className=" text-white dark:text-black fa-solid fa-arrow-up"></i></button>
                    </div>
                </div>

            </section>
        </>
    );
}
