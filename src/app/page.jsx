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
  return (
    <>
      <RouteProvider
        value={{
          CurrentPage,updateCurrentPage,whoseProfile,updateWhoseProfile
        }}
      >
        <Index />
      </RouteProvider>
    </>
  );
};

export default Tabs;