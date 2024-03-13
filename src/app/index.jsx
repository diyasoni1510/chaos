"use client";
import React, { useEffect, } from "react";
import LogInOrSignuppage from "./loginsignup/page";
import { Toaster } from "react-hot-toast";
import { useRouteContext } from "../context/index";
import MyProfilePage from "./profilepage/page";
import ProfilePage from "./profile/page";
import SearchPage from "./searchpage/page";
import MessageListPage from "./messagelist/page"
import EditProfile from "./setdetails/page"


const Index = () => {
  const { CurrentPage } = useRouteContext();
  console.log(CurrentPage)
  useEffect(()=>{
    localStorage?.setItem("currentpage",CurrentPage)
  },[CurrentPage])
  return (
    <>
     { !localStorage?.getItem("LoggedInUser") ? (
        <LogInOrSignuppage />
      ) : CurrentPage === "profile" ? (
        <ProfilePage />
      ) : CurrentPage === "myprofile" ? (
        <MyProfilePage />
      ) : CurrentPage === "search" ? (
        <SearchPage />
      ) : CurrentPage === "messagelist" ? (
        <MessageListPage />
      ) : CurrentPage === "editprofile" ? (
        <EditProfile />
      ) : (
        <ProfilePage />
      )}
      <Toaster />
    </>
  );
};

export default Index;