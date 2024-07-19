import React, { useState, useEffect } from "react";
import { retrieveLocalData, updateLocalData } from "../utils";
import { PlannedMonth, Meal, Category, Food } from "../types";
import { getMonthName } from "../utils";
import { useTheme } from "../Components/ThemeProvider";

type Props = {};

export default function Calendar({}: Props) {
	// State variables
	const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());
	const [selectedDay, setSelectedDay] = useState<string | null>();
	const [input, setInput] = useState("");
	const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
	const [plannedMeals, setPlannedMeals] = useState<PlannedMonth>({
		// Initialize planned meals for the month with empty strings
		1: { name: "", checked: false },
		2: { name: "", checked: false },
		3: { name: "", checked: false },
		4: { name: "", checked: false },
		5: { name: "", checked: false },
		6: { name: "", checked: false },
		7: { name: "", checked: false },
		8: { name: "", checked: false },
		9: { name: "", checked: false },
		10: { name: "", checked: false },
		11: { name: "", checked: false },
		12: { name: "", checked: false },
		13: { name: "", checked: false },
		14: { name: "", checked: false },
		15: { name: "", checked: false },
		16: { name: "", checked: false },
		17: { name: "", checked: false },
		18: { name: "", checked: false },
		19: { name: "", checked: false },
		20: { name: "", checked: false },
		21: { name: "", checked: false },
		22: { name: "", checked: false },
		23: { name: "", checked: false },
		24: { name: "", checked: false },
		25: { name: "", checked: false },
		26: { name: "", checked: false },
		27: { name: "", checked: false },
		28: { name: "", checked: false },
		29: { name: "", checked: false },
		30: { name: "", checked: false },
		31: { name: "", checked: false }
	});
	const [savedMeals, setSavedMeals] = useState<Meal[]>([]);
	const [ingredients, setIngredients] = useState<Category[]>([]);
	const [loading, setLoading] = useState(true);
	const { theme, toggleTheme } = useTheme();

	// Function to handle day selection
	const selectDay = (event: any, day: string): void => {
		event.stopPropagation();
		if (!day) {
			return; // Do nothing if day is empty
		}
		// Set input field with the planned meal for the selected day
		setInput(plannedMeals[day].name.toString());
		setSelectedDay(day);
	};

	// Function to handle form submission
	const handleSubmit = (event: any, day: string): void => {
		event.stopPropagation();
		// Update planned meal for the selected day
		let temp: any = plannedMeals;
		temp[Number(day)].name = input;
		// console.log('event', event.target);

		// Clear input field and hide the form
		setInput("");
		setSelectedDay(null);

		// Update local storage with the modified planned meals data
		updateLocalData(getMonthName(currentMonthIndex), plannedMeals);
	};

	// Function to get the number of days in a month
	const daysInMonth = (year: number, month: number) => {
		return new Date(year, month + 1, 0).getDate();
	};

	// Function to get the days for the specified month
	const getDaysForMonth = (year: number, month: number) => {
		// Get the first day of the month and calculate the number of days in the month
		const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		const firstDayOfMonth = new Date(year, month, 1);
		const startDay = daysOfWeek[firstDayOfMonth.getDay()];
		const daysInThisMonth = daysInMonth(year, month);

		// Create an array of days in the month
		const emptyCells = Array.from({ length: daysOfWeek.indexOf(startDay) }, (_, i) => "");
		const daysOfMonth = Array.from({ length: daysInThisMonth }, (_, i) => (i + 1).toString());
		const allDays = [...emptyCells, ...daysOfMonth];

		// Split the days into weeks
		const weeks: string[][] = [];
		while (allDays.length > 0) {
			weeks.push(allDays.splice(0, 7));
		}
		return weeks;
	};

	// Function to handle previous month button click
	const handlePrevMonth = () => {
		setCurrentMonthIndex(prevIndex => (prevIndex === 0 ? 11 : prevIndex - 1));
	};

	// Function to handle next month button click
	const handleNextMonth = () => {
		setCurrentMonthIndex(prevIndex => (prevIndex === 11 ? 0 : prevIndex + 1));
	};

	const ingredients12 = [
		{
			id: 1,
			name: "Category 1",
			foods: [
				{
					name: "Food 1",
					quantity: 1,
					catefor: "Category 1"
				},
				{
					name: "Food 2",
					quantity: 2,
					category: "Category 1"
				}
			]
		}
	];

	const handleCheck = (event: any, day: string, meal: string) => {
		event.stopPropagation();
		// Create a new object with the current state
		let tempPlannedMeals: any = { ...plannedMeals };
		// let tempPlannedMeals: any = JSON.parse(JSON.stringify(plannedMeals));
		// Update the checked property of the specific day
		tempPlannedMeals[day].checked = !tempPlannedMeals[day].checked;
		if (tempPlannedMeals[day].checked) {
			// Get the ingredients for the selected meal
			const mealIngredients = savedMeals.find(savedMeal => savedMeal.name === meal)?.ingredients;
			// Loop through the ingredients and update the quantities
			let tempIngredients = JSON.parse(JSON.stringify(ingredients));

			mealIngredients?.forEach(ingredient => {
				const ingredientCategoryIndex = tempIngredients.findIndex(
					(category: Category) => category.foods.find(food => food.name === ingredient)?.name === ingredient
				);
				// console.log("ingredientCategory", ingredientCategory);

				if (ingredientCategoryIndex !== -1) {
					const foodItemIndex = tempIngredients[ingredientCategoryIndex].foods.findIndex((food: Food) => food.name === ingredient);

					if (foodItemIndex !== -1) {
						console.log(tempIngredients[ingredientCategoryIndex].foods[foodItemIndex].quantity);
						tempIngredients[ingredientCategoryIndex].foods[foodItemIndex].quantity -= 1;
						console.log(tempIngredients[ingredientCategoryIndex].foods[foodItemIndex].quantity);
						if (tempIngredients[ingredientCategoryIndex].foods[foodItemIndex].quantity === 0) {
							// Remove the ingredient if the quantity is zero
							tempIngredients[ingredientCategoryIndex].foods = tempIngredients[ingredientCategoryIndex].foods.filter(
								(food: Food) => food.name !== ingredient
							);
						}
					}
				}
				console.log("tempIngredients", tempIngredients);
				setIngredients(tempIngredients);
				updateLocalData("ingredients", tempIngredients);
			});

			setPlannedMeals(tempPlannedMeals);
			updateLocalData(getMonthName(currentMonthIndex), tempPlannedMeals);
		} else {
			const mealIngredients = savedMeals.find(savedMeal => savedMeal.name === meal)?.ingredients;
			console.log("mealIngredients", mealIngredients);
			let temp: any = [...ingredients];
			mealIngredients?.forEach((ingredient, idx) => {
				console.log("ingredient", ingredient);
				// console.log("ingredients", ingredients);
				// grabs category of the ingredient, returns undefined if doesn't find it
				const ingredientCategory = ingredients.find(category => category.foods.some(food => food.name === ingredient));
				console.log("ingredientCategory", ingredientCategory);
				if (ingredientCategory !== undefined) {
					const foodItem = ingredientCategory?.foods.find(food => food.name === ingredient);
					console.log("foodItem", foodItem);
					if (foodItem) {
						foodItem.quantity += 1;
					}
				} else {
					console.log("here");
					//if ingredient category is undefined
					let unCatIndex: number;
					if (idx === 0) {
						unCatIndex = ingredients.findIndex(category => category.name === "Uncategorized");
					} else {
						unCatIndex = temp.findIndex((category: Category) => category.name === "Uncategorized");
					}
					// console.log("unCatIndex", unCatIndex);
					// console.log("temp", temp);
					// console.log("temp[unCatIndex]", temp[unCatIndex]);
					if (unCatIndex !== -1) {
						temp[unCatIndex].foods.push({
							id: temp[unCatIndex].foods.length,
							name: ingredient,
							quantity: 1,
							category: "Uncategorized"
						});
					} else {
						temp.push({
							id: ingredients.length,
							name: "Uncategorized",
							foods: [
								{
									id: 1,
									name: ingredient,
									quantity: 1,
									category: "Uncategorized"
								}
							]
						});
					}
				}
			});
			setIngredients(temp);
			console.log("temp", temp);
			// Update local storage with the new ingredient data
			updateLocalData("ingredients", temp);
		}
	};

	// Get current year, day, and month
	const currentYear = new Date().getFullYear();
	const currentDay = new Date().getDate();
	const currentMonth = new Date().getMonth();

	// Effect hook to retrieve local data when currentMonthIndex changes
	useEffect(() => {
		// console.log(getMonthName(currentMonthIndex))
		setPlannedMeals(retrieveLocalData("calendarData", getMonthName(currentMonthIndex)));
		setSavedMeals(retrieveLocalData("savedMeals"));
		setIngredients(retrieveLocalData("ingredients"));
		setTimeout(() => setLoading(false), 500);
		// setLoading(false);
		console.log(retrieveLocalData("ingredients"));
		console.log(theme);
		// setInput(savedMeals[0]?.name);
		// console.log
	}, [currentMonthIndex, theme]);

	// Render the calendar component
	return loading ? (
		<div className="flex justify-center align-center h-screen">
			<span className="loading loading-spinner loading-lg"></span>
		</div>
	) : (
		<div className="p-4">
			<div>
				<div className="flex justify-between mb-4">
					{/* <button className="px-4 py-2 bg-gray-200 rounded-md" onClick={handlePrevMonth}>
						Previous Month
					</button> */}
					<button className="btn btn-info" onClick={handlePrevMonth}>
						Previous Month
					</button>
					<h2 className="text-xl font-bold">{getMonthName(currentMonthIndex)}</h2>
					{/* <button className="px-4 py-2 bg-gray-200 rounded-md" onClick={handleNextMonth}>
						Next Month
					</button> */}
					<button className="btn btn-info" onClick={handleNextMonth}>
						Next Month
					</button>
				</div>
				<table className="table-fixed w-full border-collapse">
					<thead>
						<tr className="bg-gray-200">
							<th className="w-1/7 p-2 border border-gray-400">Sun</th>
							<th className="w-1/7 p-2 border border-gray-400">Mon</th>
							<th className="w-1/7 p-2 border border-gray-400">Tue</th>
							<th className="w-1/7 p-2 border border-gray-400">Wed</th>
							<th className="w-1/7 p-2 border border-gray-400">Thu</th>
							<th className="w-1/7 p-2 border border-gray-400">Fri</th>
							<th className="w-1/7 p-2 border border-gray-400">Sat</th>
						</tr>
					</thead>
					<tbody>
						{getDaysForMonth(currentYear, currentMonthIndex).map((week, weekIndex) => (
							<tr key={weekIndex}>
								{week.map((day, dayIndex) => (
									<td
										key={dayIndex}
										className={`relative h-36 p-2 border border-gray-400 ${day ? "" : "bg-gray-200"} ${
											parseInt(day) === currentDay && currentMonthIndex === currentMonth ? "border-2 border-pink-600" : ""
										} ${selectedDay === day ? "bg-blue-200" : ""}`}
										onClick={e => {
											// console.log(selectedDay, day);
											if (selectedDay !== day) {
												// console.log("clicked on a different day");
												selectDay(e, day);
											} else {
												//if the drop down is clicked, do not deselect the day
												if ((e.target as HTMLElement).tagName === "SELECT") {
													return;
												}
												// console.log("clicked on the same day");
												setSelectedDay(null);
											}
										}}
									>
										<p className="m-auto">{plannedMeals[day]?.name}</p>
										{day && (
											<div className="">
												{/* <input
													type="checkbox"
													id="cooked"
													name="cooked"
													className="absolute top-1 left-2"
													checked={!!plannedMeals[day]?.checked}
													onChange={event => {
														event.stopPropagation();
														handleCheck(event, day, String(plannedMeals[day]?.name));
													}}
													// onChange={e => e.currentTarget === e.target && handleCheck(e, day, String(plannedMeals[day]?.name))}
												/> */}
												<input
													type="checkbox"
													id="cooked"
													name="cooked"
													className="checkbox checkbox-sm absolute top-1 left-2"
													checked={!!plannedMeals[day]?.checked}
													onChange={event => {
														event.stopPropagation();
														handleCheck(event, day, String(plannedMeals[day]?.name));
													}}
												/>
												<span className="flex absolute top-0 right-2">
													<div className="mr-2"></div>

													{day}
												</span>
											</div>
										)}
										{selectedDay === day ? (
											<form className="flex">
												<select
													className="select select-bordered select-xs w-4/5 max-w-xs"
													// value={input}
													autoFocus
													onChange={event => {
														setInput(event.target.value);
														// console.log(event.target.value);
													}}
													defaultValue="Select a meal"
												>
													<option value="Select a meal" disabled>
														Select a meal
													</option>
													{savedMeals.map(meal => (
														<option
															key={meal.id}
															value={meal.name}
															onClick={() => {
																setInput(meal.name);
															}}
														>
															{meal.name}
														</option>
													))}
												</select>
												{/* <button type="submit" className="w-4 h-4 bg-green-400" onClick={(event) => {
								handleSubmit(event, day);
							}}></button> */}
												<button
													type="submit"
													className="btn btn-xs ml-2 bg-green-400 border-black"
													onClick={event => {
														handleSubmit(event, day);
													}}
												>
													Save
												</button>
												{/* <button
													type="submit"
													className="w-6 h-6 bg-green-400"
													onClick={event => {
														handleSubmit(event, day);
													}}
												>
													<svg
														className="w-6 h-6 bg-green-400 fill-white"
														xmlns="http://www.w3.org/2000/svg"
														height="24"
														viewBox="0 -960 960 960"
														width="24"
													>
														<path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z" />
													</svg>
												</button> */}
											</form>
										) : (
											<form style={{ display: "none" }}></form>
										)}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
