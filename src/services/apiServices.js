import axios from "axios";

const myApiKey = process.env.REACT_APP_API_KEY;
const myAccessToken = process.env.REACT_APP_ACCESS_TOKEN;

//Get Top Rated items
export async function fetchTopRated (){
      try {
        const responsemovie = await axios.get(
          "https://api.themoviedb.org/3/movie/top_rated",
          {
            headers: {
              Authorization: process.env.REACT_APP_ACCESS_TOKEN,
            },
            params: {
              language: "en-US",
              page: 1,
            },
          }
        );
        const responsetv = await axios.get(
          "https://api.themoviedb.org/3/tv/popular",
          {
            headers: {
              Authorization: process.env.REACT_APP_ACCESS_TOKEN,
            },
            params: {
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
        return [topMovies,topSeries]
      } catch (error) {
        console.error("Top rated filmler alınamadı:", error);
      }
    };


// Search items
export async function searchItems (term){
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
    
    return [sortedMovies,sortedTv]
    } catch (error) {
      console.error("Arama sırasında hata oluştu:", error);
    }
};


export async function fetchTrailer (type,item){
  try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/${type}/${item.id}/videos`,
          {
            headers: {
              Authorization: process.env.REACT_APP_ACCESS_TOKEN,
            },
            params: {
              api_key: process.env.REACT_APP_API_KEY,
            },
          }
        );

        const trailers = response.data.results;
        const youtubeTrailer = trailers.find(
          (vid) => vid.site === "YouTube" && vid.type === "Trailer"
        );
        if (youtubeTrailer) {
          const url = `https://www.youtube.com/embed/${youtubeTrailer.key}?autoplay=1&mute=0&controls=0&rel=0&modestbranding=1`;
          return url
        }
      } catch (error) {
        console.error("Fragman alınamadı:", error);
      }
};