import React from "react";
import { Link } from "react-router-dom";
import "../styles/NotFound.css";

export default function NotFound() {
  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      <p className="notfound-text">Aradığınız sayfa bulunamadı veya taşınmış olabilir.</p>
      <div className="notfound-buttons">
        <Link to="/" className="notfound-btn home">Ana Sayfaya Dön</Link>
        <button onClick={() => window.history.back()} className="notfound-btn back">Geri Git</button>
      </div>
    </div>
  );
}