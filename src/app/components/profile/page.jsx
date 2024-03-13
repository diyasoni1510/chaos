import React from 'react'
import ProfileHeader from "./profileheader/page"
import StorySection from "./storysection/page"
import PostSection from "./postsection/page"
import ProfileFooter from "./profilefooter/page"


const UserProfile = () => {
  return (
    <>
    <ProfileHeader/>
    <div className='mt-16 flex flex-col w-full relative'>
      <StorySection />
      <PostSection />
    </div>
    <ProfileFooter /> 
    </>
  )
}


export default UserProfile