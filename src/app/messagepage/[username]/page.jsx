"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
import { CgArrowsExchangeV } from "react-icons/cg";
import { CiCamera } from "react-icons/ci";
import { mutate } from "swr";

const MessagePage = () => {
  const params = useParams();
  const MessageWith = params.username;
  const [messageWithUser, setMessageWithUser] = useState();
  const [bgTheme, setBgTheme] = useState();
  const [isOpenThemeBox, setIsOpenThemeBox] = useState(false);
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [userTwo, setUserTwo] = useState();
  const [chatId,setChatId] = useState()
  const router = useRouter();

  const userOne = localStorage?.getItem("userId");

  const getUserInfo = async () => {
    try {
      const response = await axios.post("/api/users/getuserfromusername", {
        username: MessageWith,
      });
      setMessageWithUser(response.data.data);
      setUserTwo(response.data.data._id);
    } catch (error) {
      console.log(error);
    }
  };

  const createChat = async () => {
    console.log(messageWithUser?._id, userOne);
    if (userOne && userTwo) {
      console.log(userOne, messageWithUser?._id);
      const createChat = await axios.post("/api/chat/createchat", {
        userOne,
        userTwo,
      });
      setChatId(createChat.data.data._id)
      console.log(createChat);
    }
  };

  const sendMessage = async (message) => {
    console.log(userOne, userTwo, message);
    try {
      const response = await axios.post("/api/chat/updatechat", {
        chatId,
        message,
        sender:localStorage?.getItem("userId")
      });
      getAllMessage()
      setMessage("")
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllMessage = async () => {
    try {
      const response = await axios.post("/api/chat/allmessages",{chatId});
      setAllMessages(response?.data?.data?.messages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    createChat();
  }, messageWithUser);

  useEffect(() => {
    getAllMessage();
  });

  const themeOptions = [
    {
      themeName: "Sunset",
      theme: "/chatthemes/theme-1.jpg",
    },
    {
      themeName: "Mountains",
      theme: "/chatthemes/theme-2.jpg",
    },
    {
      themeName: "Couple",
      theme: "/chatthemes/theme-3.jpg",
    },
    {
      themeName: "Creative",
      theme: "/chatthemes/theme-4.jpg",
    },
    {
      themeName: "Baal Gopal",
      theme: "/chatthemes/theme-5.jpg",
    },
  ];
  return (
    <>
      <div
        className="h-[600px] bg-center bg-cover"
        style={{
          backgroundImage: `url(${bgTheme})`,
        }}
      >
        <div className="flex justify-between items-center shadow px-2 py-4 bg-white">
          <div className="flex items-center space-x-4">
            <IoIosArrowBack
              className="text-2xl cursor-pointer"
              onClick={() => router.back()}
            />
            <div
              className="w-8 h-8 rounded-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${messageWithUser?.pic})`,
              }}
            ></div>
            <div>
              <p>{messageWithUser?.name}</p>
              <p>{messageWithUser?.username}</p>
            </div>
          </div>
          <div
            className="flex cursor-pointer"
            onClick={() => {
              isOpenThemeBox
                ? setIsOpenThemeBox(false)
                : setIsOpenThemeBox(true);
            }}
          >
            <span className="text-sm">Theme</span> <CgArrowsExchangeV />
          </div>
        </div>
        <div className="display-msgs p-2 h-[580px] overflow-y-scroll">
          {/* <p className="bg-pink-300 w-fit px-4 py-2 rounded-3xl mb-2 float-left clear-both">
            hey..
          </p>
          <p className="bg-pink-300 w-fit px-4 py-2 rounded-3xl mb-2 float-right clear-both">
            hey..
          </p> */}
          {allMessages &&
            allMessages.map((message, index) => {
              if(message.sender === localStorage.getItem("userId"))
              {
              return (
                <p
                  className="bg-pink-300 w-fit px-4 py-2 rounded-3xl mb-2 float-right clear-both"
                  key={index}
                >
                  {message.message}
                </p>
              );
              }
              else{
                return(
                  <p
                  className="bg-pink-300 w-fit px-4 py-2 rounded-3xl mb-2 float-left clear-both"
                  key={index}
                >
                  {message.message}
                </p>
                )
              }
            })}
        </div>
        <div className="msg-input absolute bottom-0 mb-4  w-[325px] mx-4 rounded-3xl flex py-2 items-center px-4 space-x-2 bg-white shadow">
          <CiCamera className="text-3xl" />
          <input
            className="message outline-none w-5/6"
            placeholder="Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></input>
          <span
            className="text-sm text-gray-600 cursor-pointer"
            onClick={() => sendMessage(message)}
          >
            Send
          </span>
        </div>
      </div>

      {isOpenThemeBox && (
        <div className="bg-white absolute left-16 top-[40%] h-[200px] w-[200px] rounded-xl p-4 overflow-y-scroll shadow">
          {themeOptions.map((option, index) => {
            return (
              <div
                className="flex w-full  items-center mb-2 space-x-2 cursor-pointer"
                key={index}
                onClick={() => {
                  setBgTheme(option.theme);
                }}
              >
                <div
                  className="w-5 h-5 rounded-full"
                  style={{
                    backgroundImage: `url(${option.theme})`,
                  }}
                ></div>
                <p>{option.themeName}</p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default MessagePage;
