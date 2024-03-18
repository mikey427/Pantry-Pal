import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import MealPlanner from './Pages/MealPlanner';
import Navbar from './Navbar';
import Ingredients from './Pages/Ingredients';
import ShoppingList from './Pages/ShoppingListPage';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meal_planner" element={<MealPlanner />} />
        <Route path="/ingredients" element={<Ingredients />} />
        <Route path="/shopping_list" element={<ShoppingList />} />
      </Routes>
    </div>
  );
}

export default App;
