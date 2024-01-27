import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';


const Card = ({movie,type}) => {

  const Navigate = useNavigate();
  let color = "";
  if(!type){
      type = "movie"
  }
  function clickhandler() {
    Navigate(`/${movie.media_type ? movie.media_type : type}/${movie.id}`,{
      state: {id:movie.id,type: movie.media_type ? movie.media_type : type}
    })
  }
  
  if(movie.vote_average<5){
      color = "red";
  }else if(movie.vote_average>5 && movie.vote_average<7.5){
     color = "yellow"
  }else{
     color="green"
  }
    // console.log(movie);
  return (
    <div className='hover:-translate-y-5 min-w-[50%] min-h-[40%] md:min-w-[32.5%] md:min-h-[403px] lg:min-w-[24.5%] lg:min-h-[403px] rounded-2xl flex flex-col justify-between relative cursor-pointer' onClick={clickhandler}>
        <img className='w-full rounded-2xl' 
        src={(movie.poster_path)?`https://image.tmdb.org/t/p/w500/${movie.poster_path}`:('/assets/no-poster.png')}/>
        <div style={{outlineColor:color}} className= 'invisible md:visible lg:visible outline outline-4 text-[20px]  font-bold rounded-full w-12 h-12 bg-white flex items-center justify-center absolute bottom-[10%] text-black'>
        {Math.round(movie.vote_average*10)/10}</div>
        <p className='text-white text-ellipsis mt-3 text-[20px] '>
          {((movie.title) || (movie.name).length > 20) ? (movie.title || movie.name).substring(0,20)+"..." : (movie.title || movie.name)}</p>
        <p className='text-white opacity-50 text-[14px]'>{movie.release_date || movie.first_air_date}</p>
    </div>
  )
}

export default Card