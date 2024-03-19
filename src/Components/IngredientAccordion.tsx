import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { retrieveLocalData, updateLocalData } from '../utils';

type Props = {};

interface Category {
    id: number;
    name: string;
    foods: string[];
    isOpen?: boolean;
}

export default function IngredientAccordion({ }: Props) {
    const [categories, setCategories] = useState<Category[]>([
        { id: 1, name: 'Category 1', foods: ['Food 1', 'Food 2'] },
        { id: 2, name: 'Category 2', foods: ['Food 3', 'Food 4'] },
        // Add more categories as needed
    ]);
    const [input, setInput] = useState("");
    const [selected, setSelected] = useState("");


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
        setCategories(categories.map(category => {
            if (category.id === categoryId) {
                return { ...category, isOpen: !category.isOpen };
            }
            return category;
        }));
    };

    const handleFoodEdit = (event: any, categoryIndex: number, food: string): void => {
        let temp: Category[] = [...categories]
        let index: number = categories[categoryIndex].foods.indexOf(food);
        temp[categoryIndex].foods[index] = input;
        setCategories([...temp]);
        setInput("");
        updateLocalData("ingredients", categories);
    }

    const handleCategoryEdit = (event: any, categoryIndex: number): void => {
        event.preventDefault();
        event.stopPropagation();
        let temp: Category[] = [...categories];
        temp[categoryIndex].name = input;
        let temp1: string = selected;
        temp1 = "";
        setCategories([...temp]);
        setInput("");
        setSelected("");
        updateLocalData("ingredients", categories);
    }

    const handleAddFood = (categoryIndex: number): void => {
        let temp: Category[] = [...categories];
        temp[categoryIndex].foods.push("New Food"); // Add your default food item here
        setCategories([...temp]);
        updateLocalData("ingredients", categories);
    }

    const handleDeleteCategory = (categoryId: number): void => {
        let temp: Category[] = categories;
        temp = temp.filter(category => category.id !== categoryId);
        setCategories(temp);
        updateLocalData("ingredients", categories);
    }

    const handleDeleteFood = (categoryIndex: number, foodIndex: number): void => {
        let temp: Category[] = [...categories];
        temp[categoryIndex].foods.splice(foodIndex, 1);
        setCategories([...temp]);
        updateLocalData("ingredients", categories);
    }

    useEffect(() => {
        setCategories(retrieveLocalData("ingredients"));
    }, [])

    return (
        <div className="w-full mt-24">
            <div className='flex justify-between'>
                <div className='flex'>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 mr-3"
                        onClick={() => {
                            setCategories(categories.map(category => ({ ...category, isOpen: true })))
                        }}
                    >
                        Expand All
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md mb-4 mr-3"
                        onClick={() => {
                            setCategories(categories.map(category => ({ ...category, isOpen: false })))
                        }}
                    >
                        Collapse All
                    </button>
                </div>
                <div><h1 className='w-max text-2xl font-bold'>Ingredients</h1></div>
                <div className='flex'>
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded-md mb-4 mr-3"
                        onClick={() => {
                            console.log(categories[0]);
                            let temp: Category;
                            if (!categories[0]) {
                                temp = { id: 1, name: 'Category ' + "1", foods: ['Food 1', 'Food 2'] }

                            } else {
                                temp = { id: categories[categories.length - 1].id + 1, name: 'Category ' + (categories[categories.length - 1].id + 1), foods: ['Food 1', 'Food 2'] }
                            }
                            setCategories([...categories, temp]);
                            updateLocalData("ingredients", categories);
                        }}
                    >
                        Create new Category
                    </button>
                    <button
                        className="text-white px-4 py-2 rounded-md mb-4 mr-3 bg-blue-500"
                        onClick={() => {
                            updateLocalData("ingredients", categories);
                        }}
                    >
                        Save Data
                    </button>
                </div>
            </div>


            {
                categories.map((category, categoryIndex) => (
                    <div key={category.id} className="border border-gray-200 rounded-md mb-4">
                        <div
                            className="flex items-center justify-between bg-gray-100 text-gray-700 px-4 py-2 w-full"
                            onClick={() => toggleAccordion(category.id)}
                        >
                            <div>
                                <span onClick={(event) => {
                                    event.stopPropagation();
                                    setInput(category.name);
                                    setSelected(category.name);
                                }}>{category.name}
                                    {selected === category.name ? <form><input placeholder='test' value={input} autoFocus onChange={(event) => {
                                        setInput(event.target.value);
                                    }}></input>
                                        <button type="submit" className='w-4 h-4 bg-green-400' onClick={(event) => {
                                            handleCategoryEdit(event, categoryIndex);
                                        }}></button></form> : <form style={{ display: 'none' }}></form>}</span></div>
                            <div className='flex items-center' >

                                {category.isOpen ? <
                                    button className="bg-blue-500 text-white rounded-md my-auto mr-1 w-6 h-6 align-middle font-bold" onClick={(event) => {
                                        event.stopPropagation();
                                        handleAddFood(categoryIndex);
                                    }}>
                                    +
                                </button> : null}
                                <button className="bg-red-500 text-white px-2 py-1 rounded-md my-auto text-xs w-6 h-6 font-bold" onClick={(event) => {
                                    event.stopPropagation();
                                    handleDeleteCategory(category.id);
                                }}>
                                    X
                                </button>
                                <svg
                                    className={`w-4 h-4 ${category.isOpen ? 'transform rotate-180' : ''}`}
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
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
                                <ul>
                                    {category.foods.map((food, foodIndex) => (
                                        <li key={food} className="text-gray-600 flex justify-between my-1 align-middle" onClick={(event) => {
                                            console.log('food', food)
                                            setInput(food);
                                            setSelected(food);
                                        }}><span className='my-auto'>{food}</span>
                                            {selected === food ? <form><input placeholder='test' value={input} autoFocus onChange={(event) => {
                                                setInput(event.target.value);
                                            }}></input>
                                                <button type="submit" className='w-4 h-4 bg-green-400' onClick={(event) => {
                                                    handleFoodEdit(event, categoryIndex, food);
                                                }}></button></form> : <form style={{ display: 'none' }}></form>}
                                            <button className="bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold" onClick={(event) => {
                                                event.stopPropagation();
                                                handleDeleteFood(categoryIndex, foodIndex);
                                            }}>
                                                X
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                {/* Add input fields here for editing category name and foods */}
                            </div>
                        )}
                    </div>
                ))
            }
        </div >
    );
};
