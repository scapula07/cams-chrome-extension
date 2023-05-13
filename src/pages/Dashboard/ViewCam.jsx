import React ,{useState,useEffect} from 'react'
import axios from 'axios'
import Modal from '../../components/Modal'
import { ClipLoader ,FadeLoader} from 'react-spinners'
import {IoRecording} from "react-icons/io5"
import {AiOutlineClose} from "react-icons/ai"

const LiveCam=({camSelect})=>{
     const [done,setDone]=useState(false)
     useEffect(()=>{
       const startStream=async()=>{
        const id=await chrome.storage.local.get("uid")
        console.log(id,"idddd")
       
        const url = 'http://localhost:5002/api/v1/cams/ring-start-stream';
           const data = {
             uid:id.uid,
             camId:camSelect?.id
           };
        
            const config = {
              headers:{
                 
                  'Content-Type': 'application/json',
                 
                 },
              };
          
          try{
              const response=await axios.post(url, data, config)
              console.log(response.data,"stream")
              response.data.message==='Streamed to files'&& setDone(true)
            
            
        
            
           
          }catch(e){
              console.log(e.message,"err")
              console.log(e)
              
          }
           

       }
       startStream()
     },[])
    return(
        <div className='w-full flex items-center justify-center'>
            {done ===false?
              <div className='w-full flex flex-col items-center justify-center space-y-4'>
                     <FadeLoader color='text-blue-500'/>
                     <h5 className='text-slate-500 text-lg'>Starting stream</h5>
              </div>
              :
              <video controls autoplay src='http://localhost:5002/api/v1/cams/ring-stream'/>
            
           }

        </div>
    )
}

export default function ViewCam({camSelect,trigger,setTrigger}) {
    const [cam,setCam]=useState([])
    const [playCam,setPlay]=useState()


    useEffect(()=>{
     const getCamHistory=async()=>{
        const id=await chrome.storage.local.get("uid")
         console.log(id,"idddd")
        
         const url = 'http://localhost:5002/api/v1/cams/get-cam-recording';
            const data = {
              uid:id.uid,
              camId:camSelect?.id
            };
         
             const config = {
               headers:{
                  
                   'Content-Type': 'application/json',
                  
                  },
               };
           
           try{
               const response=await axios.post(url, data, config)
               console.log(response.data,"cameras")
               setCam(response.data.message?.reverse())
               setPlay(response.data.message?.reverse()[0]?.url)
         
             
            
           }catch(e){
               console.log(e.message,"err")
               console.log(e)
               
           }
            
           
     }
        getCamHistory()
    },[])
  return (
    <>
     <div className='py-2 h-full'>
        <main className='flex h-44 w-full  rounded-md px-2 py-2 '>
            <video controls autoplay src={playCam} className='w-full h-full'/>
         </main>

        <main className='flex flex-col w-full overflow-y-scroll space-y-4 py-4' style={{height:"40vh"}}>
            {cam.length===0&&
                <div className='w-full  flex justify-center py-4'>
                    <ClipLoader color='blue'/>
                
                  </div>
            }
            
            {cam.map((camera)=>{
                const dateObj = new Date(camera.created_at);
                const time =dateObj.toLocaleString();
                return(
                    <div className='flex items-center w-full space-x-4 hover:bg-blue-500 hover:text-white  py-2 px-2' onClick={()=>setPlay(camera?.url)}>
                      
                        <IoRecording className='text-blue-500 text-lg ' />
                        <div className='flex flex-col space-y-0.5'>
                           <h5 className='text-sm font-light text-slate-600'>{camera.kind} </h5>
                           <h5 className='text-xs font-light text-slate-400'>{time} </h5>
                         </div>

                    </div>

                )
            })

            }
            

        </main>

     </div>
     <Modal trigger={trigger}  cname=" lg:w-1/2 w-11/12 rounded-sm py-4  px-4">
            <main className='flex justify-end  w-full py-4'>
                    <button onClick={()=>setTrigger(false)}><AiOutlineClose className="text-md font-thin text-slate-500" /></button>
            </main>
                  
        <LiveCam camSelect={camSelect}/>
     </Modal>
     </>
  )
}
