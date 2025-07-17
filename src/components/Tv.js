import React from 'react'
import TvItem from './TvItem'
import '../styles/MoviesAndTv.css';

function Tv({tvPlaceHolder}) {

  const topFiveTv = tvPlaceHolder
    .sort((a, b) => b.vote_average - a.vote_average)
    .sort((c,d) => d.popularity - c.popularity) 
    .slice(0, 5);

  return (
    <div className="results">
      {topFiveTv.map((tv,key) => {
          return <TvItem key={key} tv={tv}/>
      })}
    </div>
  )
}

export default Tv