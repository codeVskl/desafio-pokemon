import { MuteUnmute } from "../MuteUnmute"
import { ThemeTogglerButton } from "../ThemeThoggleButton"
import { slide as Menu } from 'react-burger-menu';
import './style.css'
import styled from "styled-components";

export const Settings = () => {
    return (
        <Menu
        width={250}
        right
        customBurgerIcon={<Image src="./images/settings.jpg" alt="settings" />}
        >
            <MuteUnmute />
            <ThemeTogglerButton />
        </Menu>
    )
}

const Image = styled.img`
border-radius: 50%;
`
