import React, { useState } from 'react';
import '../styles/MoviesAndTv.css';
import defaultPoster from '../images/notfound.png';
import { MdAdd } from "react-icons/md";
import { addToWatchlist } from '../services/firestoreService.js';
import { auth } from '../Firebase.js';

function MovieItem({ movie }) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : defaultPoster;

  const [loading, setLoading] = useState(false);

  const handleAddToWatchlist = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("Lütfen önce giriş yapın!");
      return;
    }

    setLoading(true);
    try {
      const result = await addToWatchlist(user.uid, movie);
    console.log(result)
      if (result === "added") {
        alert("Film izleme listene eklendi!");
      } else if (result === "already_exists") {
        alert("Bu film zaten izleme listende!");
      } else {
        alert("Bir hata oluştu.");
      }
    } catch (error) {
      console.error(error);
      alert("Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='card-item'>
      <div>
        <button
          className='add-watchlist-btn'
          onClick={handleAddToWatchlist}
          disabled={loading}
        >
          <MdAdd className='add-movie-icon' />
        </button>
      </div>
      <img src={imageUrl} alt='Poster' />
      <div className="card-content">
        <h1>{movie.original_title}</h1>
        <p><span>Dil:</span> {movie.original_language}</p>
        <p><span>Açıklama:</span> {movie.overview}</p>
      </div>
    </div>
  );
}

export default MovieItem;
