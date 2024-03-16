"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { FiUpload } from "react-icons/fi";
import { useRouteContext } from "@/context";

const SetDeatil = () => {
  const inputFileRef = useRef();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const pathname = usePathname();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [pic, setPic] = useState();
  const [picName, setPicName] = useState();
  const [picUploading, setPicUploading] = useState(false);


  const username = pathname.split("setdetails/").pop();
  const router = useRouter();
  useEffect(() => {
    if (pic || name.length > 0 || bio.length > 0) setButtonDisabled(false);
  });
  const postPic = (pic) => {
    setPicUploading(true)
    const data = new FormData();
    data.append("file", pic);
    data.append("upload_preset", "gup-shup");
    data.append("cloud_name", "dgpiuhoad");
    fetch("https://api.cloudinary.com/v1_1/dgpiuhoad/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setPic(data.url.toString());
        setPicUploading(false)
      }).catch((error) => {
        console.error("Error uploading image: ", error);
        setPicUploading(false); // Make sure to set picUploading to false in case of an error too
      });
  };

  const { updateCurrentPage, updateWhoseProfile } = useRouteContext();

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/updatemoredetails", {
        username: JSON.parse(localStorage?.getItem("LoggedInUser")).username,
        name,
        bio,
        pic,
      });
      toast.success(response.data.message);
      updateCurrentPage("myprofile");
      updateWhoseProfile("myprofile");
      // router.push(`/profilepage/${localStorage?.getItem("username")}`);
    } catch (error) {
      toast.error(error.mesaage);
      console.log(error);
    } finally {
    }
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen w-screen">
        <div className="w-11/12 h-fit shadow-md p-4">
          <form className="flex flex-col justify-center items-center space-y-5">
            <div className="flex flex-col justify-center items-center space-y-2">
              <label htmlFor="pic">Profile photo</label>
              <input
                type="file"
                name="pic"
                id="pic"
                className="hidden"
                placeholder="Your name"
                onChange={(e) => {
                  postPic(e.currentTarget.files[0]);
                  setPicName(e.currentTarget.files[0]);
                }}
                ref={inputFileRef}
              />
              {pic ? (
                <div className="w-[70px] h-[70px] rounded-full bg-gray-200 flex justify-center items-center">
                  <img src={pic} className="rounded-full w-full h-full" />
                </div>
              ) : (
                <button
                  type="button"
                  className="w-[70px] h-[70px] rounded-full bg-gray-200 flex justify-center items-center"
                  onClick={() => {
                    inputFileRef.current.click();
                  }}
                >
                  {picUploading ? (
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="inline w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                  ) : (
                    <FiUpload className="text-3xl text-gray-400" />
                  )}
                </button>
              )}
              {/* {picName ? picName.name : ""} */}
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className="border-b-2 outline-none"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="bio">Bio</label>
              <input
                type="text"
                name="bio"
                id="bio"
                className="border-b-2 outline-none"
                placeholder="Anything you wnat to put in bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={submitForm}
                disabled={buttonDisabled}
                type="submit"
                className="bg-blue-400 text-white font-semibold py-1 px-4 rounded-md disabled:bg-blue-300"
              >
                Submit
              </button>
            </div>
          </form>
          <button
            className="mt-2"
            onClick={() => {
              updateCurrentPage("profile");
            }}
          >
            Skip
          </button>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default SetDeatil;
