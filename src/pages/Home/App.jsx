import { useState } from 'react'
import {Routes,Route } from "react-router-dom"
import Layout from '../../layout'
import {RiArrowDropRightLine} from "react-icons/ri"
import ring from "../../assets/ring3.jpeg"
import simplisafe from "../../assets/simplisafe.jpeg"
import arlo from "../../assets/arlo.jpeg"
import vivint from "../../assets/vivint2.png"


const Top=()=>{
  return(
    <div className=''>
        <main className='flex flex-col space-y-4'>
           <p className='text-lg font-light text-slate-500'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt </p>
           {/* <select className='text-lg font-light w-20 border-b-2 py-1 text-slate-400 outline-none bg-slate-100 '>
              <option>Popular</option>
           </select> */}
        </main>

    </div>
  )
}


const Cams=()=>{
  return(
    <div className='w-full py-6'>
       <main className='flex items-center w-full justify-between'>
          <h5 className='text-lg font-light text-slate-500'>Available</h5>
          <button className='bg-blue-500 text-sm rounded-full text-white px-4 py-0.5 flex items-center space-x-1'>
              <span className='text-xs'>See all  </span> 
              <span className=''>
                <RiArrowDropRightLine  className='text-2xl'/>
                </span> 
          </button>

       </main>

       <main  className='grid grid-flow-row grid-cols-2  gap-4 w-full py-6'>
         {cams.map((cam)=>{
            return(
               <div className='shadow-lg h-56 w-full py-2 px-2 flex flex-col space-y-4'>
                  <main className='w-full justify-center flex'>
                    <img src={cam.img}/>
                  </main>
                  <main className='flex '>
                     <div className='flex flex-col'>
                        <h5 className='text-slate-500 text-sm'>{cam.title}</h5>
                        <h5 className='text-slate-300 text-xs'>Pricing: {cam.pricing}</h5>

                     </div>
                     <div>

                     </div>

                  </main>
                 

                </div>
            )
         })

         }
       </main>

    </div>
  )
}
function App() {


  return (
    
      <div className=''>
         <Layout>
            <Top />
            <Cams />
         </Layout>
         
      

      </div>
    
  )
}

export default App

const cams=[
  { img:ring,
    title:"Ring",
    pricing:"$30/mo"
  },
  { img:simplisafe,
    title:"Simplisafe",
    pricing:"$30/mo"
  },
  { img:arlo,
    title:"Arlo",
    pricing:"$30/mo"
  },
  { img:vivint ,
    title:"Vivint",
    pricing:"$30/mo"
  },

]
