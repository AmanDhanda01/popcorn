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
        console.log(shows);
    };
    function increment(){
        setPage(prev => prev+1);
    }
    useEffect(()=>{
          window.scroll(0,0);
          setShows([]);
    },[state.type]);


    useEffect(() =>{
        Fetch();
    },[page,state.type]);


    // console.log(shows);

  return (
    <div className=' max-w-[1200px] mx-auto mt-20   '>\
     
       <div className='flex items-center justify-between'>
                 <h2 className='text-white text-3xl font-bold mb-5'>Explore {`${state.type==="movie" ? "Movies" : "TV Shows"}`}</h2>
                 
      </div>
    


                  <InfiniteScroll dataLength={shows.length} next ={increment} loader={<h4 className='text-white'>Loading...</h4>} hasMore={true} >
                  <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-7'>
                  {shows && shows.map((movie,index)=>(
                        < Card key = {index} movie = {movie} type={state.type}/>
                    ))}
                    </div>
                  </InfiniteScroll>
                    
   
  
   
  </div>
  )
}

export default Shows
