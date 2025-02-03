import { Link } from "react-router-dom"
import styled from "styled-components"

export const PokebolaLogo = () => {
    return (
        <Link to={'/'}>
            <Image src="./images/logo-pokebola.jpg" alt="logo do site" />
        </Link>
    )
}

const Image = styled.img`
position: absolute;
top: 15px;
left: 15px;
border-radius: 50%;
height: 52px;
transition: ease-in-out 0.3s;

&:hover {
opacity: 0.8;
}
`