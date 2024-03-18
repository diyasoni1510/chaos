"use client"
import ProfileFooter from './profile/profilefooter/page'

const reelsection = () => {
  return (
    <>
    <div className='h-[670px] border border-black'>
        {/* <video autoPlay src="/reel.mp4" className='w-full h-full'></video> */}
        <video autoPlay muted width="600">
        <source src="/reel.mp4" type="video/mp4"/>
        Your browser does not support the video tag.
    </video>
    </div>
    <ProfileFooter/>
    </>
  )
}

export default reelsection