import './App.css';
import Header from './Header.js'
import axios from 'axios';
import {useState } from 'react';
import Movie from './Movie.js';


function App() {
  const myApiKey='64e447bc'

  const [movie,setMovie] = useState({});

  const handleSubmit = async (term) =>{
    const response = await axios.get(`http://www.omdbapi.com/`,{
      params:{
        apikey: myApiKey,
        t:term,
      }
    });
    setMovie(response.data);
  }

  return (
    <div className="App">
        <Header search={handleSubmit}/>
        <Movie moviePlaceHolder={movie} />
    </div>
  );
}

export default App;
