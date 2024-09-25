import React from 'react'
import { useDispatch } from 'react-redux';
import { API_OPTION } from '../utils/constant';
import { useEffect } from 'react';
import { addTrailerVideos } from '../utils/moviesSlice';
const useMovieTrailer = (movieId) => {
    const dispatch=useDispatch();
    
    const getMovieVideos=async()=>{
  
      const data=await fetch("https://api.themoviedb.org/3/movie/" + movieId + "/videos?language=en-US",API_OPTION)
      const json=await data.json();
   
      const filterData = json.results.filter((video) => video.type === "Trailer");
   
      //this is done because our api was showing more than on result but we needed only one
      
      const trailer =filterData.length ? filterData[1] : json.results[0];
      console.log(trailer);
      dispatch(addTrailerVideos(trailer));
    }
  
    useEffect(()=>{
     getMovieVideos();
    },[])
}

export default useMovieTrailer