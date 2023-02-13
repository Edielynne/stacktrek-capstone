import React,{ Fragment, useState , useEffect} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Navbar from '../navbar'
import Axios from 'axios'




const products = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
 
  // More products...
]




const Cart = (isOpen) =>{
  const [cartData, setCart] = useState({
    id : '',
    color : '',
    price:'',
    name: '',
    quantity :'',
    image: ''
  })

  const [loader, setLoader] = useState(false)
  
  const [total, setTotal] = useState(0)
  const [counter, setCounter] = useState(0)
  const remove =async (product_id) =>{ 
    setLoader(true)
    setTimeout(() => {
     setLoader(false)
    }, 1000); 
    try {
      console.log(product_id)
      setCounter(value => value + 1)
     
      await Axios.delete(`/api/remove` , {headers: { 
      'Content-Type': 'application/json',  
      },
      data: {},
      params:{
          ID: localStorage.getItem("userID"),
          PROD_ID: product_id
      }})
      if(carts.length == 0 ){
        setCarts([])
        console.log("SSS")
      }
    }
    catch(err){
      console.log(err)
  
    }
  }

  const subtract =async (product_id,quantity) =>{ 
    setLoader(true)
    setTimeout(() => {
     setLoader(false)
    }, 1000);
    if(quantity-1 == 0 ){
      console.log(quantity)
      remove(product_id)
    } 
   
    else{
      try {
        console.log(product_id)
        setCounter(value => value + 1)
       
        await Axios.put(`/api/subtractcart` , {headers: { 
        'Content-Type': 'application/json',  
        },
        data: {},
        params:{
            ID: localStorage.getItem("userID"),
            PROD_ID: product_id,
            QUANTITY: quantity -1
        }})
       
        if(carts.length == 0 ){
          setCarts([])
          console.log("Subtract")
        }
        
      }
      catch(err){
        console.log(err)
        
      }
    }
   
  }


  const add = async (product_id,quantity) =>{ 
    setLoader(true)
    setTimeout(() => {
     setLoader(false)
    }, 1000);
    console.log("qsqweq ",quantity)
   
      try {
       
        setCounter(value => value + 1)
       
        await Axios.put(`/api/addcart` , {headers: { 
        'Content-Type': 'application/json',  
        },
        data: {},
        params:{
            ID: localStorage.getItem("userID"),
            PROD_ID: product_id,
            QUANTITY: quantity +1
        }})
       
      }
      catch(err){
        console.log(err)
    
      }
    
      
  }

  const getCart = async () =>{
   
    try {
        await Axios.get(`/api/usercart` , {headers: { 
        'Content-Type': 'application/json',  
        },
        data: {},
        params:{
            ID: localStorage.getItem("userID")
        }})
        .then(res => {
          console.log(res.data.length)
          if(res.data.length == 0){
             
            setCarts([])
            console.log("carts here")
            console.log(carts)
          
        }
          res.data.map((e)=> {
            setCart ({
              id :  e.PRODUCT_ID,
              color : e.color,
              price: e.price,
              name: e.product_name,
              quantity :e.QUANTITY,
              image: "https://cdn.dribbble.com/users/1008900/screenshots/16168560/swimsuit_mockup_1600_1200_4x.jpg", //info.image, I use temporary link
            })
            
            
            setCarts(res.data)
           
            console.log("Set")
          
          })
        })
       
    }
    catch(err){
      console.log(err)
    }
  }

  
  const [carts,setCarts] = useState([]) 
  let CartisMounted = true
  useEffect(() => {
    getCart()
    
    return ()=>{
      CartisMounted = false
      
    }
   
  }, [counter])
  
  const [open, setOpen] = useState(true)
  const CartState = () =>{
    setOpen(false)
  }
  console.log(carts)

 

  
  


  return(  

    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                        
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={CartState}
                          >
                           
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                     
                      <div className= { carts.length <1 ? "mt-8 text-center content-center  justify-center" : "mt-8 text-start" }  >
                      {carts.length <1 && <div className="items-center text-center justify-center inline-block align-middle " >
                          <h1 className="text-lg  font-medium text-center text-gray-900"> Your Cart is empty  </h1>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">ADD TO CART NOW! </button></div>
                            }
                        <div className="flow-root">
                        

                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                          
                            {carts.length >= 1 && carts.map((product) => (
                              
                              <li key={product.ID} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                  src = "https://cdn.dribbble.com/users/1008900/screenshots/16168560/swimsuit_mockup_1600_1200_4x.jpg"
                                    // src={product.image}
                                    
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>
                                
                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href={product.href}>{product.product_name}</a>
                                      </h3>
                                      <p className="ml-4">{product.price}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{product.color} </p>
                                    
                                  </div>
                                 
                                  <div className="flex flex-1 items-end justify-between text-sm">

                                    
                                 
                                  
                                    {/* loader */}

                           
                                  {loader && <div role="status" class="items-center max-w-sm ">
                                  <div role="status">
                                    <p className="animate-bounce"> Loading... </p>
                                    <svg aria-hidden="true" class="w-5 h-5 mr-2 text-pink-200 animate-spin dark:text-white fill-pink-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>  </svg>
                                    <span class="sr-only">Loading...</span>
                                   
                                </div>
                                   
                                  </div>}

                                  {!loader && <div className="flex space-x-2 ">
                                      <button
                                        type="button"
                                        class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-3 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-1 py-1 text-center "
                                        onClick={()=>subtract(product.ID, product.QUANTITY )}
                                      >
                                        <svg class="fill-current text-white w-3" viewBox="0 0 448 512">
                                        <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
                                        </svg>
                                        
                                      </button>
                                      <p className="pl-5 pr-5 border   text-sm text-gray-500">{product.QUANTITY}</p>
                                      <button
                                        type="button"
                                        class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-3 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-1 py-1 text-center "
                                        onClick={()=>add(product.ID, product.QUANTITY )}
                                      > 
                                      <svg class="fill-current text-white w-3" viewBox="0 0 448 512">
                                      <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
                                      </svg>
                                      </button>
                                    </div>
                                    }
                                  {!loader &&<div className="flex">
                                      <button
                                        type="button"
                                        className="font-medium text-pink-600 hover:text-indigo-500"
                                        onClick={()=>remove(product.ID)}
                                      >
                                        Remove
                                      </button>
                                      
                                    </div>}
                                  
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${total}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                        <a
                          href="#"
                          className="flex items-center justify-center rounded-md border border-transparent bg-pink-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </a>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          
                          <button
                            type="button"
                            className="font-medium text-purple-600 hover:text-indigp-500"
                            onClick={CartState}
                            
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
          
        </div>
        
      </Dialog>
     
    </Transition.Root>
  )
}
export default Cart