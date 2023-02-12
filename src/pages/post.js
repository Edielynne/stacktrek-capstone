import React , {useState}from 'react'
import Productpage from './productpage'
import { Link, useParams } from 'react-router-dom'
import {  toast } from 'react-toastify';
import Axios from 'axios'
const Posts = ({fetchdata , posts}) => {
   
      
 
    
    const products = posts.map( (info) =>{  
      // console.log (info)
        return  {
            id: info.ID,
            href: `/products/ ?ID=${info.ID}`,
            color: info.color,
            imageSrc: "https://cdn.dribbble.com/users/1008900/screenshots/16168560/swimsuit_mockup_1600_1200_4x.jpg", //info.image,
            price: info.price,
            name: info.product_name,
            quantity: info.quantity
        }
    })

    const toastError = () =>{
      toast.error("You have the maximun stock in your cart", {
          position: toast.POSITION.TOP_CENTER
        });
  
  }
    const toastSuccess= () =>{
      toast.success("Added to card", {
          position: toast.POSITION.TOP_CENTER
        });
  };

 
    const addtocart = async (productID) =>{
      console.log(productID)
      console.log(localStorage.getItem('userID'))
      await Axios.post ('/api/addtocart',{
        productID: productID,
        userID: localStorage.getItem('userID'),
        quantity:1
        }).then(res => {
          console.log(res)
          
          if(res.data.includes  ("Out of Stock")){
            toastError()
          }
          else{
            toastSuccess()
          }
        })
     
     
    }
  return (
    <div className="bg-white" >
    <div className="mx-auto max-w-2xl py-5 px-4 sm:py-5 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 className="sr-only">Products</h2>

      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (<div>
          <Link key={product.id} to={product.href} className="group">
            <div   className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
              <img
                src={product.imageSrc}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
           
            {/* <div className="flex items-center justify-between px-10 py-1">
            <button className= 'active:scale-[0.98] px-5 py-0.2 active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl text-pink-500 text-sm font-bold '> Like</button>
            <button className='active:scale-[0.98] px-5 py-0.2 active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl text-pink-500 text-sm font-bold '> Add to Cart</button>
            </div> */}

            <div className="mt-1 flex justify-between">
            <div>
            <h3 className=" text-sm text-gray-700">{product.name}</h3>
              </div>
            <span className=" text-md text-gray-800">₱{product.price}</span>
            </div>
            <span className=" text-md text-gray-800">{product.color}</span>
          </Link>

          <div className="flex items-center justify-between px-10 py-1">
            <button className= 'active:scale-[0.98] px-5 py-0.2 active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl text-pink-500 text-sm font-bold '> Like</button>
            <button className='active:scale-[0.98] px-5 py-0.2 active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl text-pink-500 text-sm font-bold ' onClick={()=>addtocart(product.id)}> Add to Cart</button>
            </div>
          
          </div>
        ))}
        
      </div>
        
    </div> 
    </div> 
  
  )
}

export default Posts
