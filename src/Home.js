import "./App.css";
import Header from "./components/Header.js";
import axios from "axios";
import { useState, useEffect } from "react";
import Items from "./components/Items.js";

function Home() {
  const myApiKey = process.env.REACT_APP_API_KEY;
  const myAccessToken = process.env.REACT_APP_ACCESS_TOKEN;

  const [movie, setMovie] = useState([]);
  const [tv, setTv] = useState([]);

  // 🔹 Sayfa açıldığında top rated filmleri getir
  useEffect(() => {
    const fetchTopRated = async () => {
      try {
        const responsemovie = await axios.get(
          "https://api.themoviedb.org/3/movie/top_rated",
          {
            headers: {
              Authorization: myAccessToken,
            },
            params: {
              api_key: myApiKey,
              language: "en-US",
              page: 1,
            },
          }
        );
        const responsetv = await axios.get(
          "https://api.themoviedb.org/3/tv/popular",
          {
            headers: {
              Authorization: myAccessToken,
            },
            params: {
              api_key: myApiKey,
              language: "en-US",
              page: 1,
            },
          }
        );

        const topMovies = responsemovie.data.results
          .filter((item) => item.vote_average > 0)
          .sort(
            (a, b) =>
              b.vote_average - a.vote_average || b.popularity - a.popularity
          )
          .slice(0, 12);

        const topSeries = responsetv.data.results
          .filter((item) => item.vote_average > 0)
          .sort(
            (a, b) =>
              b.vote_average - a.vote_average || b.popularity - a.popularity
          )
          .slice(0, 12);

        setMovie(topMovies);
        setTv(topSeries)
      } catch (error) {
        console.error("Top rated filmler alınamadı:", error);
      }
    };

    fetchTopRated();
  }, [myAccessToken, myApiKey]);

  // 🔹 Arama fonksiyonu
  const handleSubmit = async (term) => {
    try {
      const [responseMovie, responseTv] = await Promise.all([
        axios.get("https://api.themoviedb.org/3/search/movie", {
          headers: { Authorization: myAccessToken },
          params: { api_key: myApiKey, query: term },
        }),
        axios.get("https://api.themoviedb.org/3/search/tv", {
          headers: { Authorization: myAccessToken },
          params: { api_key: myApiKey, query: term },
        }),
      ]);

      const sortedMovies = responseMovie.data.results
        .filter((item) => item.vote_average > 0)
        .sort(
          (a, b) =>
            b.popularity - a.popularity || b.vote_average - a.vote_average
        )
        .slice(0, 12);

      const sortedTv = responseTv.data.results
        .filter((item) => item.vote_average > 0)
        .sort(
          (a, b) =>
            b.popularity - a.popularity || b.vote_average - a.vote_average
        )
        .slice(0, 12);

      setMovie(sortedMovies);
      setTv(sortedTv);
    } catch (error) {
      console.error("Arama sırasında hata oluştu:", error);
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
