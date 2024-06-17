import React, { useState, useEffect } from "react";
import { DndContext, useSensors, useSensor, PointerSensor } from "@dnd-kit/core";
import { Category, Food } from "../types";
import { retrieveLocalData, updateLocalData } from "../utils";
import Draggable from "./Draggable";
import Droppable from "./Droppable";

type Props = {};

const NewIngredientAccordion = (props: Props) => {
	const [categories, setCategories] = useState<Category[]>([
		{
			id: 1,
			name: "Category 1",
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
		},
		{
			id: 2,
			name: "Category 2",
			foods: [
				{
					id: 1,
					name: "Food 3",
					quantity: 3,
					category: "Category 2"
				},
				{
					id: 2,
					name: "Food 4",
					quantity: 4,
					category: "Category 2"
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
	const [foodDragged, setFoodDragged] = useState(null);
	const [prevCategory, setPrevCategory] = useState<number | null>(null);

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
				distance: 20
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

				let foodIndex: number = categories[oldCatIndex].foods.findIndex(food => food.name === foodDragged);
				temp[newCatIndex].foods.push(categories[oldCatIndex].foods[foodIndex]);
				temp[oldCatIndex].foods.splice(foodIndex, 1);
				setCategories([...temp]);
			}
		}
	};

	function handleDragStart(event: any) {
		const category = categories.find((category: Category) =>
			category.foods.some(food => food.name === event.active.id.substring(event.active.id.indexOf(" ") + 1))
		);
		console.log("category", category);
		if (category) {
			// console.log("category.id", category.id);
			setPrevCategory(category.id);
		}
		setFoodDragged(event.active.id.substring(event.active.id.indexOf(" ") + 1));
	}

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
		console.log(categories);
	}, []);

	return (
		<div className="bg-gray-900">
			<div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
				<div className="mx-auto max-w-4xl divide-y divide-white/10">
					<h2 className="text-2xl font-bold leading-10 tracking-tight text-white">Ingredients</h2>
					<dl className="mt-10 space-y-6 divide-y divide-white/10">
						<DndContext
							onDragStart={event => {
								handleDragStart(event);
							}}
							onDragEnd={handleDragEnd}
							sensors={sensors}
						>
							{categories.map((category, categoryIndex) => (
								<div className="pt-6">
									<dt>
										{/* Expand/collapse question button */}

										<button
											type="button"
											className="flex w-full items-start justify-between text-left text-white"
											aria-controls="faq-0"
											aria-expanded="false"
										>
											<span className="text-base font-semibold leading-7">{category.name}</span>
											<span className="ml-6 flex h-7 items-center">
												{/*
              Icon when question is collapsed.
  
              Item expanded: "hidden", Item collapsed: ""
            */}
												<svg
													className="h-6 w-6"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth="1.5"
													stroke="currentColor"
													aria-hidden="true"
												>
													<path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
												</svg>
												{/*
              Icon when question is expanded.
  
              Item expanded: "", Item collapsed: "hidden"
            */}
												<svg
													className="hidden h-6 w-6"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth="1.5"
													stroke="currentColor"
													aria-hidden="true"
												>
													<path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
												</svg>
											</span>
										</button>
									</dt>
                                    
									<dd className="mt-2 pr-12" id="faq-0">
										<p className="text-base leading-7 text-gray-300">
											I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
											cupiditate laboriosam fugiat.
										</p>
									</dd>
								</div>
							))}
						</DndContext>
						{/* More questions... */}
					</dl>
				</div>
			</div>
		</div>
	);
};

export default NewIngredientAccordion;
