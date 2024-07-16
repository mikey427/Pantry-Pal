import React, { useState } from "react";
import Calendar from "../components/Calendar";
import NewCalendar from "../components/NewCalendar";

type Props = {};

export default function MealPlanner({}: Props) {
	return (
		<div className="w-screen h-min p-6">
			<NewCalendar />
		</div>
	);
}
