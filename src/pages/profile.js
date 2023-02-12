import React ,{useState,useEffect} from 'react'
import Loading from '../component_images/loads/loading.svg'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import Register from './register'
import UseSettings from './settings'
import { render } from '@testing-library/react'



const Profile = () => {
    const [isLogged, setLogged] = useState(false)
    const navigate = useNavigate()
    const [RenderData, setRender] = useState(0);
    const [userData, setData] = useState({
        Id:'',
        Fname: '',
        Lname: '',
        Email: '',
        Contact: '',
        Address: '',
    })
    const[Settings, setSetting] = useState(false)

 
     
    const opensettings = () =>{
      setSetting(!Settings ? true:false)
      console.log (userData)
    }

    //load data once
    useEffect(()=> {
        let isMounted = true
        console.log("Mounted")
        const getUser = async () =>{
            try{
                const config = {
                    headers:{
                       ' Authorization': 'Bearer ' + localStorage.getItem('token'),
                       'Content-Type': 'application/json'
                    }
                }
              
                const response = await axios.get('userdata', config,{
                    
                })
                
                const ValidUserData = response.data.map((e)=>{
                    setData({
                        Id: e.ID,
                        Fname: e.F_NAME,
                        Lname: e.L_NAME,
                        Email: e.EMAIL,
                        Contact: e.CONTACT_NUM,
                        Address: e.ADDRESS,
                    })
                    //
                })

                console.log(userData.Id)
               
              
                setLogged(true)

            } catch(err){
                
                console.log(err)
                setLogged(false)
                setTimeout(() => {
                  navigate('/user-login');
               }, 2000);

              
            }
        } 

        getUser()
       
        return () =>{
            isMounted = false
            console.log("Unmout")
        }

    },[ ])
 
  return (
   
    <div className="p-16 'w-full flex items-center justify-center">
    
 {!isLogged &&
   <div className='flex w-full h-screen'> 
   <div className='w-full flex items-center justify-center  '>
 <div className='w-full flex items-center justify-center  '>
     <div className="flex items-center justify-center">
    <div role="status">
        <svg className="inline mr-2 w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
        <h4>No Account Found Redirecting...</h4>
    </div>
    </div>
   </div>
   </div>
   </div>
}

     {isLogged&& <div className="p-8 bg-white shadow mt-24">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
          <div>
            <p className="font-bold text-gray-700 text-xl">22</p>
            <p className="text-gray-400">All Purchase</p>
          </div>
          <div>
               <p className="font-bold text-gray-700 text-xl">10</p>
            <p className="text-gray-400">Review</p>
          </div>
              <div>
               <p className="font-bold text-gray-700 text-xl">89</p>
            <p className="text-gray-400">Likes</p>
          </div>
        </div>
        <div className="relative">
          <div className="w-48 h-48 bg-pink-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-pink-500">
          <img
                        className=" rounded-full"
                        src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/14cb6b84808917.5d68451d7d126.gif"
                        alt=""
                      />
          </div>
        </div>
    
        <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
    <button
      className="text-white  py-2 rounded-xl px-5    uppercase      bg-pink-500 hover:bg-pink-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
    >
      My Cart
    </button>
        <button
      className="text-white  py-2 rounded-xl px-5 uppercase  bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
    >
      Message
    </button>
    <button onClick= {opensettings} className="hover:rounded-3xl transition-all duration-300 text-white  py-2 rounded-xl px-5 uppercase  bg-pink-500 hover:bg-pink-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />

        </svg>
        </button>
     
    
        </div>
      </div>
      

    
      <div className="mt-20 text-center border-b pb-12">
        <h1 className="text-4xl font-medium text-gray-700">{userData.Fname} {userData.Lname}</h1>
        <p className="font-light text-gray-600 mt-3">{userData.Address}</p>
    
       
      </div>
      

      {Settings && 
      <div className= "transition ease-in-out delay-150">
        <UseSettings userinfo= {userData} render ={render}/>
       </div>
      
}

      <div className="mt-12 flex flex-col justify-center">
        <p className="text-gray-600 text-center font-light lg:px-16">Mock up Text </p>
        <button
      className="text-indigo-500 py-2 px-4  font-medium mt-4"
    >
      Show more
    </button>
      </div>
    
    </div>}
    
    </div>

  )
}

export default Profile