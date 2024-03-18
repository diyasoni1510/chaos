"use client";
import { useRouteContext } from "@/context";
import axios from "axios";
import React from "react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const DeleteAccount = () => {
  const [isSure, setIsSure] = useState(false);
  const [password,setPassword] = useState("")
  const {updateCurrentPage,updateWhoseProfile} = useRouteContext()
  const [loading,setLoading] = useState(false)
  const deleteaccount = async() => {
    if(!password){
        toast.error("password required")
        return
    }
    try {
        setLoading(true);
        const verifydeletetion = await axios.post("api/users/deleteaccount", {
          username:JSON.parse(localStorage.getItem("LoggedInUser")).username,
          password,
        });
        setLoading(false);
        updateCurrentPage("login")
        localStorage?.removeItem("LoggedInUser");
      } catch (error) {
        toast.error(error.response.data.message)
        console.log(error)
        setLoading(false);
      }
  }
  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center">
        {isSure ? (
          <div className="h-full w-3/5 gap-4 text-center flex flex-col justify-center items-center">
            <p>To confirm deletion of your accout, enter your password</p>
            <input
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
              type="password"
              className="bg-blue-200 outline-none p-2 hover:bg-white hover:border hover:border-blue-300"
              placeholder="Enter password"
            />
            <button onClick={()=>deleteaccount()} className="px-2 py-1 bg-red-500 text-white font-semibold">Delete</button>
            <button onClick={()=>{
                updateCurrentPage("myprofile")
                updateWhoseProfile("myprofile")
            }}>Skip</button>
          </div>
        ) : (
          <div className="h-full w-3/5 gap-4 text-center flex flex-col justify-center items-center">
            <p>Are you sure you want to delete your account ?</p>
            <button
              onClick={() => setIsSure(true)}
              className="bg-red-500 text-sm px-2 py-1 font-semibold
             text-white"
            >
              YES
            </button>
          </div>
        )}
      </div>
      <Toaster/>
    </>
  );
};

export default DeleteAccount;
