import React from 'react'
import {useEffect,useState} from 'react'
import {useLocation} from 'react-router-dom'
import Api from '../MovieApi'
import CircularProg from '../components/CircularProg';
// import MovieCastApi from '../MovieCastApi';
import MovieCast from '../components/moviecards/MovieCast';
import Video from '../components/moviecards/Video';




const Movie = () => {

  const[Movie, SetMovie] = useState(null);
  const[videos , SetVideo] = useState(false);
  const[Cast, SetCast] = useState(null);
  const{state} = useLocation();
  console.log(state)
  let color = "red"
  useEffect(() => {
    async function fetchCast() {

      let response = await Api(state.id, state.type, 'credits');
  
      SetCast({...response});
    }
    fetchCast();

    async function fetchMovie() {

      let response = await Api(state.id, state.type);
  
      SetMovie({...response});
    }
    fetchMovie();

    async function fetchVideos() {

      let response = await Api(state.id, state.type, 'videos');
  
      SetVideo({...response});
    }
    fetchVideos();

},[] );
// console.log(videos);

  useEffect(() =>{
    window.scroll(0, 0);
  })
  if(Movie?.vote_average<5){
        color = "red";
   }else if(Movie?.vote_average>5 && Movie?.vote_average<7.5){
       color = "yellow"
   }else{
       color="green"
   }

  return (
    <div className='min-h-[1200px] h-fit max-w-[1200px]  mx-auto mt-16 text-white bg-black py-12'>
      {/* {Movie && Movie.original_title} */}
      <div className='flex flex-col justify-center lg:flex-row w-full h-full'>
        <div className='w-[100%] lg:w-[50%]  min-h-full'>
             <img className='w-full h-[25%] lg:h-[85%] rounded-2xl' 
              src={(Movie?.poster_path)?`https://image.tmdb.org/t/p/w500/${Movie?.poster_path}`:('/assets/no-poster.png')}/>
        </div>
        <div className=" flex flex-col w-[100%] justify-start items-start py-8 pl-12 space-y-4">
          <div>
            <h1 className='text-[34px] leading-10 '>{Movie?.original_title ||Movie?.name}</h1>
            <p className=' text-[20px] opacity-50 '>{Movie?.tagline}</p>
          </div>
          <div className='flex flex-col gap-1'>
          <div className='flex gap-1'>
          
          {
            Movie?.genres.map((genre) =>{
              return <span className=' bg-pink-600 px-1  text-[12px] w-fit rounded-sm ' key={genre.id}>{genre.name}</span>
            })
          }
          </div>
          {/* <CircularProg value = {Movie?.vote_average} color = 'success'/> */}
        
               <div style={{outlineColor:color}} className= ' outline outline-4 text-[20px]  font-bold rounded-full w-12 h-12 bg-white flex items-center justify-center  ml-2 mt-4 mb-3 text-black'>
                            {Math.round(Movie?.vote_average*10)/10}
               </div>
          
          <div>
          <h2 className='text-[30px] mb-2'>Overview</h2>
          <p>
            {Movie?.overview}  
          </p>
          </div>

          <div className='gap-5 flex font-semibold mt-2'>
            <span>Status: <span className='opacity-50'>{Movie?.status  }</span> </span>
            <span>Release Date: <span className='opacity-50'>{Movie?.release_date || Movie?.first_air_date}</span> </span>
            <span>Runtime: <span className='opacity-50'> {Movie?.runtime}mins</span></span>

          </div>
          {/* <hr/>
          <div className='gap-1 flex'>
            <span>Director: {Movie?.status}</span>

          </div>
          <hr/>
          <div className='gap-1 flex'>
            <span>Director: {Movie?.status}</span>

          </div> */}

          </div>
        </div>
      </div>

      <div>
        <h2 className='text-[28px] text-white mb-[25px] mt-[30px] font-semibold'>Top Cast</h2>
        {/* <MovieCast/> */}
        <div className='flex overflow-auto gap-x-7'>
        {
          Cast?.cast.map((member)=>(
            <MovieCast member ={member} key ={member.id}/>
          ))
        }
        </div>
      </div>

      <div>
        <h2 className='text-[28px] text-white mb-[25px] mt-[30px] font-semibold'>Related videos</h2>
        {/* <MovieCast/> */}
        <div className='flex overflow-auto gap-x-7'>
        {
          videos?.results?.map((video)=>(
            <Video video ={video} key ={video.id}/>
          ))
        }
        </div>
      </div>

    </div>
  )
}

export default Movie