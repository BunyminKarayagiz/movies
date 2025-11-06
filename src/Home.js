import "./App.css";
import Header from "./components/Header.js";
import { useState, useEffect } from "react";
import Items from "./components/Items.js";
import {fetchTopRated,searchItems} from "./services/apiServices.js"

function Home() {

  const [movie, setMovie] = useState([]);
  const [tv, setTv] = useState([]);

  // 🔹 Sayfa açıldığında top rated filmleri getir
  useEffect(() => {

    fetchTopRated().then(([movies, series]) => {
    setMovie(movies);
    setTv(series);
    });

  }, []);

  // 🔹 Arama fonksiyonu
  const handleSubmit = async (term) => {
    try {
    // searchItems fonksiyonunu çağır
    const [movies, series] = await searchItems(term);

    // Gelen verileri state’lere kaydet
    setMovie(movies);
    setTv(series);

  } catch (error) {
    console.error("Arama yapılırken hata oluştu:", error);
  }
  };

  return (
    <div className="App">
      <Header search={handleSubmit} />
      <Items movie={movie} tv={tv} />
    </div>
  );
}

export default Home;
