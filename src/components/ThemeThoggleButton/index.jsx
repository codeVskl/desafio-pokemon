import { useContext } from "react";
import { ThemeContext, themes } from "../../contexts/theme-context";
import styled from "styled-components";

export const ThemeTogglerButton = () => {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = () => {
        const newTheme = theme === themes.light ? themes.dark : themes.light;
        setTheme(newTheme);
    };

    return (
        <Button theme={theme} onClick={toggleTheme}>
            {theme === themes.light ? "Dark" : "Light"}
        </Button>
    );
};

const Button = styled.div`
background-color: ${({ theme }) => (theme.bgColor || "#fff38c")};
color: ${({ theme }) => (theme.color || "#000")};
padding: 8px 20px;
cursor: pointer;
border-radius: 6px;
text-align: center;
margin-top: 10px;
transition: all 0.3s ease;

&:hover {
background-color: ${({ theme }) => (theme.bgHeader)};
color: ${({ theme }) => (theme.color)};
}
`;
