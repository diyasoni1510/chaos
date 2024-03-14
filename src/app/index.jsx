"use client";
import React, { useEffect, useState, } from "react";
import LogInOrSignuppage from "./components/loginsignup";
import { Toaster } from "react-hot-toast";
import { useRouteContext } from "../context/index";
import MyProfilePage from "./components/profilepage";
import ProfilePage from "./components/profile/page";
import SearchPage from "./components/searchpage";
import MessageListPage from "./components/messagelist"
import EditProfile from "./components/setdetails"
import MessagePage from "./components/messagepage"
import FollowPage from "./components/followlist"


const Index = () => {
  const { CurrentPage } = useRouteContext();
  const [isLogin,setIsLogin] = useState(false)
  useEffect(()=>{
    localStorage?.getItem("LoggedInUser") && setIsLogin(true)
    console.log(isLogin)
  })
  return (
    <>
     { !isLogin === true || CurrentPage === "login" ? (
        <LogInOrSignuppage />
      ) : CurrentPage === "profile" ? (
        <ProfilePage />
      ) : CurrentPage === "myprofile" ? (
        <MyProfilePage />
      ) : CurrentPage === "search" ? (
        <SearchPage />
      ) : CurrentPage === "messagelist" ? (
        <MessageListPage />
      ) :CurrentPage === "messagepage" ? (
        <MessagePage />
      ) : CurrentPage === "editprofile" ? (
        <EditProfile />
      ) : CurrentPage === "followpage" ? (
        <FollowPage />
      ) : (
        <ProfilePage />
      )}
      <Toaster />
    </>
  );
};

export default Index;
