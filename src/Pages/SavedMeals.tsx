import React, { useState, useEffect } from 'react';
import { retrieveLocalData, updateLocalData } from '../utils';
import { Meal } from '../types';

// interface Meal {
//     id: string;
//     name: string;
//     ingredients: string[];
// }

const SavedMeals: React.FC = () => {
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
    const [viewMode, setViewMode] = useState("grid"); // list or grid


    useEffect(() => {
        const savedMeals = retrieveLocalData("savedMeals") || [];
        setMeals(savedMeals);
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredMeals = meals.filter(meal =>
        meal.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
        const updatedMeals = meals.map(meal =>
            meal.id === editedMeal.id ? editedMeal : meal
        );
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

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Saved Meals</h1>
            <div className="mb-4 flex justify-between ">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search meals"
                    className="border border-gray-300 rounded-md p-2"
                />
                <button onClick={() => setViewMode(viewMode === "list" ? "grid" : "list")} className="bg-blue-500 text-white px-4 py-2 rounded">
                    View Mode: {viewMode.charAt(0).toUpperCase() + viewMode.slice(1)}
                </button>
            </div>
            {viewMode === "grid" ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMeals.map(meal => (
                    <div key={meal.id + 1} className="bg-white shadow-md rounded-md p-4">
                        <h2 className="text-xl font-bold mb-2">{meal.name}</h2>
                        <button onClick={() => openModal(meal)} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">View/Edit</button>
                        <button onClick={() => deleteMeal(meal.id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                    </div>
                ))}
            </div> :
                <div>
                    {filteredMeals.map(meal => (
                        <div key={meal.id + 1} className="bg-white shadow-md rounded-md p-2 flex items-center justify-between mb-2">
                            <h2 className="text-xl font-bold">{meal.name}</h2>
                            <div>
                                <button onClick={() => openModal(meal)} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">View/Edit</button>
                                <button onClick={() => deleteMeal(meal.id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            }

            {modalOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    {/* Modal Content */}
                    <div className="relative w-1/4 h-1/2 bg-white p-8 rounded-md">
                        {/* Add Meal Form */}
                        <form>
                            <div className='flex flex-col mb-4'>
                                <label className="mb-1">Meal Name</label>
                                <input className="border border-gray-300 rounded-md p-2" value={mealNameInput} onChange={(event) => setMealNameInput(event.target.value)} />
                            </div>

                            <div className='flex flex-col mb-4'>
                                <label className="mb-1">Ingredients:</label>
                                <ul className="border border-gray-300 rounded-md p-2">
                                    {ingredients.map((ingredient: string, idx: number) => (
                                        <li key={idx} className="flex justify-between items-center">
                                            <span>{ingredient}</span>
                                            <div>
                                                <button type="button" className="text-blue-500 mr-2" onClick={() => {
                                                    setIngredientInput(ingredient);
                                                    setSelectedIngredientIndex(idx);
                                                }}>Edit</button>
                                                <button type="button" className="text-red-500" onClick={() => {
                                                    const updatedIngredients = [...ingredients];
                                                    updatedIngredients.splice(idx, 1);
                                                    setIngredients(updatedIngredients);
                                                }}>Remove</button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex mt-2">
                                    <input className="border border-gray-300 rounded-md p-2 flex-1 mr-2" value={ingredientInput} onChange={(event) => setIngredientInput(event.target.value)} />
                                    <button type="button" className="text-sm h-8 bg-green-500 text-white rounded-md px-4" onClick={() => {
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
                                    }}>{selectedIngredientIndex !== null ? "Edit Ingredient" : "Add Ingredient"}</button>
                                </div>

                            </div>

                            <div className="flex justify-end">
                                <button className='mr-2 bg-blue-500 text-white px-4 py-2 rounded' type="submit" onClick={(event) => {
                                    event.preventDefault();
                                    modalData ? editMeal({
                                        id: modalData.id,
                                        name: mealNameInput,
                                        ingredients: ingredients
                                    }) : addMeal({
                                        id: String(meals.length + 1),
                                        name: mealNameInput,
                                        ingredients: ingredients
                                    });
                                    setIngredients([]);
                                    setIngredientInput("");
                                    setMealNameInput("");
                                }}>{modalData ? "Save Meal" : "Add Meal"}</button>
                                <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={closeModal}>Cancel</button>
                            </div>
                        </form>
                        <button onClick={closeModal} className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white px-2 py-1 rounded">X</button>
                    </div>

                </div>
            )}
            <button onClick={() => openModal()} className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded">Add Meal</button>
        </div>
    );
};

export default SavedMeals;

