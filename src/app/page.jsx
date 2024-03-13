"use client"
import React, { useState } from "react";
import Index from "./index";
import { RouteProvider } from "../context";

const Tabs = () => {
  const [CurrentPage, setCurrentPage] = useState(localStorage?.getItem("currentpage"));
  const updateCurrentPage = (page) => {
    setCurrentPage(page);
  };
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