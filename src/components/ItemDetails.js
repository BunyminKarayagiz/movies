import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/ItemDetails.css";
import axios from "axios";


function DetailPage({ type }) {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [videoKey, setVideoKey] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const responseItem = await axios.get(
          `https://api.themoviedb.org/3/${type}/${id}`,
          {
            headers: {
              Authorization: process.env.REACT_APP_ACCESS_TOKEN,
            },
            params: {
              language:"en-US"
            },
          }
        );
        setContent(responseItem.data);
        const videoRes = await fetch(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        const videoData = await videoRes.json();
        const trailer = videoData.results.find(v => v.type === "Trailer" && v.site === "YouTube");
        setVideoKey(trailer ? trailer.key : null);

      } catch (err) {
        console.error("Detay yüklenemedi:", err);
      }
    };

    fetchDetails();
  }, [id, type]);

  if (!content) return <div className="loading">Yükleniyor...</div>;

  return (
    <div className="detail-page">
      <div className="detail-backdrop">
        <img
          src={`https://image.tmdb.org/t/p/original${content.backdrop_path}`}
          alt={content.title || content.name}
        />
        <div className="detail-overlay"></div>
      </div>

      <div className="detail-content">
        <div className="detail-poster">
          <img
            src={`https://image.tmdb.org/t/p/w500${content.poster_path}`}
            alt={content.title || content.name}
          />
        </div>

        <div className="detail-info">
          <h1>{content.title || content.name}</h1>
          <p className="tagline">{content.tagline}</p>
          <p className="overview">{content.overview}</p>

          <div className="meta-info">
            <p><strong>Yayın Tarihi:</strong> {content.release_date || content.first_air_date || "Bilinmiyor"}</p>
            <p><strong>IMDB:</strong> ⭐ {content.vote_average ? content.vote_average.toFixed(1) : "N/A"}</p>
            <p><strong>Tür:</strong> {content.genres && content.genres.length > 0
                ? content.genres.map(g => g.name).join(", ")
                : "Bilinmiyor"}
            </p>
            {type === "tv" && (
                <p><strong>Sezon Sayısı:</strong> {content.number_of_seasons ?? "?"}</p>
            )}
            </div>
          {videoKey && (
            <div className="trailer-container">
              <iframe
                src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=0&controls=0&rel=0&modestbranding=1`}
                title="Trailer"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
