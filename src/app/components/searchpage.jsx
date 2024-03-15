"use client";
import React, { useEffect, useState } from "react";
import ProfileFooter from "./profile/profilefooter/page";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouteContext } from "@/context";

const SearchPage = () => {
  // const router = useRouter();
  const { updateCurrentPage,updateWhoseProfile } = useRouteContext();
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [searchedUser, setSearchedUser] = useState(null);
  const [searchedId, setSearchedId] = useState(null);
  const [searchedUserName, setSearchedUserName] = useState(null);
  const [searchedUserPic, setSearchedUserPic] = useState("");

  const searchUser = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/searchuser", {
        username: searchVal,
      });
      setLoading(false);
      setSearchedUser(response.data.data.username);
      setSearchedId(response.data.data._id)
      setSearchedUserName(response.data.data.name);
      setSearchedUserPic(response.data.data.pic);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await axios.get("/api/users/allusers");
      setAllUsers(response.data.data);
    } catch (error) {
      toast.error(error.message);
      console.log(error.mesage);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <>
      <div>
        <div className="flex items-center space-x-4 py-4 px-2 border-b">
          <IoIosArrowBack
            className="text-2xl cursor-pointer"
            onClick={() => {
              updateCurrentPage("profile");
            }}
          />
          <p>Search</p>
        </div>
        <div className="flex justify-between bg-gray-200 p-2 m-2 rounded-md">
          <div className="flex">
            <label htmlFor="search">
              <CiSearch className="text-2xl" />
            </label>
            <input
              type="text"
              name="search"
              placeholder="Search..."
              className="text-sm bg-transparent outline-none w-full"
              value={searchVal}
              onChange={(e) => {
                setSearchVal(e.target.value);
              }}
            />
          </div>
          <div>
            <button onClick={searchUser}>Search</button>
          </div>
        </div>

        <div className="all-users-list p-2">
          {/* {allUsers.map((user, id) => {
            return (
              <div className="flex space-x-3 mb-2" key={user._id}>
                <div>
                  <img src="/images/user-dp.png" className="w-12"></img>
                </div>
                <div className="text-sm">
                  <p>{user.username}</p>
                  <p className=" text-gray-500">name</p>
                </div>
              </div>
            );
          })} */}
          {loading && (
            <>
              {" "}
              <div className="bg-gray-100 h-[50px] w-full rounded-md mb-3"></div>
              <div className="bg-gray-100 h-[50px] w-full rounded-md mb-3"></div>
              <div className="bg-gray-100 h-[50px] w-full rounded-md mb-3"></div>
              <div className="bg-gray-100 h-[50px] w-full rounded-md mb-3"></div>
              <div className="bg-gray-100 h-[50px] w-full rounded-md mb-3"></div>{" "}
            </>
          )}

          {searchedUser !== null && (
            <div
              className="cursor-pointer"
              onClick={() => {
                updateCurrentPage("myprofile");
                updateWhoseProfile(searchedId);
              }}
            >
              <div className="flex space-x-3 mb-2">
                <div className="w-[40px] h-[40px] ">
                  <img
                    src={searchedUserPic}
                    className="w-full h-full object-cover rounded-full"
                  ></img>
                </div>
                <div className="text-sm">
                  <p>{searchedUser ? searchedUser : ""}</p>
                  <p className=" text-gray-500">
                    {searchedUserName ? searchedUserName : "name"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <ProfileFooter />
      <Toaster />
    </>
  );
};

export default SearchPage;
