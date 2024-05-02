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
		<div className="flex flex-col sm:flex-row h-full w-full container justify-center px-4 sm:px-0 mx-auto">
			{/* <div className="flex flex-col my-36 h-full h-full w-1/3">
				<div className="card bg-base-100 shadow-xl w-1/2 h-1/3 border border-black mx-auto my-6">
					<div className="card-body">
						<h2 className="card-title">Upcoming Meals</h2>
						<ul className="w-full">
							{plannedMeals.length > 0 ? (
								plannedMeals.map((meal: String, idx: number) => {
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
			</div> */}

			<a
				href="#"
				className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-full sm:w-1/3 h-1/2 sm:mr-4 my-6 sm:my-auto mx-auto"
			>
				<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Upcoming Meals</h5>
				{/* <p className="font-normal text-gray-700 dark:text-gray-400">
					Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
				</p> */}
				<ul className="w-full font-normal text-gray-700 dark:text-gray-400">
					{plannedMeals.length > 0 ? (
						plannedMeals.map((meal: String, idx: number) => {
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
			</a>

			<a
				href="#"
				className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-full sm:w-1/3 h-1/2 my-6 sm:my-auto mx-auto"
			>
				<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Shopping List</h5>
				{/* <p className="font-normal text-gray-700 dark:text-gray-400">
					Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
				</p> */}
				<ul className="font-normal text-gray-700 dark:text-gray-400">
					{shoppingList.map((item: ListItem, idx: number) => {
						if (idx % 2 === 0) {
							return (
								<li className="flex justify-between px-2" key={idx}>
									<span className="w-full">{`${item.name}: `}</span> <span>{`${item.quantity}`}</span>
								</li>
							);
						} else {
							return (
								<li className="flex justify-between px-2" key={idx}>
									<span className="w-full">{`${item.name}: `}</span> <span>{`${item.quantity}`}</span>
								</li>
							);
						}
					})}
				</ul>
			</a>

			{/* <div
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
			</div> */}
		</div>
	);
}
