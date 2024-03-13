"use client"
import React, { useEffect, useState } from "react";
import Index from "./index";
import { RouteProvider } from "../context";

const Tabs = () => {
  const [CurrentPage, setCurrentPage] = useState();
  const updateCurrentPage = (page) => {
    setCurrentPage(page);
  };
  useEffect(()=>{
    setCurrentPage(localStorage?.getItem("currentpage"))
  },[CurrentPage])
  return (
    <>
      <RouteProvider
        value={{
          CurrentPage,updateCurrentPage
        }}
      >
        <Index />
      </RouteProvider>
    </>
  );
};

export default Tabs;