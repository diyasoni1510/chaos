import { useRouteContext } from "@/context";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  FaHeart,
  FaRegComment,
  FaRegHeart,
  FaRegSmileBeam,
} from "react-icons/fa";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { MdGif } from "react-icons/md";
import { mutate } from "swr";

const SavedPosts = () => {
  const { updateCurrentPage } = useRouteContext();
  const [savedPostsImage, setSavedPostsImage] = useState([]);
  const [showBig, setShowBig] = useState("");
  const [loading, setLoading] = useState();
  const [showComments, setShowComments] = useState();
  const [comment, setComment] = useState("");
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };
  const getAllSavedPosts = async () => {
    setLoading(true);
    const response = await axios
      .post("/api/posts/getsaveposts", {
        userId: JSON.parse(localStorage?.getItem("LoggedInUser"))._id,
      })
      .then((response) => {
        response.data.data.map(async (post) => {
          const getpostdetails = await axios.post(
            "/api/posts/getpostbypostid",
            {
              postId: post.postId,
            }
          );
          setSavedPostsImage((prev) => [...prev, getpostdetails.data.data]);
          setLoading(false);
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      }).finally(()=>{
        setLoading(false)
      })
  };
  const updateLikes = async (_id, like, add) => {
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
  useEffect(() => {
    getAllSavedPosts();
  }, []);
  return (
    <>
      <div>
        <div className="flex items-center py-4 px-2 space-x-4 shadow">
          <IoIosArrowBack
            className="text-2xl"
            onClick={() => {
              updateCurrentPage("profile");
            }}
          />
          <p>Saved Posts</p>
        </div>
        <div className="w-100 flex flex-wrap pt-2 relative">
          {loading ? (
            <>
              {[...Array(9)].map((_, index) => (
                <div className="w-1/3 p-1 h-[110px]" key={index}>
                  <div className="bg-gray-200 w-full h-full"></div>
                </div>
              ))}
            </>
          ) : savedPostsImage.length > 0 ? (
            savedPostsImage.map((post) => {
              return (
                <>
                  <div
                    className="w-1/3 p-1 h-[110px]"
                    key={post[0]._id}
                    onClick={() => setShowBig(post[0]._id)}
                  >
                    <img src={post[0].post} className="h-full w-full" />
                  </div>
                  {showBig === post[0]._id && (
                    <div className=" flex justify-center items-center absolute top-0 w-screen h-screen bg-black bg-opacity-20">
                      {/* <img src={post[0].post} className="h-full w-full" /> */}
                      <div className="rounded-md bg-white w-full h-full">
                        <div className="md:border border-gray-400 rounded-md p-3 pt-0 mt-0 flex flex-col justify-center items-center">
                          <div className=" w-full rounded-sm md:border border-gray-200 md:p-2">
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex space-x-3 md:space-x-4 items-center">
                                <div>
                                  <IoIosArrowBack
                                    onClick={() => setShowBig("")}
                                  />
                                </div>
                                <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-full ring-2 ring-offset-2 ring-blue-300 bg-cover bg-center bg-no-repeat">
                                  <img
                                    src={post[0].userDetails[0]?.pic}
                                    className="w-full h-full object-cover rounded-full"
                                  ></img>
                                </div>
                                <div>
                                  <div className="font-semibold">
                                    {post[0].username}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="mt-3 image">
                              <img
                                src={post[0].post}
                                className="object-fill min-w-full h-[300px]"
                                onDoubleClick={() => {
                                  updateLikes(
                                    post[0]._id,
                                    JSON.parse(
                                      localStorage?.getItem("LoggedInUser")
                                    ).username,
                                    true
                                  );
                                }}
                              ></img>
                            </div>
                            <div className="post-icons flex justify-between items-center mt-3 md:px-2">
                              <div className="flex space-x-4">
                                {post[0].likes.includes(
                                  JSON.parse(
                                    localStorage?.getItem("LoggedInUser")
                                  ).username
                                ) === false ? (
                                  <FaRegHeart
                                    className="text-2xl md:text-3xl"
                                    onClick={() => {
                                      updateLikes(
                                        post[0]._id,
                                        JSON.parse(
                                          localStorage.getItem("LoggedInUser")
                                        ).username,
                                        true
                                      );
                                    }}
                                  />
                                ) : (
                                  <FaHeart
                                    className="text-red-500 text-2xl md:text-3xl"
                                    onClick={() => {
                                      updateLikes(
                                        post[0]._id,
                                        JSON.parse(
                                          localStorage.getItem("LoggedInUser")
                                        ).username,
                                        false
                                      );
                                    }}
                                  />
                                )}
                                <FaRegComment
                                  className="text-2xl md:text-3xl cursor-pointer"
                                  onClick={() => {
                                    setShowComments(post[0]._id);
                                  }}
                                />
                                <FaRegShareFromSquare
                                  className="text-2xl md:text-3xl cursor-pointer"
                                  onClick={() => setSharePost(true)}
                                />
                              </div>
                            </div>

                            <div className="mt-3 md:px-2">
                              <div className="text-sm">
                                {post[0].likes.length} likes
                              </div>
                              <div>
                                <span className="font-semibold mr-1 text-sm md:text-base">
                                  {post[0].username}
                                </span>
                                <span className="text-sm md:text-base">
                                  {post[0].caption}
                                </span>
                              </div>
                              {post[0].comments.length > 0 && (
                                <div
                                  className="text-gray-400 text-xs md:text-sm mt-2 cursor-pointer"
                                  onClick={() => {
                                    setShowComments(true);
                                  }}
                                >
                                  View all {post[0].comments.length} comments
                                </div>
                              )}
                              <div className="text-gray-400 text-xs md:text-sm mt-1">
                                {formatDate(post[0].createdAt)}
                              </div>

                              <div className="mt-4 flex justify-between pb-2">
                                <div className="flex space-x-4 items-center ">
                                  <div
                                    className="w-[20px] h-[20px] rounded-full ring-2 ring-offset-2 ring-blue-300 bg-cover bg-center bg-no-repeat"
                                    style={{
                                      backgroundImage: `url(${post[0].userDetails[0]?.pic})`,
                                    }}
                                  ></div>
                                  <div>
                                    <input
                                      type="text"
                                      className="font-semibold w-100 outline-none"
                                      placeholder="Add a comment.."
                                      value={comment}
                                      onChange={(e) =>
                                        setComment(e.target.value)
                                      }
                                      onKeyUp={(e) => {
                                        sendComment(e, post[0]._id);
                                      }}
                                    ></input>
                                  </div>
                                </div>
                                <div>
                                  <FaRegSmileBeam className="text-2xl " />
                                </div>
                              </div>
                            </div>
                            {showComments === post[0]._id && (
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
                                            <div className="font-semibold">
                                              Comments
                                            </div>
                                          </div>
                                        </div>
                                        <div className="post-caption px-2">
                                          <div className="flex space-x-3 md:space-x-4 items-center mt-3">
                                            <div
                                              className="w-[30px] h-[30px] flex-shrink-0 rounded-full ring-2 ring-offset-2 ring-blue-300 bg-cover bg-center bg-no-repeat"
                                              style={{
                                                backgroundImage: `url(${post[0].userDetails[0]?.pic})`,
                                              }}
                                            ></div>
                                            <div>
                                              <p className="text-sm">
                                                <div className="font-semibold">
                                                  {post[0].username}
                                                </div>
                                                <span className="ml-2">
                                                  {post[0].caption}
                                                </span>
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="all-comments px-2 h-[400px] overflow-y-scroll">
                                          {post[0].comments.length > 0 ? (
                                            post[0].comments.map(
                                              (comments, index) => {
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
                                              }
                                            )
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
                                                backgroundImage: `url(${post[0].userDetails[0]?.pic}})`,
                                              }}
                                            ></div>
                                            <div>
                                              <input
                                                type="text"
                                                className="font-semibold w-100 outline-none bg-transparent text-sm"
                                                placeholder="Add a comment.."
                                                value={comment}
                                                onChange={(e) =>
                                                  setComment(e.target.value)
                                                }
                                                onKeyUp={(e) => {
                                                  sendComment(e, post[0]._id);
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
                        </div>
                      </div>
                    </div>
                  )}
                </>
              );
            })
          ) : (
            <p className="w-full text-center">No Saved</p>
          )}
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default SavedPosts;
