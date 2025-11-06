import React, { useState, useEffect } from "react";
import "../styles/Items.css";
import defaultPoster from "../images/notfound.png";
import { MdAdd } from "react-icons/md";
import { addToWatchlist } from "../services/firestoreService.js";
import { auth } from "../Firebase.js";
import { Link } from "react-router-dom";
import {fetchTrailer} from "../services/apiServices.js"

function Item({ item }) {
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [videoCache, setVideoCache] = useState({});
  const type = item.title ? "movie" : "tv";

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

  // 🔹 Hover olduğunda sadece 1 kere API'den video çek, sonra cache'den kullan
  useEffect(() => {
      if (!isHovered || trailerUrl || videoCache[item.id]) return;
      fetchTrailer(type,item).then((url) => {
          setTrailerUrl(url);
          setVideoCache((prev) => ({ ...prev, [item.id]: url }));
      });

  }, [isHovered, item, trailerUrl, videoCache,type]);

  // Cache’de varsa onu kullan
  useEffect(() => {
    if (isHovered && videoCache[item.id]) {
      setTrailerUrl(videoCache[item.id]);
    }
  }, [isHovered, item.id, videoCache]);

  return (
    
    <div
      className="card-item"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        className="add-watchlist-btn"
        onClick={handleAddToWatchlist}
        disabled={loading}
      >
        <MdAdd className="add-movie-icon" />
      </button>
      {isHovered && trailerUrl ? (
        <iframe
          className="trailer-player"
          src={trailerUrl}
          title="Trailer"
          allow="autoplay; encrypted-media"
          frameBorder="0"
        ></iframe>
      ) : (
        <img src={imageUrl} alt="Poster" className="poster-image" />
      )}
      <Link to={`/${type}/${item.id}`} className="movie-card-link">
        <div className="card-content">
          <h1>{item.title || item.name}</h1>
          <p><span>Dil:</span> {item.original_language}</p>
          <p><span>Açıklama:</span> {item.overview.length > 200
        ? item.overview.substring(0, 200) + '...'
        : item.overview}</p>
          <p><span>Çıkış Tarihi:</span> {item.release_date || item.first_air_date}</p>
        </div>
        </Link>
      </div>

  );
}

export default Item;
