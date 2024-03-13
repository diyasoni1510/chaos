"use client";
import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { FaVideo } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRouteContext } from "@/context";

const ProfileHeader = () => {
  // const router = useRouter();
  const { updateCurrentPage } = useRouteContext()
  const setUserLogout = () => {
    localstorage?.removeItem("userToken");
    updateCurrentPage("profile")
  };
  return (
    <div className="bg-pink-50 shadow flex justify-center items-center fixed top-0 w-full z-50">
      <div className="container">
        <div className="flex items-center justify-between py-4">
          <div className="logo text-2xl tracking-widest pl-2">GupShup</div>
          <div className="header-icons space-x-4 items-center justify-center flex md:hidden pr-2">
            <Link href="/" className="text-2xl hover:text-pink-300">
              <FaRegHeart />
            </Link>
            <div onClick={()=>updateCurrentPage("messagelist")} className="text-2xl cursor-pointer hover:text-pink-300">
              <AiFillMessage />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
