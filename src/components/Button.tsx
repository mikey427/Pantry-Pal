import React from "react";

type Props = {
	callback: () => void;
	width?: string;
	height?: string;
	text?: string;
	color?: string;
	hoverColor?: string;
	textColor?: string;
};

export default function Button({ callback, width, height, text, color, hoverColor, textColor }: Props) {
	const styles = `${width} ${height} ${color} ${hoverColor} ${textColor}`;
	return (
		<button
			className={`btn bg-accent hover:bg-indigo-800 text-white px-4 py-2 rounded-md mb-4 mr-3 ${styles}`}
			onClick={() => {
				callback();
			}}
		>
			{text}
		</button>
	);
}
