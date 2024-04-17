import React, { useState } from "react";
import Calendar from "../components/Calendar";

type Props = {};

export default function MealPlanner({}: Props) {
	return (
		<div>
			<Calendar />
		</div>
	);
}
