"use client"
import ProfileFooter from './profile/profilefooter/page'

const reelsection = () => {
  return (
    <>
    <div className='h-[670px] border border-black'>
        <video src="/reel.mp4" className='w-full h-full'></video>
    </div>
    <ProfileFooter/>
    </>
  )
}

export default reelsection