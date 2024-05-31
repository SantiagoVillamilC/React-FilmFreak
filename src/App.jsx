import React from "react";
import './App.css'
import { Routes, Route} from 'react-router-dom';
import { Nav } from './assets/components/nav/nav'
import { Home } from './assets/components/home/home'
import { Movie } from './assets/components/movie/movie'
import { NotFound } from './assets/components/error/error'

export const App = ()=>  {

  return (
    <>
      <Nav/>

      {/* Estipulamos las rutas */}

      <Routes>
          <Route path = "/React-FilmFreak" element = {<Home/>}/>
          <Route path="/movie/:id" element = {<Movie/>}/>
          <Route path="*" element = {<NotFound/>}/>
       </Routes>
    </>
  )
}

