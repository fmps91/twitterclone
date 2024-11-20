import daisyui from "daisyui";
import daisyUIThemes from "daisyui/src/theming/themes";
/** @type {import('tailwindcss').Config} */
const { colors } = require('tailwindcss/defaultTheme')
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [daisyui],

	daisyui: {
		themes: [
			{	
				light:{
					...daisyUIThemes["light"],
					".btn-twitter": {
						"color":"black",
						"fill":"black"
						
					},
					primary: "rgb(29, 155, 240)",
					secondary: "#a1a1aa"
					
				},
					
			},
			{
				black: {
					...daisyUIThemes["black"],
					".btn-twitter": {
						"color":"white",
						"fill":"white"
						
					},
					
					primary: "rgb(29, 155, 240)",
					secondary: "#a1a1aa",
					
				},
			},
			
		],
	},
};
