import React ,{useEffect, useState}from 'react';
import {Link, useNavigate} from 'react-router-dom'
import Axios from 'axios'
import {  toast } from 'react-toastify';



 function Login( {hasUser}) {

    
    const url = "login"
    const  [data , setData] = useState ({
        Email: '',
        Password:'',   
    })
    const [isLogged ,setLogged] = useState(false)

    let navigate = useNavigate();
    //toast . pop ups
    const toastSuccess= () =>{
        toast.success("Welcome Back!", {
            position: toast.POSITION.TOP_CENTER
          });
    };
    const toastError = () =>{
        toast.error("Invalid Password!", {
            position: toast.POSITION.TOP_CENTER
          });
    
    }

    const toastWarning = ()=>{
        toast.warn(`${data.Email} is not registered`, {
            position: toast.POSITION.TOP_CENTER
          });
    }

    //submit form to server
    const submit = async (e) =>{
    
        
        e.preventDefault();

        //connnect to server
        await Axios.get(url,{headers: { 
            'Content-Type': 'application/json',  
            },
            data: {},
            params:{
                Email: data.Email,
                Password: data.Password
            
            }})
        .then(res=>{
            console.log(res)
           //succesful login
            if(res.data.accessToken){ 
                //set token to local storage
                localStorage.setItem('token',res.data.accessToken)
                //set hasuser to local storage to true
                localStorage.setItem('hasUser', true)   
                //set userID into local storage
                localStorage.setItem('userID',res.data.ID )
                console.log(res.data)
                
           
                //change navbar props in order to change menu
                hasUser(true)
                navigate('/Profile')
                toastSuccess()
            }
            else if(res.data == "Invalid"){
                
                
                toastError()
            }
            else if(res.data=="not registered"){
                toastWarning()
            }
        })
        //unsuccesful login
        .catch((err)=>{
           console.log(err)
          
        })
       
    }

    useEffect(() => {
     console.log(localStorage   )
     if(localStorage.length <=1){
        setLogged(true)
    }
    else{
        setTimeout(() => {
            navigate('/Profile')
        }, 2000);
        
    }
    }, [])
    

    const handle = (e) =>{
        const newData = {...data}
        newData[e.target.id] = e.target.value
        setData(newData)
        
    }

    return (
    <div className='flex w-full h-screen'>
       

       
      <div className='w-full flex items-center justify-center  '>
      {!isLogged &&
         <div className="flex items-center justify-center">
         <div role="status">
             <svg className="inline mr-2 w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                 <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
             </svg>
             <span className="sr-only">Loading...</span>
             <h4>Redirecting you to your profile...</h4>
         </div>
     
        </div>
        }
      {isLogged &&
        <div className='bg-white px-10 py-20 rounded-3xl border-2 border-gray-200 justify-center'>
            <h1 className='text-5xl font-semibold'>Welcome Back</h1>
            <p>Welcome back! Please enter yor details.</p>
            <form onSubmit={(e)=>submit(e)}>
            <div className='mt-8'>
                <div>
                    
                    <input onChange={(e)=>handle(e)}
                        id = "Email" value = {data.Email}

                        className='focus:ring-pink-500 focus:border-pink-500 w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder='Enter your email'
                        type="email"
                        required
                    />
                </div>
                <div>
                    <input onChange={(e)=>handle(e)}
                        id = "Password" value = {data.Password}
                        className='focus:ring-pink-500 focus:border-pink-500 w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder='Enter your password'
                        type="password"
                        required
                    />
                </div>
                <div className='mt-8 flex justify-between item-center'>
                    <div >
                        <input
                        type="checkbox"
                        id='remember'
                        />
                        <label className="ml-2 font-medium text-base"for="remember">Remember for 30 days</label>
                    </div>
                    <button>Forgot password</button>
                </div>
                <div className='mt-8 flex flex-col gap-y-4'>
                    <button type="submit" className='active:scale-[0.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-pink-500 text-white text-lg s'>
                        Sign in
                    </button>

                    <button className='active:scale-[0.98] active:duration-75 transition-all hover:scale-[1.01]   font-bold'>
                        <Link to="/user-registration">Create an account </Link>
                    </button>
                </div>
            </div>
            </form>
        </div>
 }
        </div>
        
        </div>
      )
}
  
export default Login