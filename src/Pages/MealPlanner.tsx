import React, { useState } from "react";
import Calendar from "../components/Calendar";
import NewCalendar from "../components/NewCalendar";
import NewCalendar1 from "../components/NewCalendar1";

type Props = {};

export default function MealPlanner({}: Props) {
	return (
		<div className="w-screen h-5/6 p-6">
			{/* <Calendar /> */}
			<NewCalendar />
		</div>
	);
}
