import React, { useState, useEffect } from 'react';
import '../styles/Items.css';
import defaultPoster from '../images/notfound.png';
import { MdAdd } from "react-icons/md";
import { addToWatchlist } from '../services/firestoreService.js';
import { auth } from '../Firebase.js';
import axios from "axios";

function Item({ item }) {
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState(null);

  const imageUrl = item.poster_path
    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
    : defaultPoster;

  const handleAddToWatchlist = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("Lütfen önce giriş yapın!");
      return;
    }

    setLoading(true);
    try {
      const result = await addToWatchlist(user.uid, item);
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

  // 🔹 Hover sırasında fragman verisini TMDB'den çek
  useEffect(() => {
    const fetchTrailer = async () => {
      if (isHovered && !trailerUrl) {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${item.id}/videos`,
            {
              params: { api_key: process.env.REACT_APP_API_KEY, language: "en-US" },
            }
          );

          const trailers = response.data.results;
          const youtubeTrailer = trailers.find(
            (vid) => vid.site === "YouTube" && vid.type === "Trailer"
          );

          if (youtubeTrailer) {
            setTrailerUrl(`https://www.youtube.com/embed/${youtubeTrailer.key}?autoplay=1&mute=0`);
          }
        } catch (error) {
          console.error("Fragman alınamadı:", error);
        }
      }
    };

    fetchTrailer();
  }, [isHovered, item.id, trailerUrl]);

  return (
    <div
      className="card-item"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        <button
          className="add-watchlist-btn"
          onClick={handleAddToWatchlist}
          disabled={loading}
        >
          <MdAdd className="add-movie-icon" />
        </button>
      </div>

      {/* 🔹 Hover olduğunda fragman oynat */}
      {isHovered && trailerUrl ? (
        <iframe
          className="trailer-player"
          src={trailerUrl}
          title="Trailer"
          allow="autoplay; encrypted-media"
        ></iframe>
      ) : (
        <img src={imageUrl} alt="Poster" />
      )}

      <div className="card-content">
        <h1>{item.original_title || item.name}</h1>
        <p><span>Dil:</span> {item.original_language}</p>
        <p><span>Açıklama:</span> {item.overview}</p>
      </div>
    </div>
  );
}

export default Item;
