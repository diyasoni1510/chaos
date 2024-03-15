import { useRouteContext } from "@/context";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

const savedPosts = () => {
  const { updateCurrentPage } = useRouteContext();
  const [savedPostsImage,setSavedPostsImage] = useState([])
  const getAllSavedPosts = async () => {
    const response = await axios.post("/api/posts/getsaveposts", {
      userId: JSON.parse(localStorage?.getItem("LoggedInUser"))._id,
    });
    console.log(response)
  };
  useEffect(()=>{
    getAllSavedPosts()
  },[])
  return (
    <>
      <div>
        <div className="flex items-center py-4 px-2 space-x-4 shadow">
          <IoIosArrowBack
            className="text-2xl"
            onClick={() => {
              updateCurrentPage("profile");
            }}
          />
          <p>Saved Posts</p>
        </div>
        <div className="w-100 flex flex-wrap pt-2">
          <div className="w-1/3 p-1 h-[110px]">
            <div className="bg-gray-200 w-full h-full"></div>
          </div>
          <div className="w-1/3 p-1 h-[110px]">
            <div className="bg-gray-200 w-full h-full"></div>
          </div>
          <div className="w-1/3 p-1 h-[110px]">
            <div className="bg-gray-200 w-full h-full"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default savedPosts;
