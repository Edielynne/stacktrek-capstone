import React,{useState}from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link , useNavigate} from 'react-router-dom';

const Contactus = () => {
  const [field,setfield] = useState(true);
    const ValidField = 'w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
    const ErrorField = 'w-full border-2 text-red-500 border-red-500 rounded-xl p-4 mt-1 bg-transparent'
    let navigate = useNavigate();
    const [from , setFrom] = useState('')
    const  [data , setData] = useState ({
        Email: '',
        Password:'',
        Fname:'',
        Lname:'',
        Address:'',
        Contact:'',
        
    })

    const toastSuccess= () =>{
        toast.success("Registration Done!", {
            position: toast.POSITION.TOP_CENTER
          });
    };
    const toastError = () =>{
        toast.error("Email is Already Used!", {
            position: toast.POSITION.TOP_CENTER
          });
    
    }
    
    
    const handle =  (e)=>{
       
      const newData = {...data}
      //console.log(e.target.type)
      newData[e.target.id] = e.target.value
      setData(newData)
      setFrom("New Email from "+ data.Fname + " " + data.Lname)
     
      console.log(from)
  }

  const thanks = () =>{
    
        //navigate("/thanks") 
  }
  return (


    
   
            
    <div className="flex w-full h-screen">
       

      <div className="w-full flex items-center justify-center">
      <div className='bg-white px-10 py-10 rounded-3xl border-2 border-gray-200 justify-center'>
    <h1 className='text-5xl font-semibold'>Contact us</h1>
    <p>Please enter yor details.</p>
    <form
          action="https://formsubmit.co/barnesedielynne171999@gmail.com"
          method="POST"
          onSubmit={thanks}
        >
    <div className='mt-2 '>


 
    <div className='flex items-center gap-1 '>
          
          <input onChange={(e)=>handle(e)}
               id = "Fname" value = {data.Fname}
              className='focus:ring-pink-500 focus:border-pink-500 w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
              placeholder='First Name'
              type="text"
              name="Firstname"
              required
          />
       

          <input onChange={(e)=>handle(e)}
               id = "Lname" value = {data.Lname}
              className='focus:ring-pink-500 focus:border-pink-500 w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
              placeholder='Last Name'
              type="text"
              name="Lastname"
              required
          />
          <input type="hidden" name="_subject" value={from}></input>
          <input type="hidden" name="_next" value="http://192.168.100.130:3000/thanks"></input>
          <input type="hidden" name="_autoresponse" value="Thankyou! We have recieved your message"></input>
      </div>


        <div>
         
            <input onChange={(e)=>handle(e)}
                id = "Email" value = {data.Email}
                className='focus:ring-pink-500 focus:border-pink-500 w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                placeholder='Enter your email'
                type="email"
                name="email"
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
                id = "Message"
                className='focus:ring-pink-500 focus:border-pink-500 w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                placeholder='Message me!'
                type="text"
                name="Message"
                rows={5}
                required
            />
        </div>

        
        <div className='mt-8 flex flex-col gap-y-4'>
            <button   type="submit" disabled={!field} className='active:scale-[0.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-pink-500 text-white text-lg font-bold'>
                Submit
            </button>
           

        </div>
    </div>
    </form>
</div>
      </div>
       {/* <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200">
       <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-spin"/>
        <div className="w-full h-1/2 absolute bottom-0"/>
      
       </div> */}
      </div>

     

  
    
    

  )
}

export default Contactus