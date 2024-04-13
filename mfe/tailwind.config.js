const colors = require("tailwindcss/colors");

module.exports = {
    content: [
        "./src/presentation/features/sportsbook/**/*.{html,ts}",
        "./src/presentation/features/admin/**/*.{html,ts}",
    ],
    darkMode: "class",
    prefix: "sb-",
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
                    50: "rgb(var(--color-primary-50) / <alpha-value>)",
                    100: "rgb(var(--color-primary-100) / <alpha-value>)",
                    200: "rgb(var(--color-primary-200) / <alpha-value>)",
                    300: "rgb(var(--color-primary-300) / <alpha-value>)",
                    400: "rgb(var(--color-primary-400) / <alpha-value>)",
                    500: "rgb(var(--color-primary-500) / <alpha-value>)",
                    600: "rgb(var(--color-primary-600) / <alpha-value>)",
                    700: "rgb(var(--color-primary-700) / <alpha-value>)",
                    800: "rgb(var(--color-primary-800) / <alpha-value>)",
                    900: "rgb(var(--color-primary-900) / <alpha-value>)",
                    950: "rgb(var(--color-primary-950) / <alpha-value>)",
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
                adminPrimary: colors.indigo,
                loading: {
                    light: colors.gray[300],
                    dark: colors.gray[700],
                },
            },
            spacing: {
                "60px": "60px",
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
