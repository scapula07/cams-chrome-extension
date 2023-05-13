import React,{useState,useEffect} from 'react'
import Layout from '../../layout'
import {MdOutlineCameraswitch,MdAccessAlarms,MdOutlineSettings,MdToggleOff} from "react-icons/md"
import {TbDeviceCctv,TbDeviceSpeaker} from "react-icons/tb"
import {BiMap,BiDotsVerticalRounded} from "react-icons/bi"
import {AiOutlineCamera} from "react-icons/ai"
import {FiAlertCircle} from "react-icons/fi"
import { onAuthStateChanged } from "firebase/auth"
import { doc,getDoc,setDoc,collection, addDoc }  from "firebase/firestore";
import { db ,auth} from '../../firebase';
import axios from 'axios'
import { Buffer } from 'buffer' 
import { ClipLoader } from 'react-spinners'
import {MdOutlineBatteryStd} from "react-icons/md"
import {BiCameraOff} from "react-icons/bi"
import ViewCam from './ViewCam'

const Top=()=>{
    return(
        <div></div>
    )
}

const SideBar=({setTab,currentUser,currentTab})=>{
    return(
        <div className='flex flex-col w-1/6 shadow-lg rounded-full space-y-6 items-center py-6 relative 'style={{height:"70vh",width:"15%"}}>
            <MdOutlineCameraswitch className={`${currentTab ==="cameras" ?"text-2xl text-blue-500":"text-2xl text-slate-500" }`}  onClick={()=>setTab("cameras")}/>
            <MdAccessAlarms  className={`${currentTab ==="alarms" ?"text-2xl text-blue-500":"text-2xl text-slate-500" }`}  onClick={()=>setTab("alarms")}/>
            <TbDeviceCctv  className={`${currentTab ==="devices" ?"text-2xl text-blue-500":"text-2xl text-slate-500" }`}  onClick={()=>setTab("devices")} />
            <MdOutlineSettings  className={`${currentTab ==="settings" ?"text-2xl text-blue-500":"text-2xl text-slate-500" }`}  onClick={()=>setTab("settings")}/>
            <main className=' absolute bottom-0 py-4' >
                <div className='flex justify-center items-center rounded-full bg-blue-500 text-white w-6 h-6 '>
                    {currentUser?.email?.slice(0,1)}
                </div>

            </main>

        </div>
    )
}


const Cams=({currentUser})=>{
    let count=0
    const [cameras,setCams]=useState([])
    const [viewCam,setView]=useState(false)
    const [camSelect,setSelect]=useState()
    const [trigger,setTrigger]=useState(false)
   
    useEffect(()=>{
      
      
        const getAllCams=async()=>{
            const id=await chrome.storage.local.get("uid")
            console.log(id,"idddd")
             console.log(currentUser?.id,"id")
            const url = 'http://localhost:5002/api/v1/cams/get-all-Cams';
                const data = {
                  uid:id.uid
                };
             
                 const config = {
                   headers:{
                      
                       'Content-Type': 'application/json',
                      
                      },
                   };
               
               try{
                   const response=await axios.post(url, data, config)
                   console.log(response.data,"cameras")
                   setCams(response.data.message)
                 
             
                 
                
               }catch(e){
                   console.log(e.message,"err")
                   console.log(e)
                   
               }
                

           

        }
        getAllCams()
    },[currentUser])

 const selectCam=async(cam)=>{
    console.log(cam,"chosen")
    setSelect(cam)
    setView(true)
   
    }
    console.log(camSelect,"selected cam")
    return(
        <div className='w-full'>
             {viewCam ===false?
              <h5 className='text-slate-500 font-semibold text-lg w-full'>Cameras</h5>
                :
              <h5 className='text-slate-500 font-semibold text-sm w-full flex items-center justify-between'>
                <span>{camSelect?.description} camera</span>
                <button className=' bg-blue-500 text-white rounded-full px-2 py-0.5' style={{fontSize:"9px"}} onClick={()=>setTrigger(true)}>Live cam</button>
                
            </h5>
             }
              {viewCam ===false&&
            <main className='grid grid-flow-row grid-cols-1  gap-4 w-full py-4 overflow-y-scroll ' style={{height:"70vh"}}>
                {cameras.length===0?
                <div className='w-full flex  justify-center  py-8'>
                  <ClipLoader color='blue' />
                </div>
                :
                <>
              
                  {cameras.map((cam)=>{

                count++
                return(
                   <div className='border w-full px-4 py-2 rounded-md '>
                      <main className='flex items-center justify-between w-full'>
                           <h5 className='flex items-center space-x-2 '>
                            <AiOutlineCamera className='text-lg text-slate-600'/>
 
                              <span className='hover:text-blue-500' onClick={()=>selectCam(cam)}>{cam?.description} </span>

                           </h5>
                           <BiDotsVerticalRounded className='text-lg text-slate-600'/>

                         </main>

                         <div className='h-44 py-2'>
                            {cam.imageBuffer?.data?
                                <img 
                                src={`data:"img/png";base64,${Buffer.from(cam.imageBuffer.data).toString('base64')}`}
                                className="h-full w-full"
                              />
                              :
                              <div className='flex items-center flex-col space-y-4 justify-center h-full'>
                                 <BiCameraOff className='text-slate-500 text-xl '/>
                                <h5>Turn off</h5>
                             </div>
                            }
                           

                         </div>

                         <div className='flex items-center space-x-2 ' >
                            <MdOutlineBatteryStd className='text-blue-500 text-2xl '/>
                            <h5 className='text-slate-500 font-semibold text-sm'>{cam.battery_life}%</h5>

                         </div>


                   </div>
                     )
                 })
                } 
             

        
              </>
          }
            </main>
          }
            {viewCam ===true&&
            <> 
            <ViewCam camSelect={camSelect} trigger={trigger} setTrigger={setTrigger}/>
            
            </>
            }

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
    const [currentUser,setcurrentUser]=useState()
     const [address,setAddress]=useState("")
    
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
              chrome.storage.local.set({uid: uid});
              setcurrentUser({...res.data(),id:uid})

              const getLocation=async()=>{
                const url = 'http://localhost:5002/api/v1/cams/ring-user-location';
                const data = {
                  uid:uid
                };
             
                 const config = {
                   headers:{
                       // Authorization: `key=${API_KEY}`,
                       'Content-Type': 'application/json',
                      
                      },
                   };
               
               try{
                   const response=await axios.post(url, data, config)
                  
                   setAddress(response.data.message)
             
                 
                
               }catch(e){
                   console.log(e.message,"err")
                   console.log(e)
                   
               }
                

              }
              getLocation()

            
         
            })
          }
          })
       return(
        authListner()
        )
  },[])

 
  console.log(currentUser,"user")
  console.log("dashbaord")
  return (
    <div>
        <Layout>
             <div className='flex w-full space-x-6'>
                 <SideBar setTab={setTab} currentUser={currentUser} currentTab={currentTab}/>


               <div className='w-full'>
                  <h5 className='flex items-center space-x-3 '>
                    <BiMap className='text-blue-600 text-lg'/>
                    <span className='text-sm text-slate-500 '>{address.address1},{address.city}</span>

                  </h5>

                <main className='py-10 w-full '>
                  {currentTab==="cameras" && <Cams currentUser={currentUser}/>}
                  {currentTab==="alarms" && <Alarms currentUser={currentUser}/>}
                  {currentTab==="devices" && <Devices currentUser={currentUser}/>}
                  {currentTab==="settings" && <Settings currentUser={currentUser}/>}
                  </main>

               </div>
 
             </div>
            

        </Layout>
    </div>
  )
}
