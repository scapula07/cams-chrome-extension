import React from 'react'
import Header from '../components/Header'


export default function Layout({children}) {
  return (
    <div className="sm:w-full w-72 flex justify-center  realtive" style={{height:"600px"}}>
        <div className='lg:w-1/2 w-full '>
           <Header />
            <div className='lg:px-4 px-2 py-8'>
            {children}
            </div>

      </div>
     
      

  </div>
  )
}
