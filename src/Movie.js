import React from 'react'
function Movie({moviePlaceHolder}) {

    if (moviePlaceHolder.Response === "False") {
    return <p style={{ color: 'white', fontSize: '24px' }}>Aranan Film Bulunamadı</p>
  }
  return (
    <div className='card'>
        <img src={moviePlaceHolder.Poster} alt='Poster'/>
        <div className="card-content">
            <h1>{moviePlaceHolder.Title}</h1>
            <p><span>Süre:</span> {moviePlaceHolder.Runtime}</p>
            <p><span>Dil:</span> {moviePlaceHolder.Language}</p>
            <p><span>IMDb:</span> {moviePlaceHolder.imdbRating}</p>
            <p><span>Yönetmen:</span> {moviePlaceHolder.Director}</p>
            <p><span>Açıklama:</span> {moviePlaceHolder.Plot}</p>
        </div>
    </div>
  )
}

export default Movie