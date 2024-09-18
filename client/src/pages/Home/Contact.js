import React from 'react'
import SectionTitle from '../../components/SectionTitle'
import { useSelector } from 'react-redux';

function Contact() {
  const { portfolioData } = useSelector((state) => state.root);
  const { contact } = portfolioData; 
  return (
    <div>
      <SectionTitle title="Say Hello"/>
      <div className='flex sm:flex-col items-center justify-between'>
      <div className='flex flex-col gap-1 '>
      <p className='text-tertiary' >{'{'}</p>
        {Object.keys(contact).map((key)=>(
           key !== '_id' && <p className='ml-5' >
        <span className='text-tertiary'>
            {key} :  
        </span><span className='text-tertiary'>
          {contact[key]}</span>
            </p>
        )) }
    <p className='text-tertiary ' >{'}'}</p>
      </div>
      

    <div className='h-[400px]'>
    <dotlottie-player src="https://lottie.host/f0f02b0e-fdfd-48a7-92ca-0f93687fa0aa/5J5vtdr4iC.json" background="transparent" speed="1"  loop autoplay></dotlottie-player>
    </div>
      </div>
    </div>
  )
}

export default Contact
