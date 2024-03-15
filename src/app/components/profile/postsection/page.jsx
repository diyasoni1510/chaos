"use client";
import React, { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { MdOutlineSaveAlt } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";
import { FaRegSmileBeam } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { MdGif } from "react-icons/md";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import useSWR, { mutate } from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const PostSection = () => {
  const [sharePost, setSharePost] = useState(false);
  const [showComments, setShowComments] = useState("");
  const [postSentTo, setPostSentTo] = useState("");
  const [comment, setComment] = useState("");
  const [islike, setIsLike] = useState();

  const { data: allPosts, error: postError } = useSWR(
    "/api/posts/getallposts",
    fetcher
  );
  const { data: allUsers, error: userError } = useSWR(
    "/api/users/allusers",
    fetcher
  );

  if (postError) return <div>Failed to load</div>;
  if (!allPosts)
    return (
      <div className="h-[600px] flex justify-center items-center">
        <svg
          aria-hidden="true"
          className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    );

  const updateLikes = async (_id, like, add) => {
    console.log(_id, like);
    const response = await axios.post("/api/posts/updatelike", {
      _id,
      like,
      add,
    });
    toast.success("Post like");
    mutate("/api/posts/getallposts");
  };

  const sendComment = async (e, postId) => {
    if (e.key === "Enter") {
      const response = await axios.post("/api/posts/updatecomment", {
        _id: postId,
        user: JSON.parse(localStorage?.getItem("LoggedInUser")).username,
        userpic: JSON.parse(localStorage?.getItem("LoggedInUser")).pic,
        comment,
      });
      toast.success("comment sent");
      setComment("");
      mutate("/api/posts/getallposts");
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const followUser = async (follow) => {
    try {
      const response = await axios.post("/api/users/updatefollowers", {
        _id: JSON.parse(localStorage?.getItem("LoggedInUser"))._id,
        follow,
        add: true,
      });
      mutate("/api/posts/getallposts");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const savePost = async (postId) => {
    console.log(postId);
    try {
      const response = await axios.post("/api/posts/saveposts", {
        userId: JSON.parse(localStorage?.getItem("LoggedInUser"))._id,
        postId
      });
      console.log(response)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mb-10">
      {allPosts.data.map((post, index) => {
        return (
          <div
            className="mt-2 md:border border-gray-400 rounded-md p-3 flex flex-col justify-center items-center"
            key={index}
          >
            <div className=" w-full rounded-sm md:border border-gray-200 md:p-2">
              <div className="flex items-center justify-between mt-3">
                <div className="flex space-x-3 md:space-x-4 items-center">
                  <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-full ring-2 ring-offset-2 ring-blue-300 bg-cover bg-center bg-no-repeat">
                    <img
                      src={post.userDetails[0]?.pic}
                      className="w-full h-full object-cover rounded-full"
                    ></img>
                  </div>
                  <div>
                    <Link
                      href={`/profilepage/${post.username}`}
                      className="font-semibold"
                    >
                      {post.username}
                    </Link>
                  </div>
                </div>
                {post.userId !== localStorage?.getItem("userId") && (
                  <div>
                    {post.userDetails[0].followers.includes(
                      JSON.parse(localStorage?.getItem("LoggedInUser"))._id
                    ) ? (
                      <button className="text-sm md:text-base bg-white border-2 border-blue-400 text-blue-400 px-2 py-1 rounded-md font-semibold transform transition hover:bg-white hover:text-blue-400 disabled:bg-blue-300 hover:scale-95">
                        Following
                      </button>
                    ) : (
                      <button
                        className="text-sm md:text-base bg-blue-400 text-white px-2 py-1 rounded-md font-semibold transform transition hover:bg-white hover:text-blue-400 disabled:bg-blue-300 hover:scale-95"
                        onClick={() => followUser(post.userId)}
                      >
                        Follow
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-3 image">
                <img
                  src={post.post}
                  className="object-fill min-w-full h-[300px]"
                  onDoubleClick={() => {
                    updateLikes(
                      post._id,
                      JSON.parse(localStorage?.getItem("LoggedInUser"))
                        .username,
                      true
                    );
                  }}
                ></img>
              </div>

              <div className="post-icons flex justify-between items-center mt-3 md:px-2">
                <div className="flex space-x-4">
                  {post.likes.includes(localStorage?.getItem("username")) ===
                    false || islike === false ? (
                    <FaRegHeart
                      className="text-2xl md:text-3xl"
                      onClick={() => {
                        updateLikes(
                          post._id,
                          localStorage?.getItem("username"),
                          true
                        );
                      }}
                    />
                  ) : (
                    <FaHeart
                      className="text-red-500 text-2xl md:text-3xl"
                      onClick={() => {
                        updateLikes(
                          post._id,
                          localStorage?.getItem("username"),
                          false
                        );
                      }}
                    />
                  )}
                  <FaRegComment
                    className="text-2xl md:text-3xl cursor-pointer"
                    onClick={() => {
                      setShowComments(post._id);
                    }}
                  />
                  <FaRegShareFromSquare
                    className="text-2xl md:text-3xl cursor-pointer"
                    onClick={() => setSharePost(true)}
                  />
                </div>
                <div>
                  <MdOutlineSaveAlt
                    className="text-2xl md:text-3xl cursor-pointer"
                    onClick={() => {
                      toast.success("Your Post is saved !");
                      savePost(post._id);
                    }}
                  />
                </div>
              </div>

              <div className="mt-3 md:px-2">
                <div className="text-sm">{post.likes.length} likes</div>
                <div>
                  <span className="font-semibold mr-1 text-sm md:text-base">
                    {post.username}
                  </span>
                  <span className="text-sm md:text-base">{post.caption}</span>
                </div>
                {post.comments.length > 0 && (
                  <div
                    className="text-gray-400 text-xs md:text-sm mt-2 cursor-pointer"
                    onClick={() => {
                      setShowComments(true);
                    }}
                  >
                    View all {post.comments.length} comments
                  </div>
                )}
                <div className="text-gray-400 text-xs md:text-sm mt-1">
                  {formatDate(post.createdAt)}
                </div>

                <div className="mt-4 flex justify-between pb-2">
                  <div className="flex space-x-4 items-center ">
                    <div
                      className="w-[20px] h-[20px] rounded-full ring-2 ring-offset-2 ring-blue-300 bg-cover bg-center bg-no-repeat"
                      style={{
                        backgroundImage: `url(${post.userDetails[0]?.pic})`,
                      }}
                    ></div>
                    <div>
                      <input
                        type="text"
                        className="font-semibold w-100 outline-none"
                        placeholder="Add a comment.."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        onKeyUp={(e) => {
                          sendComment(e, post._id);
                        }}
                      ></input>
                    </div>
                  </div>
                  <div>
                    <FaRegSmileBeam className="text-2xl " />
                  </div>
                </div>
              </div>
              {showComments === post._id && (
                <dialog
                  id="my_modal_1"
                  className="modal fixed top-0 bg-black bg-opacity-20 w-screen h-screen z-50 block md:hiden"
                  open
                >
                  <div className="modal-box w-full h-full flex flex-col justify-center items-center relative">
                    <div className="w-full absolute bottom-0">
                      <div className=" border-white border-2 w-full h-full flex">
                        <div className=" bg-blue-50 w-full">
                          <div className="userInfo  border border-b-gray-300 flex justify-start  items-center py-3 ">
                            <div>
                              <IoIosArrowBack
                                className="text-black text-2xl float-end cursor-pointer mb-2"
                                onClick={() => {
                                  setShowComments("");
                                }}
                              />
                            </div>
                            <div className="w-full text-center">
                              <Link
                                href="/UserProfile"
                                className="font-semibold"
                              >
                                Comments
                              </Link>
                            </div>
                          </div>
                          <div className="post-caption px-2">
                            <div className="flex space-x-3 md:space-x-4 items-center mt-3">
                              <div
                                className="w-[30px] h-[30px] flex-shrink-0 rounded-full ring-2 ring-offset-2 ring-blue-300 bg-cover bg-center bg-no-repeat"
                                style={{
                                  backgroundImage: `url(${post.userDetails[0]?.pic})`,
                                }}
                              ></div>
                              <div>
                                <p className="text-sm">
                                  <Link
                                    href="/UserProfile"
                                    className="font-semibold"
                                  >
                                    {post.username}
                                  </Link>
                                  <span className="ml-2">{post.caption}</span>
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="all-comments px-2 h-[400px] overflow-y-scroll">
                            {post.comments.length > 0 ? (
                              post.comments.map((comments, index) => {
                                const options = {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                };
                                return (
                                  <div
                                    className="flex space-x-3 md:space-x-4 items-center mt-3"
                                    key={index}
                                  >
                                    <div
                                      className="w-[30px] h-[30px] flex-shrink-0 rounded-full ring-2 ring-offset-2 ring-blue-300 bg-cover bg-center bg-no-repeat"
                                      style={{
                                        backgroundImage: `url(${comments.userpic})`,
                                      }}
                                    ></div>
                                    <div>
                                      <p className="text-sm">
                                        <span className="font-semibold">
                                          {comments.user}
                                        </span>
                                        <span className="ml-2">
                                          {comments.comment}
                                        </span>
                                      </p>
                                      <div className="text-xs text-gray-500 flex space-x-4 mt-1">
                                        <span className="cursor-pointer">
                                          {new Date(
                                            comments.createdAt
                                          ).toLocaleDateString(
                                            "en-US",
                                            options
                                          )}
                                        </span>
                                        <span className="cursor-pointer">
                                          {comments.like} likes
                                        </span>
                                        <span className="cursor-pointer">
                                          Reply
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })
                            ) : (
                              <div className="flex h-full items-center justify-center w-full">
                                No comments here
                              </div>
                            )}
                          </div>
                          <div className=" flex justify-between items-center h-[55px] px-2">
                            <div className="flex space-x-4">
                              <div
                                className="w-[20px] h-[20px] rounded-full ring-2 ring-offset-2 ring-blue-300 bg-cover bg-center bg-no-repeat"
                                style={{
                                  backgroundImage: `url(${post.userDetails[0]?.pic}})`,
                                }}
                              ></div>
                              <div>
                                <input
                                  type="text"
                                  className="font-semibold w-100 outline-none bg-transparent text-sm"
                                  placeholder="Add a comment.."
                                  value={comment}
                                  onChange={(e) => setComment(e.target.value)}
                                  onKeyUp={(e) => {
                                    sendComment(e, post._id);
                                  }}
                                ></input>
                              </div>
                            </div>
                            <div className="pr-3">
                              <MdGif className="text-2xl cursor-pointer border-2 border-black" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </dialog>
              )}
            </div>
            {sharePost === true && (
              <dialog
                id="share-post"
                className="modal bg-blue-100 py-5  z-40 fixed top-[40%] shadow-lg bg-opacity-20 w-[300px] "
                open
              >
                <div className="modal-box">
                  <div className="w-full  rounded-md ">
                    <div className="flex p-3 space-x-6 overflow-x-scroll">
                      {allUsers.data.map((user) => {
                        return (
                          <div
                            key={user._id}
                            onClick={() => setPostSentTo(user.username)}
                          >
                            <div
                              className="w-[50px] h-[50px] rounded-full ring-2 ring-offset-2 ring-blue-300 bg-cover bg-center bg-no-repeat cursor-pointer "
                              style={{ backgroundImage: `url(${user.pic})` }}
                              id={user.id}
                            ></div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="modal-action py-4 flex justify-between px-2">
                    <button
                      className="btn bg-blue-400 text-white px-4 py-2 rounded-md font-semibold transform transition hover:bg-white hover:text-blue-400 disabled:bg-blue-300 hover:scale-95"
                      onClick={() => {
                        setSharePost(false);
                      }}
                    >
                      Close
                    </button>
                    <button
                      disabled={postSentTo !== "" ? false : true}
                      className="btn bg-blue-400 text-white px-4 py-2 rounded-md font-semibold transform transition hover:bg-white hover:text-blue-400 disabled:bg-blue-300 hover:scale-95"
                      onClick={() => {
                        toast.success(`Post sent to ${postSentTo}`);
                        setPostSentTo("");
                        setSharePost(false);
                      }}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </dialog>
            )}
            <Toaster />
          </div>
        );
      })}
    </div>
  );
};

export default PostSection;
