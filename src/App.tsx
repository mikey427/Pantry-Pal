import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import MealPlanner from "./Pages/MealPlanner";
import Navbar from "./components/Navbar";
import Ingredients from "./Pages/Ingredients";
import ShoppingList from "./Pages/ShoppingListPage";
import SavedMeals from "./Pages/SavedMeals";
import { ThemeProvider } from "./components/ThemeProvider";

function App() {
	return (
		<ThemeProvider>
			<div className="App" data-theme="light">
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/meal_planner" element={<MealPlanner />} />
					<Route path="/ingredients" element={<Ingredients />} />
					<Route path="/shopping_list" element={<ShoppingList />} />
					<Route path="/saved_meals" element={<SavedMeals />} />
				</Routes>
			</div>
		</ThemeProvider>
	);
}

export default App;
