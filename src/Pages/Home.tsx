import React, { useEffect, useState } from "react";
import { PlannedMonth, ListItem } from "../types";
import { getMonthName } from "../utils";
import { useNavigate } from "react-router-dom";

export default function Home() {
	const [plannedMonth, setPlannedMonth] = useState<PlannedMonth>({});
	const [plannedMeals, setPlannedMeals] = useState<String[]>([]);
	const [currentMonth, setCurrentMonth] = useState<string>(
		getMonthName(new Date().getMonth())
	);
	const [currentDay, setCurrentDay] = useState<number>(new Date().getDate());
	const [shoppingList, setShoppingList] = useState<ListItem[]>([]);

	useEffect(() => {
		let savedMeals = localStorage.getItem(currentMonth);
		let list = localStorage.getItem("shoppingList");
		setShoppingList(list ? JSON.parse(list) : []);

		if (savedMeals !== null) {
			savedMeals = JSON.parse(savedMeals);
			let temp: String[] = [];
			for (let i = 1; i <= Object.keys(savedMeals || {}).length; i++) {
				if (typeof savedMeals?.[i] === "string") {
					temp.push(savedMeals?.[i]);
				}
			}
			setPlannedMeals(temp);
		}
	}, []);

	const navigate = useNavigate();

	return (
		<div className="flex h-screen w-screen mx-64">
			<div
				className="flex flex-col my-36 h-full w-1/3"
				onClick={event => {
					console.log("clicked");
					navigate("/meal_planner");
				}}
			>
				<div className="w-1/2 h-1/3 border border-black mx-auto my-6">
					<ul>
						{plannedMeals.map((meal: String, idx: number) => {
							if (idx >= currentDay && idx < currentDay + 7) {
								return (
									<li
										key={idx}
									>{`${currentMonth} ${idx}: ${meal}`}</li>
								);
							}
						})}
					</ul>
				</div>
			</div>
			<div
				className="flex flex-col my-36 h-full w-1/3"
				onClick={event => {
					console.log("clicked");
					navigate("/shopping_list");
				}}
			>
				<div className="w-1/2 h-1/3 border border-black mx-auto my-6">
					Shopping List
					<ul>
						{shoppingList.map((item: ListItem, idx: number) => {
							return (
								<li
									key={idx}
								>{`${item.name}: ${item.quantity}`}</li>
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	);
}
