import React,{useState} from 'react'
import Layout from '../../layout'
import {MdOutlineCameraswitch,MdAccessAlarms,MdOutlineSettings,MdToggleOff} from "react-icons/md"
import {TbDeviceCctv,TbDeviceSpeaker} from "react-icons/tb"
import {BiMap,BiDotsVerticalRounded} from "react-icons/bi"
import {AiOutlineCamera} from "react-icons/ai"
import {FiAlertCircle} from "react-icons/fi"



const Top=()=>{
    return(
        <div></div>
    )
}

const SideBar=({setTab})=>{
    return(
        <div className='flex flex-col w-1/6 shadow-lg rounded-full space-y-6 items-center py-6 relative 'style={{height:"70vh",width:"15%"}}>
            <MdOutlineCameraswitch className='text-2xl text-slate-500' onClick={()=>setTab("cameras")}/>
            <MdAccessAlarms className='text-2xl text-slate-500' onClick={()=>setTab("alarms")}/>
            <TbDeviceCctv className='text-2xl text-slate-500' onClick={()=>setTab("devices")} />
            <MdOutlineSettings className='text-2xl text-slate-500' onClick={()=>setTab("settings")}/>
            <main className=' absolute bottom-0 py-4' >
                <div className='flex justify-center items-center rounded-full bg-blue-500 text-white w-6 h-6 '>
                    B
                </div>

            </main>

        </div>
    )
}


const Cams=()=>{
    let count=0
    return(
        <div className='w-full'>
            <h5 className='text-slate-500 font-semibold text-lg w-full'>Cameras</h5>

            <main className='grid grid-flow-row grid-cols-1  gap-4 w-full py-4'>
            {[1,2,3].map(()=>{
                count++
                return(
                   <div className='border w-full px-4 py-2 rounded-md '>
                      <main className='flex items-center justify-between w-full'>
                           <h5 className='flex items-center space-x-2 '>
                            <AiOutlineCamera className='text-lg text-slate-600'/>
 
                              <span>Camera {count}</span>

                           </h5>
                           <BiDotsVerticalRounded className='text-lg text-slate-600'/>

                         </main>

                         <div className='h-20'>

                         </div>


                   </div>
                     )
                 })
              }
            </main>

        </div>
    )
}


const Alarms=()=>{
    let count=0
    return(
        <div>
             <h5  className='text-slate-500 font-semibold text-lg w-full'>Alarms</h5>

             <main className='grid grid-flow-row grid-cols-1  gap-4 w-full py-4'>
            {[1,2].map(()=>{
               count++
                return(
                    <div className=' w-full px-4 py-2 border-b border-blue-300'>
                        <div className='flex items-center space-x-2 w-full'> 
                          <TbDeviceSpeaker className='text-blue-700 text-2xl font-light'/>
                             <main className='flex justify-between w-full items-center'>
                                  <h5 className='text-slate-600 font-semibold flex flex-col space-y-0.5'>
                                   <span>Alarm {count}</span> 
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
            </main>

        </div>
    )
}

const Devices=()=>{
    let count=0
    return(
        <div>
             <h5  className='text-slate-500 font-semibold text-lg w-full'>Security Devices</h5>

             <main className='grid grid-flow-row grid-cols-1  gap-4 w-full py-4'>
            {[1,2].map(()=>{
               count++
                return(
                    <div className=' w-full px-4 py-2 '>
                        <div className='flex items-center'> 
                            <img src={"https://d39xvdj9d5ntm1.cloudfront.net/alarm-app/images/device_doorbell_two_2d_sm-4d5a36554dc1ee80cfcacd93143ab314.png"} className="w-12 h-12"/>
                             <main className='flex flex-col'>
                                  <h5 className='text-slate-600 font-semibold'>Devices {count}</h5>
                                  <h5 className='text-blue-500 text-xs font-light '>See details</h5>

                             </main>
                        </div>
                     
                     </div>
                     )
                 })
              }
            </main>

        </div>
    )
}

const Settings=()=>{
    return(
        <div>
             <h5  className='text-slate-500 font-semibold text-lg w-full'>Settings</h5>

           <main className='flex flex-col w-full space-y-6 py-4'>
              <div className='flex justify-between'>
                 <h5 className='flex items-center space-x-3'>
                    <FiAlertCircle className='text-2xl text-blue-700' />
                    <span>Alerts/Notifications</span>


                 </h5>
                 <MdToggleOff className='text-2xl text-blue-700'/>


               </div>
            </main>

        </div>
    )
}



export default function App() {
    let [currentTab,setTab]=useState("cameras")
  return (
    <div>
        <Layout>
             <div className='flex w-full space-x-6'>
                 <SideBar setTab={setTab}/>


               <div className='w-full'>
                  <h5 className='flex items-center space-x-3 '>
                    <BiMap className='text-blue-600 text-lg'/>
                    <span className='text-sm text-slate-500 '>1442W 34th 1/2 St</span>

                  </h5>

                <main className='py-10 w-full '>
                  {currentTab==="cameras" && <Cams />}
                  {currentTab==="alarms" && <Alarms />}
                  {currentTab==="devices" && <Devices />}
                  {currentTab==="settings" && <Settings />}
                  </main>

               </div>
 
             </div>
            

        </Layout>
    </div>
  )
}
