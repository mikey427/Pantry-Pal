export interface PlannedMonth {
    [key: string]: string,
}

export interface Category {
    id: number;
    name: string;
    foods: Food[];
    isOpen?: boolean;
}

export interface Food {
    name: string;
    quantity: number;
}

export interface ListItem {
    name: string;
    quantity: number;
}

export interface Meal {
    id: string;
    name: string;
    ingredients: string[];
}