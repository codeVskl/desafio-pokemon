import { MuteUnmute } from "../MuteUnmute"
import { ThemeTogglerButton } from "../ThemeThoggleButton"
import { slide as Menu } from 'react-burger-menu';
import styled from "styled-components";

export const Settings = () => {
    return (
        <StyledMenu>
            <Menu
                width={250}
                right
                customBurgerIcon={<Image src="./images/settings.jpg" alt="settings" />}
            >
                <MuteUnmute />
                <ThemeTogglerButton />
            </Menu>
        </StyledMenu>
    )
}

const StyledMenu = styled.div`
.bm-burger-button {
position: fixed;
width: 40px;
height: 40px;
right: 25px;
top: 25px;
}

.bm-burger-bars-hover {
background: #a90000;
}

.bm-cross-button {
height: 24px;
width: 24px;
}

.bm-cross {
background: #bdc3c7;
}

.bm-menu-wrap {
position: fixed;
height: 100%;
}

.bm-menu {
height: 220px !important;
border-bottom-left-radius: 20px;
background: #373a47;
padding: 35px 10px;
font-size: 1.15em;
}

.bm-morph-shape {
fill: #373a47;
}

.bm-item-list {
color: #b8b7ad;
padding: 0.8em;
}

.bm-item {
display: inline-block;
}

.bm-overlay {
background: rgba(0, 0, 0, 0.3);
}
`

const Image = styled.img`
border-radius: 50%;
`
