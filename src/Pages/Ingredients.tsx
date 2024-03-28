import React, { useState } from "react";
import IngredientAccordion from "../Components/IngredientAccordion";

type Props = {};

interface IngredientsData {
	[key: string]: string[];
}

export default function Ingredients({}: Props) {
	// const [ingredientCategories, setIngredientCategories] = useState<IngredientsData>({
	//     "proteins": [],
	//     "vegetables": [],
	//     "grains and Starches": [],
	//     "sauces, condiments and seasonings": [],
	//     "dairy": [],
	//     "fruits": []
	// });

	return (
		<div className="w-3/4 flex flex-col mx-auto">
			{/* <h1 className='mt-8 mb-4 w-max text-2xl font-bold'>Ingredients</h1> */}
			<IngredientAccordion />
		</div>
	);
}
