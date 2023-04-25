import React ,{useState} from 'react'
import {RiMenu2Line} from "react-icons/ri"
import {BiSearch} from "react-icons/bi"
import {IoIosNotificationsOutline} from "react-icons/io"
import SideNav from '../SideNav'


export default function Header() {
    const [trigger,setMenuTrigger]=useState(false)
  return (
     <div className='w-full lg:px-4 px-2 py-8 border-b border-slate-200 '>
        <div className='flex w-full justify-between items-center'>
            <RiMenu2Line className='text-xl' onClick={()=>setMenuTrigger(true)}/>
            <h5 className='font-semibold'>Explore</h5>
            <main className='flex lg:space-x-8 space-x-2 items-center'>
                < a href="notifications.html">
                 <IoIosNotificationsOutline  className='text-xl'/>
                </a>
             
               <BiSearch className='text-xl'/>
               
            </main>

        </div>
        {trigger&&
           <div className='fixed top-0 left-0 w-3/4 bg-white z-10 h-screen py-6 px-6' >
              <SideNav setMenuTrigger={setMenuTrigger}/>

            </div>
        }
         
     </div>
  )
}
