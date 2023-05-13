import { useState,useEffect,useRef } from 'react'
import {Routes,Route } from "react-router-dom"
import Layout from '../../layout'
import {RiArrowDropRightLine} from "react-icons/ri"
import ring from "../../assets/ring3.jpeg"
import simplisafe from "../../assets/simplisafe.jpeg"
import arlo from "../../assets/arlo.jpeg"
import vivint from "../../assets/vivint2.png"
import {BsThreeDotsVertical}  from "react-icons/bs"
import Modal from '../../components/Modal'
import {AiOutlineClose} from "react-icons/ai"
import { onAuthStateChanged } from "firebase/auth"
import { doc,getDoc,setDoc,collection, addDoc }  from "firebase/firestore";
import { db ,auth} from '../../firebase';
import axios from 'axios'
import { BeatLoader } from 'react-spinners'

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

const RingComponent=({currentUser,email,password,setCode})=>{
  const [code,setFaCode]=useState()
  const [err,setErr]=useState("")
  const [loading, setLoading]=useState(false)
   console.log(currentUser,"user")


    const connectRing=async()=>{
      setLoading(true)    
    const url = 'http://localhost:5003/api/v1/cams/ring-connect';
    const data = {
      email:email,
      password:password,
      code:code,
      uid:currentUser?.id
    };
 
     const config = {
       headers:{
           // Authorization: `key=${API_KEY}`,
           'Content-Type': 'application/json',
          
          },
       };
   
   try{
       const response=await axios.post(url, data, config)
       console.log(response.data,"res")
       response.data.status==="success"&& window.location.replace("dashboard.html")
 
     
    
   }catch(e){
       console.log(e.message,"err")
       console.log(e)
       setErr(e.message)
       setLoading(false)
   }
    
    }
   return(
    <div className='w-full py-6'>
        <h5 className='text-lg font-semibold text-slate-500'>Please enter 2fa code </h5>
        <div className='flex flex-col w-full space-y-4'> 
          <div className='w-full flex py-4 space-x-4' >
              <input className='border py-2 w-full rounded-md text-slate-400  text-xs px-4 outline-none' placeholder='******' onChange={(e)=>setFaCode(e.target.value)}/>
              <button className='rounded-full bg-blue-500 px-4 py-1  text-white text-xs font-light flex items-center justify-center' onClick={connectRing}>
                
                   {loading&&<BeatLoader color="white" loading={loading}/>}
                      
                      {!loading&&  <span>Connect</span>}
                 
                </button>
          </div>
          {err?.length >0?<h5 className='text-sm w-full items-start flex text-red-700 font-light'>{"Failed request"}</h5>:null}
          {err?.length >0?
            <h5 className='text-xs text-red-500' onClick={()=>setCode(false)}>Resend 2FA</h5>
            :
            <h5 className='text-xs text-blue-500' onClick={()=>setCode(false)}>Resend 2FA</h5>
          }

 
            
        </div>

    </div>
   )

}


const Cams=({currentUser})=>{
  const [trigger,setTrigger]=useState(false)
  let [select,setSelected]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [sentCode,setCode]=useState(true)
  const [loading, setLoading]=useState(false)



  const connect=async({currentUser})=>{

   
    setLoading(true)

    const url = 'http://localhost:5003/api/v1/cams/send-2fa';
    const data = {
      email:email,
      password:password
    };
 
     const config = {
       headers:{
           // Authorization: `key=${API_KEY}`,
           'Content-Type': 'application/json',
          
          },
       };
   
   try{
       const response=await axios.post(url, data, config)
       console.log(response.data,"res")
        
       response.data.status==="success"&& setCode(true)
     
    
   }catch(e){
       console.log(e.message,"err")
       setCode(true)
       setLoading(false)
   }
   
   }

  
  return(
    <>
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
              
               <div className='shadow-lg h-56 w-full py-2 px-2 flex flex-col space-y-4' onClick={()=>setSelected(cam.title)}>
                  <main className='w-full justify-center flex' onClick={()=>setTrigger(true)} >
                    <img src={cam.img}/>
                  </main>
                  <main className='flex w-full justify-between'>
                     <div className='flex flex-col'>
                        <h5 className='text-slate-500 text-sm'>{cam.title}</h5>
                        <h5 className='text-slate-300 text-xs'>Pricing: {cam.pricing}</h5>

                     </div>
                     <div>
                      <BsThreeDotsVertical />

                     </div>

                  </main>
                 

                </div>
               
                
            )
         })

         }
       </main>

    </div>
    <Modal trigger={trigger}  cname=" lg:w-1/2 w-11/12 rounded-sm py-4  px-4">
                  <main className='flex justify-center space-x-12 w-full'>
                   <h5 className='text-xl text-slate-500'>Connect with {select}</h5>
                       <button onClick={()=>setTrigger(false)}><AiOutlineClose className="text-md font-thin text-slate-500" /></button>
                   </main>
                  
                    {sentCode===false? 
                  <main className='flex flex-col space-y-4 w-full py-6'>
                      <input className='border-b w-full outline-none hover:border-blue-500' placeholder='Email '
                           name="email"
                           value={email}
                           onChange={(e)=>setEmail(e.target.value)}
                      />
                      <input  className='border-b w-full outline-none hover:border-blue-500' placeholder='Password'
                          onChange={(e)=>setPassword(e.target.value)}
                          name="password"
                          value={password}
                      />
                     <div className='w-full'>
                   

       
                         <button className='bg-blue-500 rounded-full text-white py-2 w-full ' onClick={connect}>
                             {loading&&<BeatLoader color="white" loading={loading}/>}
                      
                             {!loading&&  <span>Connect</span>}
                 
                         </button>
                      
                    </div>

                    </main>
                    :
                    <>
                    <RingComponent
                     currentUser={currentUser} 
                     email={email}
                     password={email}
                     setCode={setCode}
                    />
                    </>
                  }
                </Modal>
       
    </>
  )
}
function App() {
  const [currentUser,setcurrentUser]=useState()
    
  console.log("cam")
 let authListner=null
 useEffect( ()=>{
     console.log("listening")
   authListner=onAuthStateChanged(auth,(user)=>{
       if (user !== null) {
           const uid = user.uid;
         
           const userRef =doc(db,"users", uid)
          
           getDoc(userRef).then(res=> {
           console.log(res.exists(),"exist")
           setcurrentUser({...res.data(),id:uid})
      
         })
       }
       })
    return(
     authListner()
     )
},[])

console.log(currentUser,"users")


  return (
    
      <div className=''>
         <Layout>
            <Top />
            <Cams currentUser={currentUser}/>
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
