import React ,{useState,useEffect} from 'react'
import Modal from '../../components/Modal'
import {AiOutlineClose} from "react-icons/ai"
import { GoogleAuthProvider,getAuth,signInWithPopup} from "firebase/auth";
import { doc,getDoc,setDoc,collection, addDoc }  from "firebase/firestore";
import { signUp,db ,auth,logIn} from '../../firebase';
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth"


export default function App() {
    const [trigger,setTrigger]=useState(false)
    const [otherTrigger,setOtherTrigger]=useState(false)
    const [errors,setError]=useState({})

    const [email,setEmail]=useState("")
    const [name,setName]=useState("")
    const [password,setPassword]=useState("")
    const [loading, setLoading]=useState(false)

    let authListner=null
    useEffect( ()=>{
        console.log("listening")
      authListner=onAuthStateChanged(auth,(user)=>{
          if (user !== null) {
              const uid = user.uid;
            
              const userRef =doc(db,"users", uid)
             
              getDoc(userRef).then(res=> {
              console.log(res.exists(),"exist")
              res.exists && window.location.replace("index.html")
            
              chrome.storage.local.set({uid: uid});
            })
          }
          })
       return(
        authListner()
        )
   },[])

    let navigate = useNavigate();

    const validate =(e)=> { 
      console.log("validating")
     
      if (e.target.name==="email") {
    
        console.log("validating email")
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.target.value)){
          setError({
            email:'Invalid email address'
          })
        } 
        if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.target.value)){
          setError({
            email:''
          })
        } 
      } 
      if (e.target.name==="password") {
    
        console.log("validating password")
        if (e.target.value.length<=6){
          console.log("top")
          setError({
            password:"Password is too short"
          })
        } 

      if (e.target.value.length>=6){
        console.log("bottom")
        setError({
          password:"Password strength is good"
        })
      } 
      } 
   
    
    

    };



    const signUpWithEmail=async()=>{

      if( email===""&& password==="") return  setError({ email:'Email field is required', password:'Password field is required' })

     setLoading(true)

     try{ 
         
          const userCredential  = await signUp(email,password)
          console.log(userCredential,"cred")
          const user=userCredential.user
          console.log(user,"user")
          const uid=user.uid
          console.log(uid,"uid")
       
          
          const userRef =doc(db,"users",uid)
          console.log(userRef,"ref")
      
          const payload={email}
          const res= await setDoc(userRef,payload)
          // console.log(docRef,"res")
          uid.length >0&& window.location.replace("index.html")
     }catch(e){
      console.log(e)
       
         setLoading(false)
     
          if(e.message==="Firebase: Error (auth/invalid-email)."){
           return   setError({firebase:"Invalid email"})
         
       }else if(e.message==="Firebase: Error (auth/internal-error)."){
           return   setError({
             firebase:"Poor internet connection"
           })
           // return  toast.error("Poor internet connection")
       }else{
        //  toast.error("Something went wrong! ,try again")
       }


       
       
        
     }
     setLoading(false)
    
}

console.log(email,"email")
console.log(password,"ppp")

const siginIn =async()=>{
  if( email===""&& password==="") return  setError({ email:'Email field is required', password:'Password field is required' })
  setLoading(true)
try{
  const userCredential  = await logIn(email,password)
  const user=userCredential?.user
  console.log(user,"user")
  const uid=user.uid
  
  uid.length >0&& window.location.replace("index.html")
}catch(e){
  console.log(e)

  setLoading(false)
      
  if(e.message==="Firebase: Error (auth/missing-email)."){
   return   setError({firebase:"Invalid email"})
 
  }else if(e.message==="Firebase: Error (auth/internal-error)."){
      return   setError({
        firebase:"Poor internet connection"
      })
      // return  toast.error("Poor internet connection")
  }else{
    // toast.error("Something went wrong! ,try again")
  }
}

}

console.log(errors,"error")


  return (
    <>
    <div className="sm:w-full w-72 flex justify-center  realtive" style={{height:"600px"}}>
        <div className='lg:w-1/2 w-full  px-4 flex flex-col justify-center items-center space-y-10'>

               <main className='flex flex-col items-center'>
                  <img src={"https://d39xvdj9d5ntm1.cloudfront.net/alarm-app/images/device_doorbell_two_2d_sm-4d5a36554dc1ee80cfcacd93143ab314.png"} className="w-20 h-20"/>
                  <h5 className='text-3xl text-slate-500'>Cams</h5>
               </main>
              
              <main className='flex flex-col w-full space-y-3'>
                  <button className='bg-blue-500 rounded-full text-white py-2' onClick={()=>setTrigger(true)}>Login</button>

                 <h5 className='text-center w-full text-slate-500 font-light'>OR</h5>
                 <button className='border-blue-500 border rounded-full text-blue-500 py-2' onClick={()=>setOtherTrigger(true)}>Create an account</button>

              </main>

        </div>
    </div>
      <Modal trigger={trigger}  cname=" lg:w-1/2 w-11/12 rounded-sm py-4  px-4">
          <main className='flex justify-center space-x-12 w-full'>
            <h5 className='text-slate-500 text-lg '>Login</h5>
             <button onClick={()=>setTrigger(false)}><AiOutlineClose className="text-md font-thin text-slate-500" /></button>
         </main>

         <main className='flex flex-col space-y-4 w-full py-6'>
            <input className='border-b w-full outline-none hover:border-blue-500' placeholder='Email'
                     name="email"
                     value={email}
                     onChange={(e)=>setEmail(e.target.value)}
                     onKeyPress={(e)=> validate(e)}
                     onKeyDown={(e)=> validate(e)}
            />
             {errors.email?<h5 className='text-sm w-full items-start flex text-red-700 font-light'>{errors.email}</h5>:null}
            <input  className='border-b w-full outline-none hover:border-blue-500' placeholder='Password'
                onChange={(e)=>setPassword(e.target.value)}
                name="password"
                value={password}
                onKeyPress={(e)=> validate(e)}
            />
              {errors.password?<h5 className='text-sm w-full items-start flex text-red-700 font-light'>{errors.password}</h5>:null}
             <div className='w-full'>
             {/* <a href="index.html">
               <button className='bg-blue-500 rounded-full text-white py-2 w-full ' onClick={siginIn}>Login</button>
               </a> */}
            
               <button className='bg-blue-500 rounded-full text-white py-2 w-full ' onClick={siginIn}>Login</button>
      
             </div>

         </main>

     </Modal>
     <Modal trigger={otherTrigger}  cname=" lg:w-1/2 w-11/12 rounded-sm py-4  px-4">
          <main className='flex justify-center space-x-12 w-full'>
              <h5 className='text-slate-500 text-lg '>Sign in</h5>
             <button onClick={()=>setOtherTrigger(false)}><AiOutlineClose className="text-md font-thin text-slate-500" /></button>
         </main>


         <main className='flex flex-col space-y-4 w-full py-6'>
            <input className='border-b w-full outline-none hover:border-blue-500' placeholder='Email'
                    name="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    onKeyPress={(e)=> validate(e)}
                    onKeyDown={(e)=> validate(e)}
            />
            {errors.email?<h5 className='text-sm w-full items-start flex text-red-700 font-light'>{errors.email}</h5>:null}
            <input  className='border-b w-full outline-none hover:border-blue-500' placeholder='Password'
                onChange={(e)=>setPassword(e.target.value)}
                name="password"
                value={password}
                onKeyPress={(e)=> validate(e)}
            />
             {errors.password?<h5 className='text-sm w-full items-start flex text-red-700 font-light'>{errors.password}</h5>:null}
             <div className='w-full'>
                {/* <a href="index.html">
               <button className='bg-blue-500 rounded-full text-white py-2 w-full '  onClick={signUpWithEmail}>Sign in</button>
               </a> */}
              
               <button className='bg-blue-500 rounded-full text-white py-2 w-full '  onClick={signUpWithEmail}>Sign in</button>
            
             </div>

         </main>

     </Modal>
    </>
  )
}
