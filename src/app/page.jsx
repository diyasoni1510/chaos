"use client"
import React, { useState } from "react";
import Index from "./index";
import { RouteProvider } from "../context";

const Tabs = () => {
  const [CurrentPage, setCurrentPage] = useState("");
  const updateCurrentPage = (page) => {
    setCurrentPage(page);
  };
  const [whoseProfile, setWhoseProfile] = useState("");
  const updateWhoseProfile = (profile) => {
    setWhoseProfile(profile);
  };
  const [messageWithWhom, setMessageWithWhom] = useState("");
  const updateMessageWithWhom = (profile) => {
    setMessageWithWhom(profile);
  };
  return (
    <>
      <RouteProvider
        value={{
          CurrentPage,updateCurrentPage,whoseProfile,updateWhoseProfile,messageWithWhom,updateMessageWithWhom
        }}
      >
        <Index />
      </RouteProvider>
    </>
  );
};

export default Tabs;