// rfce shortcut
import React, {useState, useEffect} from 'react'
import axios from './axios'
import requests from './requests'
import './Banner.css'

function Banner() {
    //is an empty array variable because it will be populated with a new movie everytime website is refreshed
    const [movie, setMovie] = useState([])

    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(requests.fetch2021Movies)
           setMovie(
               request.data.results[
                Math.floor(Math.random() * request.data.results.length -1)
                ]
            );
            return request;
        }
        fetchData();
    }, [])
    console.log(movie);

    //makes banner description truncated version
    function truncate(str,n){
        return str?.length > n ? str.substr(0, n-1) + "..." : str;
    }





  return (
    <header className='banner'
        style={{
            backgroundSize: "cover",
            backgroundImage: `url(
                "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
                )`,
            backgroundPosition: `top`,
        }}>
    

        <div className='banner__contents'>
            <h1 className='banner__title'>
                {/*accounting for weird movie titles, below will allow for the movie title to be shown regardless if title data is missing - will show one of the below*/}
                {/*the "?" after movie allows for the program to elegantly handle an error message rather than crashing*/}
                {movie?.title || movie?.name || movie.original_name}
            </h1>

            <div className='banner__buttons'>
                <button className='banner__button'>Play</button>
                <button className='banner__button'>My List</button>
            </div>

            <h1 className='banner__description'>
                {truncate(movie?.overview, 150)}
            </h1>
        </div>

        {/*this is to make the bottom of the banner image fade at the bottom */}
        <div className='banner--fadeBottom'></div>

    </header>  

  )
}

export default Banner