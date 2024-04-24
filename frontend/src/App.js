import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import './App.css';
import Header from "./components/Header";
import CarList from "./components/CarList";
import EnhancedTable from "./components/DataTable/EnhancedTable";


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={ <CarList /> } />
        <Route exact path="/about" element={ <EnhancedTable /> } />
        <Route exact path="/contact" element={ <Header /> } />
      </Routes>
    </Router>
  );
}

export default App;
