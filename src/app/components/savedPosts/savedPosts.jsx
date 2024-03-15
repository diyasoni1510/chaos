import { useRouteContext } from "@/context";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

const SavedPosts = () => {
  const { updateCurrentPage } = useRouteContext();
  const [savedPostsImage, setSavedPostsImage] = useState([]);
  const [showBig, setShowBig] = useState("");
  const [loading, setLoading] = useState();
  const getAllSavedPosts = async () => {
    setLoading(true);
    const response = await axios.post("/api/posts/getsaveposts", {
      userId: JSON.parse(localStorage?.getItem("LoggedInUser"))._id,
    });
    response.data.data.map(async (post) => {
      const getpostdetails = await axios.post("/api/posts/getpostbypostid", {
        postId: post.postId,
      });
      setSavedPostsImage((prev) => [...prev, getpostdetails.data.data]);
      setLoading(false);
    });
  };
  useEffect(() => {
    getAllSavedPosts();
  }, []);
  useEffect(() => {
    console.log(savedPostsImage);
  }, [savedPostsImage]);
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
        <div className="w-100 flex flex-wrap pt-2">
          {loading ? (
            <>
              {[...Array(9)].map((_, index) => (
                <div className="w-1/3 p-1 h-[110px]" key={index}>
                  <div className="bg-gray-200 w-full h-full"></div>
                </div>
              ))}
            </>
          ) : (
            savedPostsImage.length > 1 &&
            savedPostsImage.map((post) => {
              console.log(post);
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
                    <div>
                      <img src={post[0].post} className="h-full w-full" />
                    </div>
                  )}
                </>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default SavedPosts;
