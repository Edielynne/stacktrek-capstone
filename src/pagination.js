import { useCallback, useState } from "react";



export default function Pagination({postsPerPage, totalPosts, paginate}) {
  const [pageIndex, setPageIndex] = useState(1);
  const pageNumbers = [];
  
  for (let i=1; i<= Math.ceil(totalPosts / postsPerPage); i++){
      pageNumbers.push(i);
  } 


  const next = () => {
    if(pageIndex == pageNumbers.length){
      console.log("Max")
    }
    else{
      paginate(pageIndex+1);
      setPageIndex(pageIndex+1)
    }
  }

  const prev = () => {
    if(pageIndex == 1){
      console.log("Min")
    }
    else{
      paginate(pageIndex-1);
      setPageIndex(pageIndex-1)
    }
  }

  return (

 <div> 
  <p className = "text-sm  mb-10 text-pink-700 font-bold">Page: {pageIndex} out of {pageNumbers.length}</p>
<nav aria-label="Page navigation example">
  
  <ul class="inline-flex items-center -space-x-px">
    <li>
      <a  onClick={prev} className="block border-pink-300 hover:bg-pink-100 hover:text-pink-700 first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-pink-500 bg-white text-pink-500">
        <span class="sr-only">Previous</span>
        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
      </a>
    </li>

    {pageNumbers.map(number =>(
                <li key={number} >
                    <a  onClick={() => { paginate(number); setPageIndex(number)}} className="  border-pink-300 hover:bg-pink-100 hover:text-pink-700 first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-pink-500 bg-white text-pink-500">
                        {number}
                    </a>
                </li>
                
                ) 
                )}  
    <li>
      <a  onClick={next} className="block border-pink-300 hover:bg-pink-100 hover:text-pink-700 first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-pink-500 bg-white text-pink-500">
        <span class="sr-only">Next</span>
        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
      </a>
    </li>
  </ul>
</nav>
</div> 

   
  );
}


