import React from 'react'
import './App.css';

function TvItem({tv}) {
  return (
    <div>
        <div className='card'>
        <img src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`} alt='Poster'/>
        <div className="card-content">
            <h1>{tv.name}</h1>
            <p><span>Dil:</span> {tv.original_language}</p>
            <p><span>Açıklama:</span> {tv.overview}</p>
        </div>
    </div>
    </div>
  )
}

export default TvItem