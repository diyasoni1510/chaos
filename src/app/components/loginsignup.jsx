"use client"
import React from "react";
import Login from "./login/page"
import Signup from "./signup/page"
import { Toaster } from "react-hot-toast";

const Page = () => {
    const [openTab, setOpenTab] = React.useState(1);
    return (
      <>
        <div className="flex flex-wrap h-screen  px-2 ">
          <div className="w-full">
            <ul
              className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
              role="tablist"
            >
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center rounded-xl">
                <a
                  className=
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal bg-blue-400 text-white" 
                    
                  onClick={e => {
                    e.preventDefault();
                    setOpenTab(1);
                  }}
                  data-toggle="tab"
                  href="#link1"
                  role="tablist"
                >
                  LogIn
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className=
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal  bg-blue-400 text-white"
                  onClick={e => {
                    e.preventDefault();
                    setOpenTab(2);
                  }}
                  data-toggle="tab"
                  href="#link2"
                  role="tablist"
                >
                  SignUp
                </a>
              </li>
              
            </ul>
            <div className="break-words flex flex-col h-[600px] items-center justify-center mb-6 min-w-0 relative rounded shadow w-full">
              <div className="px-4">
                <div className="tab-content tab-space">
                  <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                    <Login/>
                  </div>
                  <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                    <Signup/>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
        <Toaster/>
      </>
    );
}

export default Page