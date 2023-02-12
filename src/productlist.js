import React,{useState, useEffect}from 'react';
import Pagination from './pagination';
import Axios from 'axios'
import Posts from './pages/post';
import Heads from './pages/home-header';
import Searchbar from './pages/searchbar';




   
  function Products({}) {
    const url = "api/products"
    const[currentPage, setCurrentPage]= useState(1);
    const[postsPerPage, setPostsPage]= useState(12);

    const [items, setItems] = useState([])  
    const [itemDisplay , setDisplay ] = useState([])
    const [searchin, isSearching] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [pData , setPdata] = useState([])


    useEffect(() => { 
      setLoading (true)
      const fetchPosts = async () => {
      const response = await Axios.get(url,{
                    
        })
        const getItems = response.data.map((item )=>{
          return item
        })
        setItems(getItems)
      }
      console.log(items)
      fetchPosts();

      setLoading(false)
  }, []);


  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = items.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const searchedPosts = itemDisplay.slice(indexOfFirstPost, indexOfLastPost);
  



  const searchbar = (query) =>{
    
    if(query.trim().length == 0){
      isSearching(false)
    }
    else{
      isSearching(true)
        const getitemData = items.filter((e)=>{
        if(e.product_name.toLowerCase().trim().includes(query.toLowerCase()) || e.color.toLowerCase().trim().includes(query.toLowerCase())){
          return e
        }
      })
     
      setDisplay(getitemData)
    
      }   
  };  

 

    return (

        <div>
        
          <div className= " mt-10 align-middle items-center">
          <Searchbar search = {searchbar} status = {searchin}/>
          {!isLoading ? <Posts  posts = {searchin ?  searchedPosts : currentPosts}/>: <div role="status">
        
    </div>
}
          
          </div>
          
          
        <div className="inline-block align-middle pb-10">
        <Pagination postsPerPage={postsPerPage} totalPosts={searchin ? itemDisplay.length : items.length} paginate={paginate}/>
        </div> 

        </div>
        
       

      
    )
  }
  export default Products 