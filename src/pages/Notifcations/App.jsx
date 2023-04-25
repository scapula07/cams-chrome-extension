import React from 'react'
import Layout from '../../layout'
import {MdOutlineCameraswitch,MdAccessAlarms,MdOutlineSettings,MdToggleOff} from "react-icons/md"
import {TbDeviceCctv,TbDeviceSpeaker} from "react-icons/tb"




export default function App() {
    let count=0
  return (
    <div>
         <Layout>
         <div className='flex flex-col py-4 overflow-y-scroll h-72 space-y-6'  >
        {
              [1,2,3,4,5 ].map((noti)=>{
                count++
                return(
                    <div className=' w-full px-4 py-2 border-b border-slate-300'>
                <div className='flex items-center space-x-2 w-full'> 
                  {/* <MdBatteryChargingFull className='text-blue-500 text-2xl font-light'/> */}
                  {/* {noti} */}
                     <main className='flex justify-between w-full items-center'>
                          <h5 className='text-slate-600 font-semibold flex flex-col space-y-0.5'>
                           <span>Notification  {count}</span> 
                           <span className='text-xs text-slate-400 font-extralight'>Lorem ipsum</span>
                            </h5>
                          <h5 className='flex flex-col'>
                              <span className='text-xs text-slate-500 font-light'>Today</span>
                              <span className='text-xs text-slate-500 font-light'>{"10:00pm"}</span>

                          </h5>

                     </main>
                </div>
             
             </div>
                )
              })
        }
      

    </div>

         </Layout>

    </div>
  )
}
