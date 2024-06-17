import React, { useState, useEffect } from "react";
import { retrieveLocalData, updateLocalData } from "../utils";
import { Category, Food } from "../types";
import { DndContext } from "@dnd-kit/core";
import { useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import Draggable from "./Draggable";
import Droppable from "./Droppable";
import ExpandIcon from "../SVGs/ExpandIcon";
import CollapseIcon from "../SVGs/CollapseIcon";
import LockIcon from "../SVGs/LockIcon";

// interface Category {
//     id: number;
//     name: string;
//     foods: string[];
//     isOpen?: boolean;
// }

export default function IngredientAccordion() {
	const [categories, setCategories] = useState<Category[]>([
		{
			id: 0,
			name: "Category 0",
			foods: [
				{
					id: 1,
					name: "Food 1",
					quantity: 1,
					category: "Category 0"
				},
				{
					id: 2,
					name: "Food 2",
					quantity: 2,
					category: "Category 0"
				}
			]
		},
		{
			id: 1,
			name: "Category 1",
			foods: [
				{
					id: 1,
					name: "Food 3",
					quantity: 3,
					category: "Category 1"
				},
				{
					id: 2,
					name: "Food 4",
					quantity: 4,
					category: "Category 1"
				}
			]
		}
		// Add more categories as needed
	]);
	const [input, setInput] = useState("");
	const [selected, setSelected] = useState("");
	const [isDropped, setIsDropped] = useState(false);
	const [parent, setParent] = useState(null);
	const [target, setTarget] = useState(null);
	const [foodDragged, setFoodDragged] = useState<string | null>(null);
	const [prevCategory, setPrevCategory] = useState<number | null>(null);
	// const [areAllCategoriesOpen, setAreAllCategoriesOpen] = useState(false);
	// const [areAllCategoriesClosed, setAreAllCategoriesClosed] = useState(false);
	const [allCategoriesOpen, setAllCategoriesOpen] = useState(categories.every(category => category.isOpen));
	const [unsavedChanges, setUnsavedChanges] = useState<Boolean | null>(null);

	// // Function to retrieve planned meals data from local storage
	// const retrieveLocalData = (): void => {
	//     let data: any = localStorage.getItem("ingredients");
	//     // If data not found in local storage, initialize it with empty strings
	//     if (!data) {
	//         localStorage.setItem("ingredients", JSON.stringify(categories));
	//         setCategories([...categories]);
	//     } else {
	//         // If data found in local storage, set plannedMeals state with retrieved data
	//         setCategories(JSON.parse(data));
	//     }
	// }

	// Function to update planned meals data in local storage
	// const updateLocalData = (): void => {
	//     localStorage.setItem("ingredients", JSON.stringify(categories));
	// }

	const toggleAccordion = (categoryId: number) => {
		setCategories(
			categories.map(category => {
				if (category.id === categoryId) {
					return { ...category, isOpen: !category.isOpen };
				}
				return category;
			})
		);
	};

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 25
			}
		})
	);

	interface UseDroppableArguments {
		id: string | number;
		disabled?: boolean;
		data?: Record<string, any>;
	}

	// This function will remove the food from the current category it is in, and will add it to the category it is dropped in
	const handleDragEnd = (event: any) => {
		const { over } = event;
		console.log("over", over);
		if (over) {
			let temp: Category[] = [...categories];
			let newCatIndex: number = categories.findIndex(category => category.id === over.id);
			let oldCatIndex: number | null = prevCategory;
			console.log("oldCatIndex", oldCatIndex);

			if (oldCatIndex !== null && oldCatIndex !== newCatIndex) {
				// oldCatIndex--;
				console.log("oldCatIndex", oldCatIndex);
				console.log("categories[oldCatIndex]", categories[oldCatIndex]);
				console.log("categories", categories);

				let foodIndex: number = categories[oldCatIndex].foods.findIndex(food => food?.name === foodDragged);
				temp[newCatIndex].foods.push(categories[oldCatIndex].foods[foodIndex]);
				temp[oldCatIndex].foods.splice(foodIndex, 1);
				setCategories([...temp]);
			}
		}
	};

	// const handleDrop = (event: any) => {
	// 	// const foodName = event.dataTransfer.getData("text/plain");
	// 	// console.log("foodName", foodName);
	// 	// const foodIndex = categories[index].foods.findIndex(food => food.name === foodName);
	// 	// handle drop logic here
	// };

	function handleDragStart(event: any) {
		const category = categories.find((category: Category) =>
			category.foods.some(food => food.name === event.active.id.substring(event.active.id.indexOf(" ") + 1))
		);
		console.log("id", event.active.id);
		console.log("category", category);
		if (category) {
			// console.log("category.id", category.id);
			setPrevCategory(category.id);
		}
		console.log(event.active.id.substring(event.active.id.indexOf(" ") + 1));
		setFoodDragged(event.active.id.substring(event.active.id.indexOf(" ") + 1));
	}
	// function handleDragStart(event: any) {
	// 	const [categoryIndex, foodId] = event.active.id.split("-");
	// 	const category = categories[categoryIndex];
	// 	console.log("category", category);
	// 	if (category) {
	// 		setPrevCategory(category.id);
	// 	}
	// 	const food = category.foods.find(food => food.id === foodId);
	// 	if (food) {
	// 		setFoodDragged(food.name);
	// 	}
	// }

	const handleFoodEdit = (event: any, categoryIndex: number, food: string): void => {
		let temp: Category[] = [...categories];
		let index: number = categories[categoryIndex].foods.findIndex(foodItem => foodItem.name === food);
		temp[categoryIndex].foods[index].name = input;
		setCategories([...temp]);
		setInput("");
		updateLocalData("ingredients", categories);
	};

	const handleCategoryEdit = (event: any, categoryIndex: number): void => {
		event.preventDefault();
		event.stopPropagation();
		let temp: Category[] = [...categories];
		if (temp[categoryIndex].name !== input) {
			temp[categoryIndex].name = input;
			temp[categoryIndex].foods = temp[categoryIndex].foods.map(food => {
				food.category = input;
				return food;
			});
		}
		let temp1: string = selected;
		setCategories([...temp]);
		setInput("");
		setSelected("");
		updateLocalData("ingredients", categories);
	};

	const handleAddFood = (categoryIndex: number): void => {
		let temp: Category[] = [...categories];
		temp[categoryIndex].foods.push({
			id: temp[categoryIndex].foods.length + 1,
			name: "New Food",
			quantity: 1,
			category: temp[categoryIndex].name
		}); // Add your default food item here
		setCategories([...temp]);
		updateLocalData("ingredients", categories);
	};

	const handleDeleteCategory = (categoryId: number): void => {
		let temp: Category[] = categories;
		temp = temp.filter(category => category.id !== categoryId);
		setCategories(temp);
		updateLocalData("ingredients", categories);
	};

	const handleDeleteFood = (categoryIndex: number, foodIndex: number): void => {
		let temp: Category[] = [...categories];
		temp[categoryIndex].foods.splice(foodIndex, 1);
		setCategories([...temp]);
		updateLocalData("ingredients", categories);
	};

	const handleIncrementQuantity = (categoryIndex: number, foodIndex: number): void => {
		let temp: Category[] = [...categories];
		temp[categoryIndex].foods[foodIndex].quantity++;
		setCategories([...temp]);
		updateLocalData("ingredients", categories);
	};

	const handleDecrementQuantity = (categoryIndex: number, foodIndex: number): void => {
		let temp: Category[] = [...categories];
		temp[categoryIndex].foods[foodIndex].quantity--;
		setCategories([...temp]);
		updateLocalData("ingredients", categories);
	};

	useEffect(() => {
		setCategories(retrieveLocalData("ingredients"));
		console.log("useeffect one");
	}, []);
	useEffect(() => {
		setAllCategoriesOpen(categories.every(category => category.isOpen));
		setUnsavedChanges(true);
		console.log("categories updated");
		console.log(unsavedChanges);
	}, [categories]);

	// useEffect(() => {
	// 	if (categories.every(category => category.isOpen)) {
	// 		setAreAllCategoriesOpen(true);
	// 	} else if (categories.every(category => !category.isOpen)) {
	// 		setAreAllCategoriesClosed(true);
	// 	}
	// }, [categories]);

	return (
		<div className="w-full">
			<div className="flex justify-between">
				<div className="flex">
					{/* <button
						className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 mr-3"
						onClick={() => {
							setCategories(
								categories.map(category => ({
									...category,
									isOpen: true
								}))
							);
						}}
					>
						Expand All
					</button> */}
					{/* <button
						className="btn bg-blue-500 text-white px-4 py-2 rounded-md mb-4 mr-3"
						onClick={() => {
							setCategories(
								categories.map(category => ({
									...category,
									isOpen: true
								}))
							);
						}}
					>
						Expand All
					</button> */}
					<button
						className="btn bg-purple hover:bg-indigo-900 text-white px-4 py-2 rounded-md mb-4 mr-3"
						onClick={() => {
							setCategories(
								categories.map(category => ({
									...category,
									isOpen: allCategoriesOpen ? false : true
								}))
							);
							// if (categories.every(category => category.isOpen)) {
							// 	setAreAllCategoriesOpen(true);
							// } else if (categories.every(category => !category.isOpen)) {
							// 	setAllCategoriesOpen(false);
							// }
						}}
					>
						{/* {`${categories[0].isOpen ? "Collapse" : "Expand"} All`} */}
						{allCategoriesOpen ? <CollapseIcon /> : <ExpandIcon />}
					</button>
				</div>
				<div className="flex">
					<button
						className="btn bg-purple text-white px-4 py-2 mb-4 mr-3"
						onClick={() => {
							// console.log(categories[0]);
							let temp: Category;
							if (!categories[0]) {
								temp = {
									id: 0,
									name: "Category " + "0",
									foods: [
										{
											id: 1,
											name: "Food 1",
											quantity: 1,
											category: "Category 1"
										},
										{
											id: 2,
											name: "Food 2",
											quantity: 2,
											category: "Category 1"
										}
									]
								};
							} else {
								temp = {
									id: categories[categories.length - 1].id + 1,
									name: "Category " + (Number(categories[categories.length - 1].id) + 1),
									foods: [
										{
											id: 1,
											name: "Food 1",
											quantity: 1,
											category: "Category " + (categories[categories.length - 1].id + 1)
										},
										{
											id: 2,
											name: "Food 2",
											quantity: 2,
											category: "Category " + (categories[categories.length - 1].id + 1)
										}
									]
								};
							}
							setCategories([...categories, temp]);
							updateLocalData("ingredients", categories);
						}}
					>
						New Category
					</button>
					{/* <button
                        className="text-white px-4 py-2 rounded-md mb-4 mr-3 bg-blue-500"
                        onClick={() => {
                            updateLocalData("ingredients", categories);
                        }}
                    >
                        Save Data
                    </button> */}
					{/* <svg
						className="text-white fill-white bg-blue-500 cursor-pointer rounded-md w-12 h-12"
						xmlns="http://www.w3.org/2000/svg"
						height="24"
						viewBox="0 -960 960 960"
						width="24"
						onClick={() => {
							updateLocalData("ingredients", categories);
						}}
					>
						<path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z" />
					</svg> */}
					<LockIcon
						className="w-12 h-12 my-auto mb-4 ml-3"
						state={unsavedChanges ? "unlocked" : "locked"}
						onClick={() => {
							updateLocalData("ingredients", categories);
							setUnsavedChanges(false);
						}}
					/>
				</div>
			</div>
			<DndContext
				onDragStart={event => {
					console.log("on drag start");
					handleDragStart(event);
				}}
				onDragEnd={handleDragEnd}
				sensors={sensors}
			>
				{categories.map((category, categoryIndex) => (
					<Droppable
						key={category.id}
						id={category.id}
						className="border border-gray-200 rounded-md mb-4"
						// ref={setNodeRef}
						// style={styleDrop}
					>
						<div
							className="flex items-center justify-between bg-gray-800 text-gray-300 px-4 py-2 w-full mb-1 cursor-pointer"
							onClick={() => toggleAccordion(category.id)}
						>
							<div>
								<span
									onClick={event => {
										console.log("here");
										event.stopPropagation();
										setInput(category.name);
										setSelected(category.name);
									}}
								>
									{category.name}
									{selected === category.name ? (
										<form>
											<input
												placeholder="test"
												value={input}
												autoFocus
												onChange={event => {
													setInput(event.target.value);
												}}
											></input>
											<button
												type="submit"
												className="w-4 h-4 bg-green-400"
												onClick={event => {
													handleCategoryEdit(event, categoryIndex);
												}}
											></button>
										</form>
									) : (
										<form style={{ display: "none" }}></form>
									)}
								</span>
							</div>
							<div className="flex items-center">
								{/* {category.isOpen ? (
									// <button className="bg-blue-500 text-white rounded-md my-auto mr-1 w-6 h-6 align-middle font-bold" onClick={(event) => {
									//         event.stopPropagation();
									//         handleAddFood(categoryIndex);
									//     }}>
									//     +
									// </button>
									<svg
										className="bg-blue-500 cursor-pointer text-white fill-white mx-1 rounded-md mr-1"
										onClick={event => {
											event.stopPropagation();
											handleAddFood(categoryIndex);
										}}
										xmlns="http://www.w3.org/2000/svg"
										height="24"
										viewBox="0 -960 960 960"
										width="24"
									>
										<path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
									</svg>
								) : null} */}
								{/* <button className="bg-red-500 text-white px-2 py-1 rounded-md my-auto text-xs w-6 h-6 font-bold" onClick={(event) => {
                                    event.stopPropagation();
                                    handleDeleteCategory(category.id);
                                }}>
                                    X
                                </button> */}
								{/* <svg
									className="bg-red-500 cursor-pointer text-white fill-white rounded-md my-auto text-xs w-6 h-6 font-bold"
									onClick={event => {
										event.stopPropagation();
										handleDeleteCategory(category.id);
									}}
									xmlns="http://www.w3.org/2000/svg"
									height="24"
									viewBox="0 -960 960 960"
									width="24"
								>
									<path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
								</svg> */}
								{/* <svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="cursor-pointer rounded-md my-auto text-xs w-5 h-5 font-bold"
									onClick={event => {
										event.stopPropagation();
										handleDeleteCategory(category.id);
									}}
								></svg> */}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-5 h-5 mr-2"
									onClick={event => {
										event?.stopPropagation();
										handleDeleteCategory(category.id);
									}}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
									/>
								</svg>

								<svg className={`w-4 h-4 ${category.isOpen ? "transform rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414zM10 4a1 1 0 011 1v8a1 1 0 01-2 0V5a1 1 0 011-1z"
									/>
								</svg>
							</div>
						</div>
						{category.isOpen && (
							<div className="px-4 pb-4">
								<ul className="flex flex-col">
									{category.foods.map((food, foodIndex) => (
										<Draggable
											// key={food.name}
											key={foodIndex}
											// id={`${foodIndex} ${food.name ? food.name : "food"}`}
											id={`${categoryIndex}-${food.id}`}
											className="text-gray-600 flex justify-between my-1 align-middle"
										>
											<div
												className="flex justify-between align-middle my-1"
												onClick={() => {
													console.log("here");
													if (selected !== food.name) {
														setSelected(food.name);
													} else {
														setSelected("");
													}
												}}
											>
												<div className="flex">
													{/* <svg
														className="bg-red-500 cursor-pointer text-white fill-white rounded-md my-auto text-xs w-6 h-6 font-bold"
														onClick={event => {
															event.stopPropagation();
															handleDeleteFood(categoryIndex, foodIndex);
														}}
														xmlns="http://www.w3.org/2000/svg"
														height="24"
														viewBox="0 -960 960 960"
														width="24"
													>
														<path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
													</svg> */}
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														strokeWidth={1.5}
														stroke="currentColor"
														className="cursor-pointer rounded-md my-auto text-xs w-5 h-5 font-bold"
														onClick={event => {
															event.stopPropagation();
															handleDeleteFood(categoryIndex, foodIndex);
														}}
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
														/>
													</svg>

													<span
														className="my-auto mx-1 flex items-center w-32"
														// onClick={() => {
														// 	console.log("here");
														// }}
													>
														{food.name}
													</span>
													{selected === food.name ? (
														<form className="flex items-center">
															<input
																placeholder="test"
																value={input}
																autoFocus
																onChange={event => {
																	setInput(event.target.value);
																}}
															></input>
															<button
																type="submit"
																className="w-6 h-6 bg-green-400"
																onClick={event => {
																	handleFoodEdit(event, categoryIndex, food.name);
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
															</button>
														</form>
													) : (
														<form style={{ display: "none" }}></form>
													)}
													{/* <button
                                                    className="bg-red-500 text-white px-2 py-1 mx-1 rounded-md text-xs font-bold"
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        handleDecrementQuantity(categoryIndex, foodIndex);
                                                    }}
                                                >
                                                    -
                                                </button> */}
													{/* /// HEREEee */}
													{/* <button
                                                    className="bg-green-500 text-white px-2 py-1 mx-1 rounded-md text-xs font-bold mr-1"
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        handleIncrementQuantity(categoryIndex, foodIndex);
                                                    }}
                                                >
                                                    +
                                                </button> */}
												</div>
												<div className="flex justify-between w-28">
													<svg
														className="bg-red-500 cursor-pointer text-white fill-white mx-2 rounded-md mr-1"
														onClick={event => {
															event.stopPropagation();
															handleDecrementQuantity(categoryIndex, foodIndex);
														}}
														xmlns="http://www.w3.org/2000/svg"
														height="24"
														viewBox="0 -960 960 960"
														width="24"
													>
														<path d="M200-440v-80h560v80H200Z" />
													</svg>
													<span>{food.quantity}</span>
													<svg
														className="bg-green-500 cursor-pointer text-white fill-white mx-2 rounded-md mr-1"
														onClick={event => {
															event.stopPropagation();
															handleIncrementQuantity(categoryIndex, foodIndex);
														}}
														xmlns="http://www.w3.org/2000/svg"
														height="24"
														viewBox="0 -960 960 960"
														width="24"
													>
														<path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
													</svg>
												</div>
											</div>

											{/* <button
                                                className="bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold"
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    handleDeleteFood(categoryIndex, foodIndex);
                                                }}
                                            >
                                                X
                                            </button> */}
										</Draggable>
									))}
								</ul>
								{/* Add input fields here for editing category name and foods */}
								<div className="flex self-center h-8 cursor-pointer">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-5 h-5 mr-1 my-auto"
										onClick={event => {
											event.stopPropagation();
											handleAddFood(categoryIndex);
										}}
									>
										<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
									</svg>
									<span className="my-auto">ADD ITEM</span>
								</div>
							</div>
						)}
					</Droppable>
				))}
			</DndContext>
		</div>
	);
}
