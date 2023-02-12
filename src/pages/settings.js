import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './loading';


const UseSettings = ({userinfo}) => {

    const url = "update-user-information"

    
    const navigate = useNavigate()
    const [isSubmitted , setSubmit] = useState(false)
    
    const  [data , setData] = useState ({
        Email: '',
        Password:'',
        Fname:'',
        Lname:'',
        Address:'',
        Contact:'',
    })

    const toastSuccess= () =>{
        toast.success(`Hello`, {
            position: toast.POSITION.TOP_CENTER
          });
    };
    const toastError = () =>{
        toast.error("Email is Already Used!", {
            position: toast.POSITION.TOP_CENTER
          });
    
    }

    const RegisterSuccess =async () =>{
        await Axios.get('login',{headers: { 
            'Content-Type': 'application/json',  
            },
            data: {},
            params:{ 
                Email: data.Email,
                Password: data.Password
            
            }})
        .then(res=>{
           toastSuccess()
           setSubmit(true)
        })
        .catch((err)=>{
           console.log(err)
          
        })
    }

    
    const submit = async (e) =>{
        
      
        e.preventDefault();
        
       await Axios.put(url,{
        ID: userinfo.Id,
        Fname: data.Fname,
        Lname: data.Lname,
        Address: data.Address,
        Contact: data.Contact
        })
        .then(res=>{
          
           if(res.data === 'false'){
            toastError()
            }
            else{
              RegisterSuccess()
            }
         
        })
        .catch((err)=>{
           console.log(err.message)
           
        })
       
    }


    const handle =  (e)=>{
        const newData = {...data}
        //console.log(e.target.type)
        newData[e.target.id] = e.target.value
        setData(newData)

        
        //console.log(newData)
    }
  return (
    <div className='flex w-full py-2'>
        { isSubmitted && <Loading status = {"Loading...."} goto = {"/profile"}/>}
     { !isSubmitted &&   
    <div className='w-full flex justify-center  '>  
    <div className='bg-white px-10 py-10 rounded-3xl border-3 border-gray-200 '>
    <h1 className='text-5xl font-semibold'>Settings</h1>
    <form onSubmit={(e)=>submit(e)}>
    <div className='mt-2 '>
        
        
        
        <label className='text-lg font-medium '>Informations</label>

        <div className='flex items-center gap-1 '>
            
            <input onChange={(e)=>handle(e)}
                id = "Fname" value = {data.Fname}
                className='focus:ring-pink-500 focus:border-pink-500 sw-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                placeholder={userinfo.Fname}
                type="text"
                
            />
        

            <input onChange={(e)=>handle(e)}
                id = "Lname" value = {data.Lname}
                className='focus:ring-pink-500 focus:border-pink-500 w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                placeholder={userinfo.Lname}
                type="text"
                
            />
        </div>

        <div>
            
            <input onChange={(e)=>handle(e)}
                id = "Contact" value = {data.Contact}
                className='focus:ring-pink-500 focus:border-pink-500 w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                placeholder={userinfo.Contact}
                type="tel"
                
            />
        </div>

        <div>
            <textarea onChange={(e)=>handle(e)}
                id = "Address" value = {data.Address}
                className='focus:ring-pink-500 focus:border-pink-500 w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                placeholder={userinfo.Address}
                type="text"
                
            />
        </div>

        
        <div className='mt-8 flex flex-col gap-y-4'>
            <button   type="submit"  className='active:scale-[0.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-pink-500 text-white text-lg font-bold'>
                Update
            </button>
            

        </div>
    </div>
    </form>
    </div>
    </div>
    }
<ToastContainer autoClose={3000} />
</div>

  )
}

export default UseSettings