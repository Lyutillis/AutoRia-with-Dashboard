import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import './App.css';
import Header from "./components/Header";
import CarList from "./components/CarList";


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={ <CarList /> } />
        <Route exact path="/about" element={ <Header /> } />
        <Route exact path="/contact" element={ <Header /> } />
      </Routes>
    </Router>
  );
}

export default App;
