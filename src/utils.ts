import SavedMeals from "./Pages/SavedMeals";

export {};

// Data Types
const calendarData = {
	// Initialize planned meals for the month with empty strings
	1: "",
	2: "",
	3: "",
	4: "",
	5: "",
	6: "",
	7: "",
	8: "",
	9: "",
	10: "",
	11: "",
	12: "",
	13: "",
	14: "",
	15: "",
	16: "",
	17: "",
	18: "",
	19: "",
	20: "",
	21: "",
	22: "",
	23: "",
	24: "",
	25: "",
	26: "",
	27: "",
	28: "",
	29: "",
	30: "",
	31: ""
};

const shoppingList = [
	{
		name: "Chicken",
		quantity: 2
	}
];

const ingredients = [
	{
		id: 1,
		name: "Category 1",
		foods: [
			{
				name: "Food 1",
				quantity: 1
			},
			{
				name: "Food 2",
				quantity: 2
			}
		]
	},
	{
		id: 2,
		name: "Category 2",
		foods: [
			{
				name: "Food 3",
				quantity: 3
			},
			{
				name: "Food 4",
				quantity: 4
			}
		]
	}
];

const savedMeals = [
	{
		id: "1",
		name: "Meal 1",
		ingredients: ["Chicken", "Ketchup"]
	}
];

export const getMonthName = (index: number) => {
	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	];
	return monthNames[index];
};

export const retrieveLocalData = (dataName: string, modifier?: string): any => {
	// console.log(dataName, modifier)
	let data: any;

	switch (dataName) {
		case "calendarData":
			// console.log("here");
			if (!modifier) {
				return;
			}
			data = localStorage.getItem(modifier);
			// console.log(data)
			if (!data) {
				// console.log("in if")
				localStorage.setItem(
					(modifier = dataName),
					JSON.stringify(calendarData)
				);
			}
			break;
		case "ingredients":
			data = localStorage.getItem(dataName);
			if (!data) {
				localStorage.setItem(
					"ingredients",
					JSON.stringify(ingredients)
				);
			}
			break;
		case "shoppingList":
			data = localStorage.getItem(dataName);
			if (!data) {
				localStorage.setItem(
					"shoppingList",
					JSON.stringify(shoppingList)
				);
			}
			break;
		case "savedMeals":
			data = localStorage.getItem(dataName);
			if (!data) {
				localStorage.setItem("savedMeals", JSON.stringify(savedMeals));
			}
			break;
		default:
			console.log("Error in retrieveLocalData function.");
			break;
	}
	// console.log(data)
	// console.log(JSON.parse(data))
	// console.log("Retrieved data:", data);
	if (!data) {
		return null; // or any other default value
	}
	return JSON.parse(data);
};

export const updateLocalData = (dataName: string, data: any): void => {
	localStorage.setItem(dataName, JSON.stringify(data));
};
