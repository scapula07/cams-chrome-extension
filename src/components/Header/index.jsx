import React ,{useState} from 'react'
import {RiMenu2Line} from "react-icons/ri"
import {BiSearch} from "react-icons/bi"
import {BsDot} from "react-icons/bs"
import SearchBar from '../SearchBar'

import {IoIosNotificationsOutline} from "react-icons/io"
import SideNav from '../SideNav'


export default function Header() {
    const [trigger,setMenuTrigger]=useState(false)
    const [onSearch,setSearch]=useState(false)
    let [nav,setNav]=useState("Explore")
   console.log(nav,"nav")
  return (
     <div className='w-full lg:px-4 px-2 py-8 border-b border-slate-200 '>
        <div className='flex w-full justify-between items-center'>
            <RiMenu2Line className='text-xl' onClick={()=>setMenuTrigger(true)}/>
            <h5 className='font-semibold'>{nav}</h5>
            {!onSearch &&
            <main className='flex lg:space-x-8 space-x-2 '>
                
                < a href="notifications.html">
                 <h5 className='flex flex-col items-center space-y-2'>
                     <IoIosNotificationsOutline  className='text-xl'/>
                     <BsDot className="text-blue-500 text-lg"/>

                   </h5>
                </a>
            
                <h5 className='flex flex-col items-center' onClick={()=>setSearch(true)}>
                   <BiSearch className='text-xl text-slate-500'/>
                   {/* <BsDot className="text-white text-lg"/> */}
                </h5>
               
                  
               
            </main>
             }
            {onSearch &&
               
                <SearchBar setSearch={setSearch}/>
               
               }

        </div>
        {trigger&&
           <div className='fixed top-0 left-0 w-3/4 bg-white z-10 h-screen py-6 px-6' >
              <SideNav setMenuTrigger={setMenuTrigger} setNav={setNav}/>

            </div>
        }
         
     </div>
  )
}


