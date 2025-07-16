import './App.css';
import Header from './Header.js'
import axios from 'axios';
import {useState } from 'react';
import Movie from './Movie.js';
import Tv from './Tv.js';

function App() {

  const myApiKey = process.env.REACT_APP_API_KEY;
  const myAccessToken = process.env.REACT_APP_ACCESS_TOKEN;

  const [movie,setMovie] = useState([]);
  const [tv, setTv] = useState([])

  const handleSubmit = async (term) =>{
    const responseMovie = await axios.get(`https://api.themoviedb.org/3/search/movie`,{
      headers:{
        Authorization: myAccessToken
      },
      params:{
        apikey: myApiKey,
        query:term,
      }
    });
    const responseTv = await axios.get(`https://api.themoviedb.org/3/search/tv`,{
      headers:{
        Authorization: myAccessToken
      },
      params:{
        apikey: myApiKey,
        query:term,
      }
    });
    setMovie(responseMovie.data.results);
    setTv(responseTv.data.results)
    console.log(responseMovie.data.results)
  }

  return (
    <div className="App">
        <Header search={handleSubmit}/>

        <h2>Movies</h2>
        <Movie moviePlaceHolder={movie}/>

        <h2>TV Shows</h2>
        <Tv tvPlaceHolder={tv}/>
        
    </div>
  );
}

export default App;
