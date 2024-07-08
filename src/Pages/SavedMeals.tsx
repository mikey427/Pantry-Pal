import React, { useState, useEffect } from "react";
import { retrieveLocalData, updateLocalData } from "../utils";
import { Meal } from "../types";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";

// interface Meal {
//     id: string;
//     name: string;
//     ingredients: string[];
// }

type Props = {};

export default function SavedMeals({}: Props) {
	const [meals, setMeals] = useState<Meal[]>([
		{
			id: "1",
			name: "Meal 1",
			ingredients: ["Chicken", "Ketchup"]
		}
	]);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [modalData, setModalData] = useState<Meal | null>(null);
	const [ingredients, setIngredients] = useState<string[]>([]);
	const [ingredientInput, setIngredientInput] = useState("");
	const [mealNameInput, setMealNameInput] = useState("");
	const [selectedIngredientIndex, setSelectedIngredientIndex] = useState<number | null>(null);
	const [editing, setEditing] = useState(false);
	const [viewMode, setViewMode] = useState("list"); // list or grid

	useEffect(() => {
		const savedMeals = retrieveLocalData("savedMeals") || [];
		setMeals(savedMeals);
	}, []);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const filteredMeals = meals.filter(meal => meal.name.toLowerCase().includes(searchTerm.toLowerCase()));

	const openModal = (meal: Meal | null = null) => {
		setMealNameInput(meal?.name || "");
		setIngredients(meal?.ingredients || []);
		setModalOpen(true);
		if (meal) {
			setEditing(true);
		}
		setModalData(meal);
	};

	const closeModal = () => {
		setMealNameInput("");
		setIngredientInput("");
		setIngredients([]);
		setModalOpen(false);
		setModalData(null);
		setEditing(false);
	};

	const addMeal = (newMeal: Meal) => {
		setMeals(prevMeals => [...prevMeals, newMeal]);
		updateLocalData("savedMeals", [...meals, newMeal]);
		setIngredientInput("");
		setMealNameInput("");
		closeModal();
	};

	const editMeal = (editedMeal: Meal) => {
		const updatedMeals = meals.map(meal => (meal.id === editedMeal.id ? editedMeal : meal));
		// console.log(editedMeal);
		// console.log(updatedMeals);
		setMeals(updatedMeals);
		updateLocalData("savedMeals", updatedMeals);
		closeModal();
	};

	const deleteMeal = (id: string) => {
		const updatedMeals = meals.filter(meal => meal.id !== id);
		setMeals(updatedMeals);
		updateLocalData("savedMeals", updatedMeals);
	};
	const toggleViewMode = () => {
		setViewMode(viewMode === "list" ? "grid" : "list");
	};
	const addOrEditMeal = (event: React.FormEvent) => {
		event.preventDefault();
		modalData
			? editMeal({
					id: modalData.id,
					name: mealNameInput,
					ingredients: ingredients
			  })
			: addMeal({
					id: String(meals.length + 1),
					name: mealNameInput,
					ingredients: ingredients
			  });
		setIngredients([]);
		setIngredientInput("");
		setMealNameInput("");
	};

	return (
		<div className="container mx-auto px-4 py-8 text-gray-700">
			<PageHeader
				title="Saved Meals"
				description="This is where you can view, edit, and delete your saved meals which can be scheduled as a meal on the Meal Planner."
			/>
			<div className="mb-4 flex justify-between w-full">
				<input
					type="text"
					value={searchTerm}
					onChange={handleSearchChange}
					placeholder="Search meals"
					className="input input-bordered w-full max-w-xs rounded-md"
				/>
				{/* <button onClick={() => setViewMode(viewMode === "list" ? "grid" : "list")} className="btn bg-blue-500 text-white">
					View Mode: {viewMode.charAt(0).toUpperCase() + viewMode.slice(1)}
				</button> */}
				<Button
					callback={toggleViewMode}
					styles="btn text-white ml-1 hidden md:block"
					text={`View Mode: ${viewMode.charAt(0).toUpperCase() + viewMode.slice(1)}`}
				/>
			</div>
			{viewMode === "grid" ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{filteredMeals.map(meal => (
						<div key={meal.id + 1} className="bg-white shadow-md rounded-md p-4">
							<h2 className="text-xl font-bold mb-2">{meal.name}</h2>
							{/* <button onClick={() => openModal(meal)} className="btn bg-blue-500 text-white mr-2">
								View/Edit
							</button> */}
							<Button callback={() => openModal(meal)} styles="text-white mr-2 border-0" text="View/Edit" />
							<Button callback={() => deleteMeal(meal.id)} styles={"text-white border-0"} text="Delete" />
							{/* <button onClick={() => deleteMeal(meal.id)} className="btn bg-red-500 text-white">
								Delete
							</button> */}
						</div>
					))}
				</div>
			) : (
				<div>
					{filteredMeals.map(meal => (
						<div key={meal.id + 1} className="bg-white shadow-md rounded-md p-2 flex items-center justify-between mb-2">
							<h2 className="text-xl font-bold">{meal.name}</h2>
							<div>
								{/* <button onClick={() => openModal(meal)} className="btn bg-blue-500 text-white mr-2">
									View/Edit
								</button> */}
								<Button callback={() => openModal(meal)} styles="text-white mr-2 border-0 mb-0" text="View/Edit" />
								<Button callback={() => deleteMeal(meal.id)} styles={"text-white border-0 mb-0"} text="Delete" />
								{/* <button onClick={() => deleteMeal(meal.id)} className="btn bg-red-500 text-white">
									Delete
								</button> */}
							</div>
						</div>
					))}
				</div>
			)}

			{modalOpen && (
				<div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
					{/* Modal Content */}
					<div className="relative w-1/4 h-max bg-white p-8 rounded-md">
						{/* Add Meal Form */}
						<form>
							<div className="flex flex-col mb-4">
								<label className="mb-1">Meal Name</label>
								<input
									className="input input-bordered w-full max-w-xs"
									value={mealNameInput}
									onChange={event => setMealNameInput(event.target.value)}
								/>
							</div>

							<div className="flex flex-col mb-4">
								<label className="mb-1">Ingredients:</label>
								<ul className="border border-gray-300 rounded-md p-2">
									{ingredients.map((ingredient: string, idx: number) => (
										<li key={idx} className="flex justify-between items-center">
											<span>{ingredient}</span>
											<div>
												<button
													type="button"
													className="btn text-blue-500 mr-2"
													onClick={() => {
														setIngredientInput(ingredient);
														setSelectedIngredientIndex(idx);
													}}
												>
													Edit
												</button>
												<button
													type="button"
													className="btn text-red-500"
													onClick={() => {
														const updatedIngredients = [...ingredients];
														updatedIngredients.splice(idx, 1);
														setIngredients(updatedIngredients);
													}}
												>
													Remove
												</button>
											</div>
										</li>
									))}
								</ul>

								<div className="flex mt-2">
									<input
										className="input input-bordered w-full max-w-xs p-2 flex-1 mr-2"
										value={ingredientInput}
										onChange={event => setIngredientInput(event.target.value)}
									/>
									<button
										type="button"
										className="btn text-sm h-8 bg-green-500 text-white"
										onClick={() => {
											// console.log('modalData', modalData);

											if (modalData) {
												let temp: Meal = modalData;
												// Editing existing ingredient

												if (selectedIngredientIndex !== null) {
													temp.ingredients[selectedIngredientIndex] = ingredientInput;
													// console.log('temp', temp);
													setModalData({ ...temp });
												} else {
													temp.ingredients.push(ingredientInput);
													setModalData({ ...temp });
												}
											} else {
												// For new meals
												// console.log('here')
												setIngredients([...ingredients, ingredientInput]);
											}
											setIngredientInput("");
											setSelectedIngredientIndex(null); // Reset selected index
										}}
									>
										{selectedIngredientIndex !== null ? "Edit Ingredient" : "Add Ingredient"}
									</button>
								</div>
							</div>

							<div className="flex justify-end">
								{/* <button
									className="btn mr-2 bg-blue-500 text-white"
									type="submit"
									onClick={event => {
										event.preventDefault();
										modalData
											? editMeal({
													id: modalData.id,
													name: mealNameInput,
													ingredients: ingredients
											  })
											: addMeal({
													id: String(meals.length + 1),
													name: mealNameInput,
													ingredients: ingredients
											  });
										setIngredients([]);
										setIngredientInput("");
										setMealNameInput("");
									}}
								>
									{modalData ? "Save Meal" : "Add Meal"}
								</button> */}
								<Button callback={addOrEditMeal} isSubmit={true} styles="mr-2" text={modalData ? "Save Meal" : "Add Meal"} />
								{/* <button className="btn bg-red-500 text-white" onClick={closeModal}>
									Cancel
								</button> */}
								<Button callback={closeModal} styles="bg-red-500 text-white" text="Cancel" />
							</div>
						</form>
						{/* <button onClick={closeModal} className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white px-2 py-1 rounded">X</button> */}
						<button className="btn absolute cursor-pointer top-2 right-2 w-12 h-12 p-0 bg-red-500 text-white fill-white rounded">
							<svg
								className="w-12 h-12"
								onClick={closeModal}
								xmlns="http://www.w3.org/2000/svg"
								height="12"
								viewBox="0 -960 960 960"
								width="12"
							>
								<path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
							</svg>
						</button>
					</div>
				</div>
			)}
			{/* <button onClick={() => openModal()} className="btn fixed bottom-4 right-4 bg-blue-500 text-white">
				Add Meal
			</button> */}
			<Button callback={openModal} styles="btn fixed bottom-4 right-4 text-white" text="Add Meal" />
		</div>
	);
}
