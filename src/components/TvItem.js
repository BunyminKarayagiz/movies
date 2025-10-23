import React, { useState } from 'react';
import '../styles/MoviesAndTv.css';
import { MdAdd } from "react-icons/md";
import defaultPoster from '../images/notfound.png'
import { addToWatchlist } from '../services/firestoreService.js';
import { auth } from '../Firebase.js';

function TvItem({tv}) {
  const imageUrl = tv.poster_path 
    ? `https://image.tmdb.org/t/p/w500${tv.poster_path}` 
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
          const result = await addToWatchlist(user.uid, tv);
        console.log(result)
          if (result === "added") {
            alert("Item izleme listene eklendi!");
          } else if (result === "already_exists") {
            alert("Bu Item zaten izleme listende!");
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
    <div>
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
        <img src= {imageUrl} alt='Poster'/>
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