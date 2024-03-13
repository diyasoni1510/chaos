"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const ProfilePage = () => {
  const router = useRouter()

  const [data,setData] = useState(null)

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/userprofile")
    console.log(res.data)
    setData(res.data.data.username)
  }
  useEffect(()=>{
    getUserDetails()
  },[])

  useEffect(() => {
    if (data) {
      router.push(`/profile/${data}`); 
    }
  }, [data]);
  const logout = async () =>{
    try {
       await axios.get("api/users/logout")
       toast.success("Logout successfull")
       router.push("/login")
    } catch (error) {
      console.log(error.mesage)
      toast.error(error.message)
    }
  }
  return (
    <>
    <div>ProfilePage</div>
    <button onClick={logout}>Logout</button>
    </>
  )
}

export default ProfilePage