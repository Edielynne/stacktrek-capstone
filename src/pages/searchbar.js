import React, { useState, useEffect } from 'react'

const Searchbar = ({search, status}) => {
    const [query, setQuery] = useState('')
    const handle =(e)=>{ 
       const newData = e.target.value
       setQuery(newData)   
    }

    useEffect(() => {
        search(query)
      }, [query]); 


  return (
    <div className="flex justify-center mx">
    <div className="flex w-1/4 mx-auto max-w-2xl py-5 px-4 sm:py-5 sm:px-6 lg:max-w-7xl lg:px-8">
        <input
            type="text"
            
            className="block w-full px-4  text-purple-700 bg-white border rounded-full focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Search... i.e. (names , color)"
            id = "search"
            value = {query}
            onChange={(e)=>handle(e)}
        >
         
            </input>
        
    </div>
</div>
  )
}

export default Searchbar