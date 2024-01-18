import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Api from '../Api';
import Card from '../components/moviecards/Card';
import InfiniteScroll from 'react-infinite-scroll-component';




const Shows = () => {

    const {state} = useLocation();
    const [shows,setShows] = useState([]);
    const [genre,setGenre] = useState("Select genre")
    const [sort,setSort] = useState("sort by");
    const [page,setPage] = useState(1);

     async function Fetch() {
        const res = await Api(state.type,"popular",page);
        setShows((prev) =>[...prev,...res.results]); 
    };
    function increment(){
        setPage(prev => prev+1);
    }
    
    useEffect(() =>{
        
        Fetch();
        
        
        
    },[page]);


    console.log(shows);

  return (
    <div className=' max-w-[1200px] mx-auto mt-20   '>\
     
       <div className='flex items-center justify-between'>
                 <h2 className='text-white'>Explore {`${state.type}s`}</h2>
                 

       </div>
    


                  <InfiniteScroll dataLength={shows.length} next ={increment} loader={<h4 className='text-white'>Loading...</h4>} hasMore={true} >
                  <div className='grid grid-cols-5 gap-7'>
                  {shows && shows.map((movie)=>(
                        < Card key = {movie.id} movie = {movie} type={state.type}/>
                    ))}
                    </div>
                  </InfiniteScroll>
                    
   
  
   
  </div>
  )
}

export default Shows
