import React, { useState } from 'react'
import { HiOutlineSearch } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';



const Header = () => {

  const navigate = useNavigate();
  const [movieName,setMovieName] = useState("");

  function clickhandler () {
    

    navigate(`/Search/${movieName}`,{
      state:{
        movieName
      }
    })
  }

  function click1(){
      navigate("/movies",{
         state:{
             type:"movie"
         }
      })
  }

  function click2(){
    navigate("/tvshows",{
       state:{
           type:"tv"
       }
    })
}


  return (
    <div //backdrop-blur bg-custom-background 
    className='bg-custom-background backdrop-blur fixed z-10 left-0  right-0 top-0 text-white shadow-slate-800 shadow-2xl'>

    <div className='w-full max-w-[1200px] mx-auto py-[10px] flex items-center justify-between   px-3 '>
      <img className='w-[149px] h-[50px] cursor-pointer' src="/assets/movix-logo.svg" onClick={() =>{navigate('/')}} alt="hehe"/>
      <div className='flex items-center gap-x-5 '>
        <span className='cursor-pointer text-[20px]' onClick={click1}>Movies</span>
        <span className='cursor-pointer text-[20px]' onClick = {click2}>TVshows</span>
        <div className='flex gap-x-1'>

        <input type="search" placeholder='Search' className='Searchbar h-[30px] pl-4 rounded-sm focus:transform scale-120 text-black'  onChange={(e) =>setMovieName(e.target.value)} />
        <button className='cursor-pointer text-[24px] hover:text-red-600' onClick ={clickhandler}><HiOutlineSearch /></button>

        </div>
      </div>
    </div>
    </div>
  )
}

export default Header   