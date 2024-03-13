"use client";
import { usePathname,useRouter } from "next/navigation";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import axios from "axios";


const schema = Yup.object().shape({
    name: Yup.string(),
    bio: Yup.string(),
    // anyLink: Yup.string(),
  });

const SetDeatil = () => {
  const pathname = usePathname()
    const username = pathname.split('page/').pop();
  const [takeDetails, setTakeDetails] = useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      bio: "",
    },
    validationSchema: schema,
    onSubmit: async ({ name, bio }) => {
        console.log(name,bio)
        try {
            let response = await axios.post("/api/users/updatemoredetails",{username,name,bio})
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    },
  });
  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <>
      <div className="flex justify-center items-center h-screen w-screen">
        {takeDetails ? (
          <div className="w-11/12 h-fit shadow-md p-4">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
              <div className="flex flex-col space-y-2">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="border-b-2 outline-none"
                  placeholder="Your name"
                  value={values.name}
                  onChange={handleChange}
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
                  value={values.bio}
                  onChange={handleChange}
                />
              </div>
              {/* <div className="flex flex-col space-y-2">
                <label htmlFor="anyLink">Add link</label>
                <input
                  type="text"
                  name="anyLink"
                  id="anyLink"
                  className="border-b-2 outline-none"
                  placeholder="link?"
                  value={values.anyLink}
                  onChange={handleChange}
                />
              </div> */}
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-pink-300 text-white font-semibold py-1 px-4 rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
            <button
            className="mt-2"
              onClick={() => {
                router.push("/profile");
              }}
            >
              Skip
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              setTakeDetails(true);
            }}
          >
            Want to add more deatils?
          </button>
        )}
      </div>
    </>
  );
};

export default SetDeatil;
