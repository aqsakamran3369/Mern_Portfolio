import React from 'react'

function LeftSider() {
  return (
    <div className='fixed left-0 bottom-0 px-10 sm:static'>
      <div className='flex flex-col items-center'>
        <div className='flex flex-col gap-3 sm:flex-row sm:pb-5'>
          <a href='https://www.facebook.com/aqsa.kamran.712?mibextid=ZbWKwL' target='_blank' rel='noopener noreferrer'>
            <i className="ri-facebook-circle-line text-gray-600"></i>
          </a>
          
          <a href='mailto:aqsakamran3369@gmail.com' target='_blank' rel='noopener noreferrer'>
  <i className="ri-mail-line text-gray-600"></i>
</a>

          
          <a href='https://www.instagram.com/aqsak3369/?igsh=MWswbGk4d21iOTQ0eA%3D%3D' target='_blank' rel='noopener noreferrer'>
            <i className="ri-instagram-line text-gray-600"></i>
          </a>
          
          <a href='linkedin.com/in/aqsa-kamran2323' target='_blank' rel='noopener noreferrer'>
            <i className="ri-linkedin-box-line text-gray-600"></i>
          </a>
          
          <a href='https://github.com/aqsakamran3369' target='_blank' rel='noopener noreferrer'>
            <i className="ri-github-line text-gray-600"></i>
          </a>
        </div>
        <div className='w-[1px] h-32 bg-[#125f63] sm:hidden'></div>
      </div>
    </div>
  )
}

export default LeftSider
