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
  const [carts,setCarts] = useState([]) 
  useEffect(() => {
    let CartisMounted = true
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
            console.log(res.data)
            res.data.map((e)=> {
              setCart({
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
    
    getCart()
    return ()=>{
      CartisMounted = false
    }
 
  }, [])
  
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

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {carts.length == 0 && <div className="inline-block align-middle" >Your Cart is empty <br>
                            </br>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">ADD TO CART NOW! </button></div>}
                            {carts.map((product) => (
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
                                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">Qty {product.QUANTITY}</p>

                                    <div className="flex">
                                      <button
                                        type="button"
                                        className="font-medium text-pink-600 hover:text-indigo-500"
                                      >
                                        Remove
                                      </button>
                                    </div>
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
                        <p>$262.00</p>
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