import React from 'react';
import '../styles/Items.css';
import Item from "../components/Item.js";

function Items({ movie = [], tv = [] }) {
  // Orijinal dizileri değiştirmemek için kopya alıyoruz
  return (
    <div className="results-container">
      <section className="movies-section">
        <h2>Movies</h2>
        <div className="results">
          {movie.map((item, index) => (
            <Item key={item.id ?? `movie-${index}`} item={item} type="movie" />
          ))}
        </div>
      </section>

      <section className="tv-section">
        <h2>Series</h2>
        <div className="results">
          {tv.map((item, index) => (
            <Item key={item.id ?? `tv-${index}`} item={item} type="tv" />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Items;
