import React from 'react'
import {AiOutlineClose} from "react-icons/ai"
import {RxDashboard} from "react-icons/rx"
import {MdOutlineExplore,MdHistory,MdOutlineManageAccounts} from "react-icons/md"


export default function SideNav({setMenuTrigger,setNav}) {
  return (
    <div className='w-full h-full'>
        <main className='flex items-center space-x-3'>
            <AiOutlineClose className='text-lg font-light' onClick={()=>setMenuTrigger(false)}/>
            <h5 className='text-xl font-light'>Cams</h5>
         </main>

          <main className='flex flex-col py-10 space-y-4'>
            <a href="index.html">
              <h5 className='flex items-center space-x-2' onClick={setNav("Explore")}>
                 <MdOutlineExplore  className='text-xl'/>
                 <span  onClick={()=>setNav("Explore")}>Explore</span> 
                </h5>
                </a>
                <a href="dashboard.html">
            <h5 className='flex items-center space-x-2' onClick={setNav("Dashboard")}>
                <RxDashboard className='text-xl'/>
                <span onClick={()=>setNav("Dashboard")}>Dashboard</span>
                </h5>
            </a>
            <a href="history.html">
            <h5 className='flex items-center space-x-2' onClick={setNav("History")}> 
                <MdHistory  className='text-xl'/>
               <span onClick={()=>setNav("History")}>History</span> 
                </h5>
            </a>
            <a href="history.html">
            <h5 className='flex items-center space-x-2' onClick={()=>setNav("Account")}> 
                <MdOutlineManageAccounts  className='text-xl'/>
               <span onClick={()=>setNav("Account")}>Account settings</span> 
                </h5>
            </a>
        </main>
        </div>
  )
}
