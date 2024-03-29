"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
import { CgArrowsExchangeV } from "react-icons/cg";
import { CiCamera } from "react-icons/ci";
import { mutate } from "swr";
import { useRouteContext } from "@/context";

const MessagePage = () => {
  const [messageWithUser, setMessageWithUser] = useState();
  const [bgTheme, setBgTheme] = useState();
  const [isOpenThemeBox, setIsOpenThemeBox] = useState(false);
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [allSentPost,setAllSentPost] = useState([])
  const [userTwo, setUserTwo] = useState();
  const [chatId, setChatId] = useState("");
  const router = useRouter();

  const userOne = JSON.parse(localStorage?.getItem("LoggedInUser"))._id;

  const {
    updateCurrentPage,
    messageWithWhom,
    updateWhoseProfile,
    postThatSent,
    updatePostThatSent
  } = useRouteContext();

  const getUserInfo = async () => {
    try {
      const response = await axios.post("/api/users/getuserfromid", {
        _id: messageWithWhom,
      });
      setMessageWithUser(response.data.data);
      setUserTwo(response.data.data._id);
    } catch (error) {
      // console.log(error);
    }
  };

  const createChat = async () => {
    if (userOne && userTwo) {
      const createChat = await axios.post("/api/chat/createchat", {
        userOne,
        userTwo,
      });
      setChatId(createChat.data.data._id);
    }
  };

  const sendMessage = async (message) => {
    try {
      const response = await axios.post("/api/chat/updatechat", {
        chatId,
        message,
        sender: JSON.parse(localStorage?.getItem("LoggedInUser"))._id,
      });
      getAllMessage();
      setMessage("");
    } catch (error) {
      // console.log(error);
    }
  };

  const sendPost = async (post,
    user,) => {
    try {
      const response = await axios.post("/api/chat/updatesentpost", {
        chatId,
        post,
        user,
        sender: JSON.parse(localStorage?.getItem("LoggedInUser"))._id,
      });
      // console.log(response)
      getAllMessage();
    updatePostThatSent("")

    } catch (error) {
      // console.log(error);
    }
  };

  const getAllMessage = async () => {
    try {
      const response = await axios.post("/api/chat/allmessages", { chatId });
      setAllMessages(response?.data?.data?.messages);
      setAllSentPost(response?.data?.data?.sentpost)
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {}, []);
  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    createChat();
  }, [messageWithUser]);

  useEffect(() => {
    getAllMessage();
  });

  useEffect(() => {
    if(postThatSent){
      sendPost(postThatSent.pic,postThatSent.username)
    }
    // allSentPost && 
    // updatePostThatSent("")
  }, [chatId]);

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
        className="h-[620px] bg-center bg-cover overflow-y-scroll"
        style={{
          backgroundImage: `url(${bgTheme})`,
        }}
      >
        <div className="flex justify-between items-center shadow px-2 py-4 bg-white">
          <div className="flex items-center space-x-4">
            <IoIosArrowBack
              className="text-2xl cursor-pointer"
              onClick={() => updateCurrentPage("messagelist")}
            />
            <div
              className="w-8 h-8 rounded-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${messageWithUser?.pic})`,
              }}
            ></div>
            <div
              className="cursor-pointer"
              onClick={() => {
                updateCurrentPage("myprofile");
                updateWhoseProfile(messageWithUser?._id);
              }}
            >
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
        <div className="h-[500px] overflow-y-scroll">
          {allSentPost.length > 0 &&
          <div className="display-sentpost p-2  overflow-y-scroll">
            {
            allSentPost.map((post) => {
              if (
                post.sender ===
                JSON.parse(localStorage?.getItem("LoggedInUser"))._id
              ) {
                return (
                  <div className=" mb-8 float-right w-[200px] h-[200px]" key={post._id}>
                    <p>{post.user}&apos;s post</p>
                    <img src={post.post} alt="" className="h-full w-full object-cover" />
                  </div>
                );
              } else {
                return (
                  <div className=" mb-8 float-left w-[200px] h-[200px]" key={post._id}>
                    <p>{post.user}&apos;s post</p>
                    <img src={post.post} alt="" className="h-full w-full object-cover" />
                  </div>
                );
              }
            })}
        </div>
}
          {allMessages.length > 0 &&
        <div className="display-msgs p-2 overflow-y-scroll">
{
            allMessages.map((message, index) => {
              if (
                message.sender ===
                JSON.parse(localStorage?.getItem("LoggedInUser"))._id
              ) {
                return (
                  <p
                    className="bg-blue-300 w-fit px-4 py-2 rounded-3xl mb-2 float-right clear-both"
                    key={index}
                  >
                    {message.message}
                  </p>
                );
              } else {
                return (
                  <p
                    className="bg-blue-300 w-fit px-4 py-2 rounded-3xl mb-2 float-left clear-both"
                    key={index}
                  >
                    {message.message}
                  </p>
                );
              }
            })}
        </div>
}
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
                <div className="w-5 h-5 rounded-full">
                  <img
                    src={option.theme}
                    alt=""
                    className="h-full object-cover rounded-full w-full"
                  />
                </div>
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
