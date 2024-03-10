import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import MealPlanner from './Pages/MealPlanner';
import Navbar from './Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meal_planner" element={<MealPlanner />} />
      </Routes>
    </div>
  );
}

export default App;
