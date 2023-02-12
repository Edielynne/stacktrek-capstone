import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {

    const url = "register"

    //if confirm password is wrong then turn red
    const [field,setfield] = useState(true);
    const ValidField = 'focus:ring-pink-500 focus:border-pink-500 w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
    const ErrorField = 'focus:ring-pink-500 focus:border-pink-500 w-full border-2 text-red-500 border-red-500 rounded-xl p-4 mt-1 bg-transparent'
    const navigate = useNavigate()
    const  [data , setData] = useState ({
        Email: '',
        Password:'',
        Fname:'',
        Lname:'',
        Address:'',
        Contact:'',
        
    })

    const toastSuccess= () =>{
        toast.success(`Welcome ` + data.Fname, {
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
           
            if(res.data.accessToken){ 
                
                localStorage.setItem('token',res.data.accessToken)
                localStorage.setItem('hasUser', true)
                
                navigate('/Profile')
                toastSuccess()
            }
          
        })
        .catch((err)=>{
           console.log(err)
          
        })
    }

    
    const submit = async (e) =>{
        
      
        e.preventDefault();
        
       await Axios.post(url,{
        Email: data.Email,
        Password: data.Password,
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

        if(newData.Confirm === newData.Password){
           setfield(true)
        }
        else{
                setfield(false)
        }
        
        //console.log(newData)
    }
  return (

    <div className='flex w-full h-screen'>
      <div className='w-full flex items-center justify-center  '>
    <div className='bg-white px-10 py-10 rounded-3xl border-2 border-gray-200 justify-center'>
    <h1 className='text-5xl font-semibold'>Welcome</h1>
    <p>Please enter yor details.</p>
    <form onSubmit={(e)=>submit(e)}>
    <div className='mt-2 '>
        <div>
         
            <input onChange={(e)=>handle(e)}
                id = "Email" value = {data.Email}
                className='focus:ring-pink-500 focus:border-pink-500 w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                placeholder='Enter your email'
                type="email"
                required
            />
            
        </div>

        <div className='mb-5'>
            
            <input onChange={(e)=>handle(e)}
                id = "Password" value = {data.Password}
                className='focus:ring-pink-500 focus:border-pink-500 w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                placeholder='Enter your password'
                type="password"
                required
            />
            
             <input onChange={(e)=>handle(e)}
                id = "Confirm" value={data.confirmpass}
                className={field ?  ValidField : ErrorField}
                placeholder='Re-type your password'
                type="password"
                required
            />
        </div>
        
       
        <label className='text-lg font-medium '>Informations</label>

        <div className='flex items-center gap-1 '>
          
            <input onChange={(e)=>handle(e)}
                 id = "Fname" value = {data.Fname}
                className='focus:ring-pink-500 focus:border-pink-500 sw-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                placeholder='First Name'
                type="text"
                required
            />
         

            <input onChange={(e)=>handle(e)}
                 id = "Lname" value = {data.Lname}
                className='focus:ring-pink-500 focus:border-pink-500 w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                placeholder='Last Name'
                type="text"
                required
            />
        </div>

        <div>
           
            <input onChange={(e)=>handle(e)}
                 id = "Contact" value = {data.Contact}
                className='focus:ring-pink-500 focus:border-pink-500 w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                placeholder='Contact Number'
                type="tel"
                required
            />
        </div>

        <div>
            <textarea onChange={(e)=>handle(e)}
                id = "Address" value = {data.Address}
                className='focus:ring-pink-500 focus:border-pink-500 w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                placeholder='Address'
                type="text"
                required
            />
        </div>

        <div className='mt-8 flex  items-center'>
            <div >
                <input
                type="checkbox"
                id='remember'
                required
                />
                <label className="ml-2 font-medium text-base"for="remember">I Agree to terms and conditions</label>
            </div>
           
        </div>
        <div className='mt-8 flex flex-col gap-y-4'>
            <button   type="submit" disabled={!field} className='active:scale-[0.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-pink-500 text-white text-lg font-bold'>
                Sign up
            </button>
            <button className='active:scale-[0.98] active:duration-75 transition-all hover:scale-[1.01]   font-bold'>
                        <Link to="/user-Login">Already have an account? </Link>
                    </button>

        </div>
    </div>
    </form>
</div>
</div>
<ToastContainer autoClose={3000} />
</div>

  )
}

export default Register