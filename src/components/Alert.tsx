import { type } from "os";
import React from "react";

type Props = {
	title: string;
	description: string;
	styles: string;
	type: string;
};

export default function UpdatePopUp({ title, description, styles, type }: Props) {
	return (
		<div className={`absolute bottom-48 mx-auto w-1/3 left-0 right-0 rounded-md bg-red-50 p-4 z-20 ${styles}`}>
			<div className="flex">
				<div className="flex-shrink-0">
					<svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
				<div className="ml-3">
					<h3 className="text-sm font-medium text-red-800">There was an error with your selection.</h3>
					<div className="mt-2 text-sm text-red-700">
						<ul role="list" className="list-disc space-y-1 pl-5">
							<li>You must select a meal from the list.</li>
							<li>
								If you don't see the meal you're planning on having for dinner that day, please navigate to the Saved Meals page and
								add the new meal with it's ingredients.
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
