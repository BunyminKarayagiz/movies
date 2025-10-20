import React from 'react'
import '../styles/MoviesAndTv.css';
import defaultPoster from '../images/notfound.png'


function MovieItem({movie}) {
    const imageUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : defaultPoster;
  return (
        <div className='card-item'>
            <img src= {imageUrl} alt='Poster'/>
            <div className="card-content">
                <h1>{movie.original_title}</h1>
                <p><span>Dil:</span> {movie.original_language}</p>
                <p><span>Açıklama:</span> {movie.overview}</p>
            </div>
        </div>
  )
}

export default MovieItem