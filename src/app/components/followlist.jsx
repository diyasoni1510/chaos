"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouteContext } from "@/context";

const Follow = () => {
  const params = useParams();
  const FollowOf = params.username;
  const router = useRouter();
  const [followers, setFollowers] = useState([]);
  const [allFollowers, setAllFollowers] = useState([]);
  const [allFolllowings, setAllFolllowings] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isMyProfile, setIsMyProfile] = useState();
  const [showFollowers, setShowFollowers] = useState(true);
  const [showFollowing, setShowFollowing] = useState(false);
  const { updateCurrentPage, updateWhoseProfile, whoseProfile } =
    useRouteContext();

  const getUserInfo = async () => {
    try {
      const response = await axios.post("/api/users/getuserfromid", {
        _id:
          whoseProfile === "myprofile"
            ? JSON.parse(localStorage?.getItem("LoggedInUser"))._id
            : whoseProfile,
      });
      setFollowers(response.data.data.followers);
      setFollowing(response.data.data.following);
    } catch (error) {
      console.log(error);
    }
  };
  const getFollowerInfo = async (user) => {
    try {
      const response = await axios.post("/api/users/getuserfromid", {
        _id: user,
      });
      console.log(response);
      setAllFollowers((prev) => [...prev, response.data.data]);
    } catch (error) {
      console.log(error);
    }
  };
  const getFolloweingInfo = async (user) => {
    try {
      const response = await axios.post("/api/users/getuserfromid", {
        _id: user,
      });
      setAllFolllowings((prev) => [...prev, response.data.data]);
    } catch (error) {
      console.log(error);
    }
  };
  const removeFollowers = async (follow) => {
    try {
      const response = await axios.post("/api/users/removefollower", {
        _id: localStorage?.getItem("userId"),
        follow,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const UpdateFollower = async (user, add) => {
    console.log(user, add);
    // if(add === false){
    try {
      const response = await axios.post("/api/users/updatefollowers", {
        _id: localStorage?.getItem("userId"),
        follow: user,
        add,
      });
      toast.success("User Unfollowed successfully");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    getUserInfo()
  },[])

  useEffect(() => {
    console.log(followers);
    followers &&
      followers.map((follower, index) => {
        getFollowerInfo(follower);
      });
  }, [followers]);

  useEffect(() => {
    following &&
      following.map((following, index) => {
        getFolloweingInfo(following);
      });
  }, [following]);
  return (
    <>
      <div>
        <div className="flex items-center py-4 px-2 space-x-4 shadow">
          <IoIosArrowBack
            className="text-2xl"
            onClick={() => {
              updateCurrentPage("myprofile");
              updateWhoseProfile(whoseProfile);
            }}
          />
          <p>{FollowOf}</p>
        </div>
        <div className="flex items-center justify-around py-4">
          <div>
            <p
              className="cursor-pointer"
              onClick={() => {
                setShowFollowing(!showFollowing);
                setShowFollowers(!showFollowers);
              }}
            >
              <span></span>followers
            </p>
            {showFollowers && <div className="border border-black"></div>}
          </div>
          <div>
            <p
              className="cursor-pointer"
              onClick={() => {
                setShowFollowing(!showFollowing);
                setShowFollowers(!showFollowers);
              }}
            >
              <span></span>following
            </p>
            {showFollowing && <div className="border border-black"></div>}
          </div>
        </div>
        {showFollowers && (
          <div className="followers-list text-center">
            {followers &&
              allFollowers &&
              allFollowers?.map((follower, index) => {
                return (
                  <div
                    className="flex p-4 justify-between items-center"
                    key={index}
                  >
                    <div className="flex space-x-4">
                      <div>
                        <img
                          src={follower.pic}
                          className="w-10 h-10 rounded-full object-cover"
                        ></img>
                      </div>
                      <div className="text-sm">
                        <p
                          className="cursor-pointer"
                          onClick={() =>
                            router.push(`/profilepage/${follower.username}`)
                          }
                        >
                          {follower.username}
                        </p>
                        <p>{follower.name}</p>
                      </div>
                    </div>
                    <div>
                      {isMyProfile ? (
                        <button
                          onClick={() => removeFollowers(follower._id)}
                          className="bg-blue-300 text-white font-semibold py-1 px-5 text-sm rounded-md"
                        >
                          Remove
                        </button>
                      ) : follower.following.includes(following._id) ? (
                        <button
                          onClick={() => UpdateFollower(follower._id, false)}
                          className="bg-blue-300 text-white font-semibold py-1 px-5 text-sm rounded-md"
                        >
                          Unfollow
                        </button>
                      ) : (
                        <button
                          className="bg-blue-300 text-white font-semibold py-1 px-5 text-sm rounded-md"
                          onClick={() => {
                            UpdateFollower(follower._id, true);
                          }}
                        >
                          Follow
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
        {showFollowing && (
          <div className="followings-list text-center">
            {following &&
              allFolllowings &&
              allFolllowings?.map((following, index) => {
                return (
                  <div
                    className="flex p-4 justify-between items-center"
                    key={index}
                  >
                    <div className="flex space-x-4">
                      <div>
                        <img
                          src={following.pic}
                          className="w-10 h-10 rounded-full object-cover"
                        ></img>
                      </div>
                      <div className="text-sm">
                        <p
                          className="cursor-pointer"
                          onClick={() =>
                            router.push(`/profilepage/${following.username}`)
                          }
                        >
                          {following.username}
                        </p>
                        <p>{following.name}</p>
                      </div>
                    </div>
                    <div>
                      {isMyProfile ||
                      following.followers.includes(
                        localStorage?.getItem("userId")
                      ) ? (
                        <button
                          onClick={() => UpdateFollower(following._id, false)}
                          className="bg-blue-300 text-white font-semibold py-1 px-5 text-sm rounded-md"
                        >
                          Unfollow
                        </button>
                      ) : (
                        <button
                          className="bg-blue-300 text-white font-semibold py-1 px-5 text-sm rounded-md"
                          onClick={() => UpdateFollower(following._id, true)}
                        >
                          Follow
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
      <Toaster />
    </>
  );
};

export default Follow;
