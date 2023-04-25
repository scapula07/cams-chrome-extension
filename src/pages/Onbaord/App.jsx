import React ,{useState} from 'react'
import Modal from '../../components/Modal'
import {AiOutlineClose} from "react-icons/ai"


export default function App() {
    const [trigger,setTrigger]=useState(false)
    const [otherTrigger,setOtherTrigger]=useState(false)
  return (
    <>
    <div className="sm:w-full w-72 flex justify-center  realtive" style={{height:"600px"}}>
        <div className='lg:w-1/2 w-full  px-4 flex flex-col justify-center items-center space-y-10'>

               <main className='flex flex-col items-center'>
                  <img src={"https://d39xvdj9d5ntm1.cloudfront.net/alarm-app/images/device_doorbell_two_2d_sm-4d5a36554dc1ee80cfcacd93143ab314.png"} className="w-20 h-20"/>
                  <h5 className='text-3xl text-slate-500'>Cams</h5>
               </main>
              
              <main className='flex flex-col w-full space-y-3'>
                  <button className='bg-blue-500 rounded-full text-white py-2' onClick={()=>setTrigger(true)}>Login</button>

                 <h5 className='text-center w-full text-slate-500 font-light'>OR</h5>
                 <button className='border-blue-500 border rounded-full text-blue-500 py-2' onClick={()=>setOtherTrigger(true)}>Create an account</button>

              </main>

        </div>
    </div>
      <Modal trigger={trigger}  cname=" lg:w-1/2 w-11/12 rounded-sm py-4  px-4">
          <main className='flex justify-center space-x-12 w-full'>
            <h5 className='text-slate-500 text-lg '>Login</h5>
             <button onClick={()=>setTrigger(false)}><AiOutlineClose className="text-md font-thin text-slate-500" /></button>
         </main>

         <main className='flex flex-col space-y-4 w-full py-6'>
            <input className='border-b w-full outline-none hover:border-blue-500' placeholder='Email'/>
            <input  className='border-b w-full outline-none hover:border-blue-500' placeholder='Password'/>
             <div className='w-full'>
               <button className='bg-blue-500 rounded-full text-white py-2 w-full ' onClick={()=>setTrigger(true)}>Login</button>
             </div>

         </main>

     </Modal>
     <Modal trigger={otherTrigger}  cname=" lg:w-1/2 w-11/12 rounded-sm py-4  px-4">
          <main className='flex justify-center space-x-12 w-full'>
              <h5 className='text-slate-500 text-lg '>Sign in</h5>
             <button onClick={()=>setOtherTrigger(false)}><AiOutlineClose className="text-md font-thin text-slate-500" /></button>
         </main>


         <main className='flex flex-col space-y-4 w-full py-6'>
            <input className='border-b w-full outline-none hover:border-blue-500' placeholder='Email'/>
            <input  className='border-b w-full outline-none hover:border-blue-500' placeholder='Password'/>
             <div className='w-full'>
               <button className='bg-blue-500 rounded-full text-white py-2 w-full ' onClick={()=>setTrigger(true)}>Sign in</button>
             </div>

         </main>

     </Modal>
    </>
  )
}
