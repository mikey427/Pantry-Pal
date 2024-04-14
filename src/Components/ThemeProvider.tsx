import React, { createContext, useState, useContext } from "react";

// Create a context for the theme
const ThemeContext = createContext({ theme: "light", toggleTheme: () => {} });

// Create a provider component for the theme context
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [theme, setTheme] = useState("light");

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		document.querySelector("html")!.setAttribute("data-theme", newTheme);
		// console.log("newTheme: ", newTheme);
		console.log(document.querySelector("html")?.getAttribute("data-theme"));
		setTheme(newTheme);
	};

	return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

// Create a hook to use the theme context
export const useTheme = () => useContext(ThemeContext);
