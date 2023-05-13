import React from 'react'
import {BiSearch} from "react-icons/bi"
import {AiOutlineClose} from "react-icons/ai"

export default function SearchBar({setSearch}) {
  return (
    <div className='flex border border-slate-500 rounded-full items-center w-3/4  space-x-4 px-2 py-1'>
        <input className='outline-none w-3/4'/>
        <AiOutlineClose onClick={()=>setSearch(false)} />

    </div>
  )
}
