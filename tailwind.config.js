/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#1A2130",
				primaryLight: "#5A72A0",
				accent: "#83B4FF",
				accentLight: "#FDFFE2",
				purple: "#4f46e6",
				experi: "#ED6A5A"
				// accentDark: "" LEFT OFF HERE RECOLORING APP COLORS NOT FINALIZED MAYBE USE CALENDAR COLORS FOR REST OF THE APP OR CHANGE COLORS ALTOGHETHER
			}
		}
	},
	plugins: [require("daisyui"), require("@tailwindcss/forms")],

	// daisyUI config (optional - here are the default values)
	daisyui: {
		themes: true, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
		darkTheme: "dark", // name of one of the included themes for dark mode
		// base: true, // applies background color and foreground color for root element by default
		styled: true, // include daisyUI colors and design decisions for all components
		utils: true, // adds responsive and modifier utility classes
		prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
		logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
		themeRoot: ":root" // The element that receives theme color CSS variables
	}
};
