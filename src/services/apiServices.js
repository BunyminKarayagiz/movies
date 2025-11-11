import apiClient from "./apiClient";


//Get Top Rated items
export async function fetchTopRated (){
      try {
        const [movies, tv] = await Promise.all([
          apiClient.get("movie/top_rated", { params: { language: "en-US", page: 1 } }),
          apiClient.get("tv/popular", { params: { language: "en-US", page: 1 } }),
        ]);

        const topMovies = movies.data.results
          .filter((item) => item.vote_average > 0)
          .sort(
            (a, b) =>
              b.vote_average - a.vote_average || b.popularity - a.popularity
          )
          .slice(0, 12);

        const topSeries = tv.data.results
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
      const [movies, tv] = await Promise.all([
        apiClient.get("search/movie", { params: {query:term } }),
        apiClient.get("search/tv", { params: { query:term } }),
      ]);

      const sortedMovies = movies.data.results
        .filter((item) => item.vote_average > 0)
        .sort(
          (a, b) =>
            b.popularity - a.popularity || b.vote_average - a.vote_average
        )
        .slice(0, 12);

      const sortedTv = tv.data.results
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

        const response = await apiClient.get(`${type}/${item.id}/videos`);

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