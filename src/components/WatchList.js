import React, { useEffect, useState } from "react";
import { getUserWatchlist } from "../services/firestoreService";
import { auth } from "../Firebase";
import defaultPoster from "../images/notfound.png";
import "../styles/WatchList.css";

function WatchList() {
  const [watchList, setWatchList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const list = await getUserWatchlist(currentUser.uid);
        setWatchList(list);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <p>Yükleniyor...</p>;
  if (!user) return <p>Lütfen giriş yapın.</p>;
  if (watchList.length === 0) return <p>İzleme listen boş.</p>;

  return (
    <div className="watchlist-container">
      {watchList.map((movie) => (
        <div className="watchlist-item" key={movie.id}>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : defaultPoster
            }
            alt="Poster"
          />
          <div className="watchlist-content">
            <h1>{movie.title}</h1>
            <p><span>Dil:</span> {movie.original_language || "Bilinmiyor"}</p>
            <p><span>Açıklama:</span> {movie.overview}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default WatchList;
