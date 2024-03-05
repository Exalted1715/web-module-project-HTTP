import React, { useEffect, useState } from "react";

import { Route, Routes, Navigate } from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';
import AddMovieForm from "./components/AddMovieForm";
import MovieHeader from './components/MovieHeader';
import EditMovieForm from './components/EditMovieForm'
import FavoriteMovieList from './components/FavoriteMovieList';

import axios from 'axios';


const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9000/api/movies')
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const deleteMovie = (id) => {
    
    setMovies(movies.filter(item=>(item.id !== Number(id))));

  }

  const addToFavorites = (movie) => {
    // Stretch goal, see the README
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand" > HTTP / CRUD Module Project</span>
      </nav>

      <div className="container">
        <MovieHeader />
        <div className="row ">
          <FavoriteMovieList favoriteMovies={favoriteMovies} />

          <Routes>
            <Route path="movies/edit/:id" set setMovies={setMovies} element={<EditMovieForm/>}/>
            <Route path="movies/add" element={<AddMovieForm setMovies={setMovies}/>}/>
            <Route path="movies/:id" element={<Movie deleteMovie={deleteMovie} />} />

            <Route path="movies" element={<MovieList movies={movies} />} />

            <Route path="/" element={<Navigate to="/movies" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};


export default App;
