import React, { useState , useEffect } from 'react'
import {useParams} from 'react-router-dom'
import Axios from 'axios'
import { useHistory ,useLocation } from 'react-router-dom';
const Productpage = () => {

  
  const location = useLocation() // useLocation to get url path or search 
  const getID = location.search.split("=")[1] //get the id number
  //console.log(location.search.split("="))
  const [fetchInfo,setInfo] = useState([])
 //console.log(location)


  useEffect(() => {
      const getProduct = async () =>{
        try {
          await Axios.get(`/api/products/productinfo` , {headers: { 
            'Content-Type': 'application/json',  
            },
            data: {},
            params:{
                ID: getID
            }})
          .then(res => {
            res.data.map((info)=>{
              setInfo({
                id: info.ID,
                color: info.color,
                image: "https://cdn.dribbble.com/users/1008900/screenshots/16168560/swimsuit_mockup_1600_1200_4x.jpg", //info.image, I use temporary link
                price: info.price,
                productName:info.product_name,
                quantity: info.quantity   
            }) // pass server response to useState()
           
            })
          })  
        }
        catch(err){
          console.log(err)
        }
      }
      getProduct()
  }, [])


 

  return (
    <div>
        <section className="text-gray-700 body-font overflow-hidden bg-white">
  <div className="container px-5 py-24 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <img alt="ecommerce" className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src={fetchInfo.image}/>
      <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">Swim n' Waves</h2>
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{fetchInfo.productName}</h1>
        
        
        <div className="flex justify-center mb-4">
          <span className="flex items-center">
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-yellow-400" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-yellow-400" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-yellow-400" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-yellow-400" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <span className="text-gray-600 ml-3">4 Reviews</span>
          </span>
          <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
            <a className="text-pink-500">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a className="ml-2 text-pink-500">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a className="ml-2 text-pink-500">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
              </svg>
            </a>
          </span>
        </div>
    

        <div className='grid grid-cols-2 divide-x pt-5 border-t-2 border-gray-200 mt-5'>
        <div>
        <p className="font-bold text-md ">descriptions header</p>
        <p className=" text-sm ">descriptions  descriptionsdescrip tions descriptio escriptions descriptions descriptionsdescriptions</p>
        </div>
      
        <div>
        <p className=" text-sm font-bold">Color Variant: {fetchInfo.color}</p>
        <p className="text-sm ">Available Stocks: {fetchInfo.quantity}</p>
        
       
        </div>
        </div>
        
      
        
        <div className="flex justify-center mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
          
          <div className="flex  items-center">
            <span className="mr-3">Size</span>
            <div className="relative">
              <select className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
              </select>
              <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </div>

            <span className="mr-3 ml-2">Quantity</span>
            <div className="relative">
              <select className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
              <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            
            </div>
           
          </div>
        </div>
        <div className="flex">
          <span className="title-font font-medium text-2xl text-gray-900">₱{fetchInfo.price}</span>
          <button className="flex ml-auto text-pink-600 bg-pink-50 border-2 border-pink-500 py-2 px-6 focus:outline-none hover:bg-white rounded">Add to cart</button>
          <button className="flex ml-2 text-white bg-pink-600 border-0 py-2 px-6 focus:outline-none hover:bg-pink-700 rounded">Buy now</button>
          <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4 hover:text-pink-600">
            <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
            </svg>
          </button>
          
        
        </div>

       
      </div>
    </div>
  </div>
</section>
{/* reviews here */}
<div className='container px-5 py-24 mx-auto'>
<article className="md:gap-8 md:grid md:grid-cols-3">
    <div>
        <div className="flex items-center mb-6 space-x-4">
            <img className="w-10 h-10 rounded-full" src="https://media-exp1.licdn.com/dms/image/C5603AQGeTITd7Pyg5g/profile-displayphoto-shrink_800_800/0/1550860028853?e=2147483647&v=beta&t=pnCbx6UnGHpd_L977B8T4aFYd5dBnWDLKV-MJvJhlg4" alt=""/>
            <div className="space-y-1 font-medium dark:text-gray-600">
                <p>Je se Leos</p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    
                    United States
                </div>
            </div>
        </div>
        <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
            <li className="flex items-center"><svg aria-hidden="true" className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clip-rule="evenodd"></path></svg>Apartament with City View</li>
            <li className="flex items-center"><svg aria-hidden="true" className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>3 nights December 2021</li>
            <li className="flex items-center"><svg aria-hidden="true" className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path></svg>Family</li>
        </ul>
    </div>
    <div className="col-span-2 mt-6 md:mt-0">
        <div className="flex items-start mb-5">
            <div className="pr-4">
                <footer>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">Reviewed: <time datetime="2022-01-20 19:00">January 20, 2022</time></p>
                </footer>
                <h4 className="text-xl font-bold text-gray-900 dark:text-gray-600">Spotless, good appliances, excellent layout, host was genuinely nice and helpful.</h4>
            </div>
            <p className="bg-blue-700 text-white text-sm font-semibold inline-flex items-center p-1.5 rounded">5.0</p>
        </div>
        <p className="mb-2 font-light text-gray-500 dark:text-gray-400">The flat was spotless, very comfortable, and the host was amazing. I highly recommend this accommodation for anyone visiting Brasov city centre. It's quite a while since we are no longer using hotel facilities but self contained places. And the main reason is poor cleanliness and staff not being trained properly. This place exceeded our expectation and will return for sure.</p>
        <p className="mb-5 font-light text-gray-500 dark:text-gray-400">It is obviously not the same build quality as those very expensive watches. But that is like comparing a Citroën to a Ferrari. This watch was well under £100! An absolute bargain.</p>
        <aside className="flex items-center mt-3 space-x-5">
            <a href="#" className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                <svg aria-hidden="true" className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path></svg>
                Helpful
            </a>
            <a href="#" className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline dark:text-blue-500 group">
                <svg aria-hidden="true" className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z"></path></svg>
                Not helpful
            </a>
        </aside>
    </div>
</article>
</div>

    </div>
  )
}

export default Productpage