export { };

// Data Types
const calendarData = {
    // Initialize planned meals for the month with empty strings
    1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '', 10: '',
    11: '', 12: '', 13: '', 14: '', 15: '', 16: '', 17: '', 18: '', 19: '', 20: '',
    21: '', 22: '', 23: '', 24: '', 25: '', 26: '', 27: '', 28: '', 29: '', 30: '', 31: '',
}

const shoppingList = [{
    "name": "Chicken",
    "quantity": 2,
}]

const ingredients = [
    { id: 1, name: 'Category 1', foods: ['Food 1', 'Food 2'] },
    { id: 2, name: 'Category 2', foods: ['Food 3', 'Food 4'] },
]


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
                localStorage.setItem(modifier = dataName, JSON.stringify(calendarData));
            }
            break;
        case "ingredients":
            data = localStorage.getItem(dataName);
            if (!data) {
                localStorage.setItem("ingredients", JSON.stringify(ingredients));
            }
            break;
        case "shoppingList":
            data = localStorage.getItem(dataName);
            if (!data) {
                localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
            }
            break;
        default:
            console.log("Error in retrieveLocalData function.");
            break;
    }
    // console.log(data)
    // console.log(JSON.parse(data))
    return JSON.parse(data);
}

export const updateLocalData = (dataName: string, data: any): void => {
    localStorage.setItem(dataName, JSON.stringify(data));
}

