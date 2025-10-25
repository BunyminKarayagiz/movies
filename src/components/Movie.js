import React from 'react'
import MovieItem from './MovieItem.js'
import '../styles/MoviesAndTv.css';

function Movie({moviePlaceHolder}) {

  const topFiveMovie = moviePlaceHolder
    .sort((a, b) => b.vote_average - a.vote_average)
    .sort((c,d) => d.popularity - c.popularity) 
    .slice(0, 12);
    
  return (
    <div className="results">
      {topFiveMovie.map((movie,key) => {
          return <MovieItem key={key} movie={movie}/>
      })}
    </div>
  )
}

export default Movie