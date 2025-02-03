import { createContext, useState, useEffect } from "react";

export const themes = {
    light: {
        bgHeader: '#afdffb',
        bgImg: './images/bg-images/bg-dia.jpg',
        bgColor: '#ffffff80',
        color: '#000000',
    },
    dark: {
        bgHeader: '#101641',
        bgImg: './images/bg-images/bg-noite.jpg',
        bgColor: '#00000080',
        color: '#ffffff',
    }
};

export const ThemeContext = createContext();

const getInitialTheme = () => {
    const storedTheme = {
        bgImg: localStorage.getItem('bgImg'),
        bgColor: localStorage.getItem('bgColor'),
        color: localStorage.getItem('color'),
    };

    if (storedTheme.bgImg && storedTheme.bgColor && storedTheme.color) {
        return {
            bgImg: storedTheme.bgImg,
            bgColor: storedTheme.bgColor,
            color: storedTheme.color,
        };
    }

    return themes.light;
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        localStorage.setItem('bgImg', theme.bgImg);
        localStorage.setItem('bgColor', theme.bgColor);
        localStorage.setItem('color', theme.color);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
