import React, { useState , useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Api from '../SearchApi'
// import SearchCard from '../components/moviecards/SearchCard'
import Card from '../components/moviecards/Card'



const Search = () => {

    const[Results, SetResults] = useState(null);

    const{state} = useLocation();
    useEffect(() => {
        async function fetchBackgroundImg() {
    
          let response = await Api(state.movieName);
      
          SetResults({...response});
        }
        fetchBackgroundImg();


    },[Results] );
    console.log(Results);

    useEffect(() =>{
         window.scroll(0,0);
    },[state.movieName]);

  return (

  
    <div className=' min-h-[1200px] h-fit max-w-[1200px]  mx-auto mt-16 text-white bg-black'>
        <h2 className='text-[24px] text-white mb-6 pt-6 font-semibold'>Search results of '{(Results?.length!==0) ?state.movieName:"No Result Found"}' </h2>
        <div className=' gap-x-6 gap-y-6 grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 mb-3 '>
            {Results && Results.results.map((movie)=>(
            <div className='max-w-[230px] max-h-[402px] rounded-2xl cursor-pointer '>
                    <Card key = {movie.id} movie = {movie}/>
            </div>
            ))}
        </div>
    </div>
  )
}

export default Search

