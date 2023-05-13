import React,{useEffect, useState} from 'react'
import Layout from '../../layout'
import {MdOutlineCameraswitch,MdAccessAlarms,MdOutlineSettings,MdToggleOff} from "react-icons/md"
import {TbDeviceCctv,TbDeviceSpeaker} from "react-icons/tb"
import {BsToggle2Off,BsToggle2On} from "react-icons/bs"
// const webpush = require('web-push');
import { doc,updateDoc }  from "firebase/firestore";
import { db} from '../../firebase';
import { useId } from 'react'


export default function App() {
    let count=0
    let [toggle,setToggle]=useState(false)
    var registrationId = "";
    const senderId="455140240585"

    const Register=()=>{
      console.log("Registering")
      chrome.gcm.register([senderId], registerCallback);
      chrome.storage.local.set({toggleState: true});
      setToggle(true)

    }

    const registerCallback=async(regId) =>{
      registrationId = regId;
      console.log(regId,"regID")
      // document.getElementById("register").disabled = false;
       chrome.storage.local.set({registrationToken: regId});
        const uid=await chrome.storage.local.get("uid")
        console.log(uid?.uid,"uidddd")
       const userRef =doc(db,"users",uid?.uid)
        console.log(userRef,"ref")
      try{
        // const payload={email}
        const res= await updateDoc(userRef,{notificationToken:regId})
        console.log(res,"resssss")
      }catch(e){
        console.log(e)
      }
   
    
      if (chrome.runtime.lastError) {
        // When the registration fails, handle the error and retry the
        // registration later.
        console.log("Registration failed: " + chrome.runtime.lastError.message);
        return;
      }
    

    
      // Mark that the first-time registration is done.
      chrome.storage.local.set({registered: true});
     
    
      // Format and show the curl command that can be used to post a message.
      // chrome.gcm.send(
      //   {},
      //   function(messageId){
      //     console.log(messageId)
      //   },
      // )
    }

    useEffect(()=>{
      const getToggle=async()=>{
        const toggle=await chrome.storage.local.get("toggleState")
        console.log(toggle.toggleState ==undefined? false :true,"toggle")
        setToggle(toggle.toggleState ==undefined? false :true)
      }
      getToggle()
      
    },[])
    console.log(toggle,"toggle")
  return (
    <div>
         <Layout>
         <div className='flex flex-col py-4  space-y-6 w-full'  >
          <main className='flex w-full justify-end'>
             <div className='flex items-center space-x-4'>
                <h5 className='font-semibold'>Enable Nofitication</h5>
               {toggle===false?
               <BsToggle2Off className='text-blue-300 text-2xl' onClick={Register} />
                 :
             < BsToggle2On  className='text-blue-500 text-2xl' onClick={()=>setToggle(false)}/>

               }
                

             </div>

          </main>
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
