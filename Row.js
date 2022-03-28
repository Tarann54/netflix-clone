import React, { useState, useEffect } from 'react';
import axios from "./axios";
import "./Row.css"; 
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

/*Installed two packages for getting the youtube video trailers for the movies when clicked
rpm i react-youtube
rpm i movie-trailer
was put in the terminal^^
*/

//base url is the first part of the url needed to gather images and put into app
const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
    //creates a variable in react to store movie information
    const [movies, setMovies] = useState([]);
    //gets trailer url from youtube and store in variable
    const [trailerUrl, setTrailerUrl] = useState("");
    
    //a snippet of code which runs on a specific condition/variable
    //when row loads, useEffect runs and makes request to tmdb 
    useEffect(() => {
        /* if [], run once when the row loads, and dont run again
        if variable within [] was "movies" 
        then code would run every time the movies variable changes*/
        
        //making a call to a third party service requires an internal async function
        async function fetchData() {
            //await says to wait until data comes back before doing anything
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);
    //console.table(movies);

    // a parameter of the react-youtube package
    const opts = {
        height: "450",
        width: "100%",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        }
    };
    //this is used when user clicks on the movie poster
    const handleClick = (movie) => {
        //if trailer is already playing, clicking poster again will take it away and clear trailerUrl
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.name || "")
                .then((url) => {
                    // below helps to get the video id so everything after the "?" in a youtube link
                    //URLSearchParams helps to get the value of v from the url
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
                })
                .catch((error) => console.log(error));
        }
    };

    return (
        <div className= "row">
            <h2>{title}</h2>
            
            <div className="row_posters">
                {/*Goes through the movies array and return an image */}
                {movies.map(movie => (
                    
                    <img 
                        // key helps with rendering faster by rendering only necessary images
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        //if isLargRow is true, it uses "row__posterLarge" css styling found in Row.css
                        className={`row_poster ${isLargeRow && "row__posterLarge"}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path }`} 
                        alt={movie.name}
                    />
                ))}
            </div>
            {/* When we have a trailer url THEN we can show the youtube video*/}
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
            
        </div>
    )
}

export default Row;