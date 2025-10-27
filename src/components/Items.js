import React from 'react';
import '../styles/Items.css';
import Item from "../components/Item.js";

function Items({ movie = [], tv = [] }) {
  // Orijinal dizileri değiştirmemek için kopya alıyoruz
  return (
    <div className="items-section">
      <h2>Top Movies</h2>
      <div className="scroll-container">
        {movie.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </div>

      <h2>Top TV Shows</h2>
      <div className="scroll-container">
        {tv.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Items;
