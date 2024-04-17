import React, { useEffect, useState } from "react";
import { PlannedMonth, ListItem } from "../types";
import { getMonthName } from "../utils";
import { useNavigate } from "react-router-dom";

export default function Home() {
	const [plannedMonth, setPlannedMonth] = useState<PlannedMonth>({});
	const [plannedMeals, setPlannedMeals] = useState<String[]>([]);
	const [currentMonth, setCurrentMonth] = useState<string>(getMonthName(new Date().getMonth()));
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
			{/* <div
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
			</div> */}
			<div className="flex flex-col my-36 h-full h-full w-1/3">
				<div className="card bg-base-100 shadow-xl w-1/2 h-1/3 border border-black mx-auto my-6">
					<div className="card-body">
						<h2 className="card-title">Upcoming Meals</h2>
						<ul className="w-full">
							{plannedMeals.length > 0 ? (
								plannedMeals.map((meal: String, idx: number) => {
									console.log("ehre1");
									if (idx >= currentDay && idx < currentDay + 7) {
										console.log("here");
										return <li key={idx}>{`${currentMonth} ${idx}: ${meal}`}</li>;
									} else {
										return <p>No upcoming meals!</p>;
									}
								})
							) : (
								<p className="w-max">No upcoming meals!</p>
							)}
						</ul>
					</div>
				</div>
			</div>

			{/* <div
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
							return <li key={idx}>{`${item.name}: ${item.quantity}`}</li>;
						})}
					</ul>
				</div>
			</div> */}
			<div
				className="flex flex-col my-36 h-full h-full w-1/3"
				onClick={event => {
					console.log("clicked");
					navigate("/shopping_list");
				}}
			>
				<div className="card bg-base-100 shadow-xl w-1/2 h-1/3 border border-black mx-auto my-6">
					<div className="card-body">
						<h2 className="card-title">Shopping List</h2>
						<ul>
							{shoppingList.map((item: ListItem, idx: number) => {
								if (idx % 2 === 0) {
									return (
										<li className="flex justify-between bg-gray-200 px-2" key={idx}>
											<span className="w-full">{`${item.name}: `}</span> <span>{`${item.quantity}`}</span>
										</li>
									);
								} else {
									return (
										<li className="flex justify-between bg-gray-300 px-2" key={idx}>
											<span className="w-full">{`${item.name}: `}</span> <span>{`${item.quantity}`}</span>
										</li>
									);
								}
							})}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
