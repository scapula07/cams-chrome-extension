import React from 'react'


export default function App() {
  return (
    <div className="sm:w-full w-72 flex justify-center  realtive" style={{height:"600px"}}>
        <div className='lg:w-1/2 w-full  px-4 flex flex-col justify-center items-center'>

               <main className='flex flex-col items-center'>
                  <img src={"https://d39xvdj9d5ntm1.cloudfront.net/alarm-app/images/device_doorbell_two_2d_sm-4d5a36554dc1ee80cfcacd93143ab314.png"} className="w-20 h-20"/>
                  <h5 className='text-3xl text-slate-500'>Cams</h5>
               </main>
              
              <main className='flex flex-col w-full'>
                  <button className='bg-blue-500 rounded-full text-white py-2'>Login</button>

                 <h5 className='text-center w-full'>OR</h5>
                 <button className='border-blue-500 border rounded-full text-blue-500 py-2' >Create an account</button>

              </main>

        </div>
    </div>
  )
}
