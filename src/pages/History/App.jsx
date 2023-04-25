import React,{useState} from 'react'
import Layout from '../../layout'
import {BsCameraVideoOff} from "react-icons/bs"
import {FaRunning} from "react-icons/fa"
import {MdBatteryChargingFull} from "react-icons/md"


const Tabs=({tabs,setTabs})=>{
    return(
        <div className='flex w-full px-6 space-x-16 justify-center'>
            <h5 className={`${tabs==="cameras" ? 'text-sm  font-light border-b-2 border-blue-500' : 'text-sm  font-light hover:border-b-2 border-blue-500'}`} onClick={()=>setTabs("cameras")}>All cameras</h5>
            <h5 className={`${tabs==="alarms" ? 'text-sm  font-light border-b-2 border-blue-500' : 'text-sm  font-light hover:border-b-2 border-blue-500'}`}  onClick={()=>setTabs("alarms")}>Alarms</h5>

        </div>
    )
}


const Cams=()=>{
    let count=0
    return(
        <div className='w-full py-6'>
            <main className='bg-slate-500 w-full h-44 flex justify-center w-full items-center rounded-md'>
                <BsCameraVideoOff className='text-3xl text-slate-600'/>

            </main>

            <div className='flex flex-col py-4 overflow-y-scroll h-72'  >
                {
                      [1,2,3,4,5].map(()=>{
                        count++
                        return(
                            <div className=' w-full px-4 py-2 border-b border-slate-300'>
                        <div className='flex items-center space-x-2 w-full'> 
                          <FaRunning className='text-blue-500 text-2xl font-light'/>
                             <main className='flex justify-between w-full items-center'>
                                  <h5 className='text-slate-600 font-semibold flex flex-col space-y-0.5'>
                                   <span>Cam History {count}</span> 
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

        </div>
    )
}

const Alarms=()=>{
    let count=0
    return(
        <div className='flex flex-col py-4 overflow-y-scroll h-72 space-y-6'  >
        {
              [1,2,3,4,5].map(()=>{
                count++
                return(
                    <div className=' w-full px-4 py-2 border-b border-slate-300'>
                <div className='flex items-center space-x-2 w-full'> 
                  <MdBatteryChargingFull className='text-blue-500 text-2xl font-light'/>
                     <main className='flex justify-between w-full items-center'>
                          <h5 className='text-slate-600 font-semibold flex flex-col space-y-0.5'>
                           <span>Alarm History {count}</span> 
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
    )
}

export default function App() {
    let [tabs,setTabs]=useState("cameras")
  return (
    <div>
        <Layout>
            <div className='w-full'> 
                <Tabs setTabs={setTabs} tabs={tabs} />
                <div className='w-full'>
                   {tabs==="cameras" && <Cams />}
                    {tabs==="alarms" && <Alarms />}
                </div>
                

            </div>

        </Layout>

    </div>
  )
}
