"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { IoPersonAddOutline } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { HiDotsVertical } from "react-icons/hi";
import { MdOutlineGridOn } from "react-icons/md";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { GoPerson } from "react-icons/go";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import useSWR from "swr";
import { useRouteContext } from "@/context";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState(
    JSON.parse(localStorage?.getItem("LoggedInUser"))
  );
  const [posts, setPosts] = useState([]);
  const [pic, setPic] = useState("");
  const [userId, setUserId] = useState("");
  const [userUserName, setUserUserName] = useState([]);
  const [userName, setUserName] = useState();
  const [bio, setBio] = useState();
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [edit, setEdit] = useState(false);
  const { updateCurrentPage } = useRouteContext()

  const pathname = usePathname();
  const username = pathname.split("page/").pop();
  const getAllPosts = async () => {
    try {
      
      const post = await axios.post("/api/posts/getposts", {
        userId: JSON.parse(localStorage?.getItem("LoggedInUser"))._id,
      });
      console.log("post"+post)
      setPosts([post.data.data][0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // getUserFromId();
    getAllPosts()
  }, []);
  const followUser = async (follow) => {
    try {
      const response = await axios.post("/api/users/updatefollowers", {
        _id: localStorage?.getItem("userId"),
        follow,
        add: true,
      });
      toast.success(`You are now following ${userUserName}`);
      getUserFromId();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const UnfollowUser = async (user) => {
    try {
      const response = await axios.post("/api/users/updatefollowers", {
        _id: localStorage?.getItem("userId"),
        follow: user,
        add: false,
      });
      toast.success(`${userUserName} Unfollowed successfully`);
      getUserFromId();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="block md:hidden">
        <div className="flex justify-between items-center py-4 px-2  shadow relative">
          <div className="flex justify-center items-center space-x-4">
            <button
              onClick={() => {
                updateCurrentPage("profile")
              }}
            >
              <IoIosArrowBack className="text-2xl" />
            </button>
            <p className="font-semibold">{user.username ? user.username : ""}</p>
          </div>
          {userUserName === localStorage?.getItem("username") && (
            <div className="flex flex-col justify-center items-center space-x-4 ">
              <HiDotsVertical
                className="text-2xl"
                onClick={() => (edit === true ? setEdit(false) : setEdit(true))}
              />
              {edit === true && (
                <div className="cursor-pointer absolute top-12 border right-0 bg-white p-2">
                  <Link
                    href={`/setdetails/${localStorage?.getItem("username")}`}
                  >
                    Edit profile
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="px-2 flex items-center pt-5">
          <div className="flex-shrink-0 w-[60px] h-[60px]">
              <img
                src={user?.pic}
                className=" h-full w-full rounded-full object-cover ring-1 ring-pink-400 ring-offset-2"
              ></img>
          </div>
          <div className="flex w-full space-x-4 justify-center">
            <div className="text-center">
              <p className="font-semibold">{posts.length}</p>
              <p className="text-sm text-gray-500">Posts</p>
            </div>
            <div className="text-center">
              <Link href={`/follow/${username}`}>
                <p className="font-semibold">{user.followers.length}</p>
                <p className="text-sm text-gray-500">Followers</p>
              </Link>
            </div>
            <div className="text-center">
              <Link href={`/follow/${username}`}>
                <p className="font-semibold">{user.following.length}</p>
                <p className="text-sm text-gray-500">Following</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col pl-3 px-2 text-sm">
          <p className=" pt-2">{user.username}</p>
          <p className="text-gray-400 text-sm">{user.name}</p>
          <p className="text-xs">{user.bio}</p>
          <p className="text-xs cursor-pointer text-sky-400">
            youtube.com/@username
          </p>
        </div>
        <div className="flex px-2 my-3 justify-between">
          {console.log(user.username,JSON.parse(localStorage?.getItem("LoggedInUser")).username)}
          {user.username === JSON.parse(localStorage?.getItem("LoggedInUser")).username ? (
            <button className="bg-pink-300 text-white font-semibold py-1 px- rounded-md px-6">
              Edit Profile
            </button>
          ) : followers.includes(localStorage?.getItem("userId")) ? (
            <button
              className="bg-pink-300 text-white font-semibold py-1 px-10 rounded-md"
              onClick={() => UnfollowUser(userId)}
            >
              Unfollow
            </button>
          ) : (
            <button
              className="bg-pink-300 text-white font-semibold py-1 px-10 rounded-md"
              onClick={() => followUser(userId)}
            >
              Follow
            </button>
          )}
          <Link
            href={`/messagepage/${userUserName}`}
            className="bg-gray-200 font-semibold py-1 px-10 rounded-md"
          >
            Message
          </Link>
          <button className="bg-gray-200 font-semibold py-1 px-3 rounded-md">
            <IoPersonAddOutline />
          </button>
        </div>
        <div className="px-2 flex justify-around shadow-sm py-3">
          <MdOutlineGridOn className="text-2xl w-full border-b-2 border-black" />
          <MdOutlineOndemandVideo className="text-2xl w-full" />
          <GoPerson className="text-2xl  w-full" />
        </div>
        <div>
          <div className="flex flex-wrap">
            {posts.map((post, index) => {
              return (
                <div
                  className="col-span-1 h-[100px] w-[120px] border  "
                  key={index}
                >
                  <img
                    src={post.post}
                    alt="post"
                    className="w-full object-fill h-full"
                  ></img>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default ProfilePage;
