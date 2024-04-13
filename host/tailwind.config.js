const colors = require("tailwindcss/colors");

module.exports = {
    content: ["./src/**/*.{html,ts}"],
    darkMode: "class",
    theme: {
        fontFamily: {
            sans: [
                "Roboto",
                "ui-sans-serif",
                "system-ui",
                "-apple-system",
                "BlinkMacSystemFont",
                "Segoe UI",
                "Helvetica Neue",
                "Arial",
                "Noto Sans",
                "sans-serif",
                "Apple Color Emoji",
                "Segoe UI Emoji",
                "Segoe UI Symbol",
                "Noto Color Emoji",
            ],
        },
        extend: {
            colors: {
                primary: {
                    50: "#fef2f2",
                    100: "#fde6e6",
                    200: "#f9bfc0",
                    300: "#f59999",
                    400: "#ee4d4d",
                    500: "#e60001",
                    600: "#cf0001",
                    700: "#ad0001",
                    800: "#8a0001",
                    900: "#710000",
                },
                secondary: colors.lime,
                accent: colors.yellow,
                danger: {
                    50: "#fef2f2",
                    100: "#fde6e6",
                    200: "#f9bfc0",
                    300: "#f59999",
                    400: "#ee4d4d",
                    500: "#e60001",
                    600: "#cf0001",
                    700: "#ad0001",
                    800: "#8a0001",
                    900: "#710000",
                },
                warning: colors.amber,
                success: colors.lime,
                info: colors.cyan,
                dark: colors.neutral,
            },
            visibility: ["group-hover"],
            screens: {
                'xs': {'min': '360px', 'max': '400px'},
            }
        },

    },
    plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
