import React from 'react'
import './App.css';

function MovieItem({movie}) {
  return (
    <div>
        <div className='card'>
            <img src= {`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt='Poster'/>
            <div className="card-content">
                <h1>{movie.original_title}</h1>
                <p><span>Dil:</span> {movie.original_language}</p>
                <p><span>Açıklama:</span> {movie.overview}</p>
            </div>
        </div>
    </div>
  )
}

export default MovieItem