import { useContext, useState } from "react"
import styled from "styled-components"
import { ThemeContext } from "../../contexts/theme-context"
import { PlayBgMusic } from "../Sounds"
import { useNavigate } from "react-router-dom"
import { useTransition } from "../../contexts/transition-context"
import { LearnMore } from "../LearnMore"

export const Home = () => {
    const { theme } = useContext(ThemeContext)
    const { setIsAnimating } = useTransition();
    const navigate = useNavigate();
    const [learnMore, setLearnMore] = useState(false)

    const handleNavigation = (path) => {
        setIsAnimating(true);
        navigate(path);
    };

    const closeLearnMore = () => {
        setLearnMore(false)
    }

    return (
        <Container learnmore={learnMore.toString()} onClick={PlayBgMusic} theme={theme}>
            {!learnMore && <>
                <main className="principal">
                    <div className="painels">
                        <div onClick={() => handleNavigation("/cards")}>
                            <Paineis secondClass='cards' title='Cards' />
                        </div>
                        <div onClick={() => handleNavigation("/pokedex")}>
                            <Paineis secondClass='pokedex' title='Pokédex' />
                        </div>
                        <div onClick={() => handleNavigation("/minigame")}>
                            <Paineis secondClass='minigame' title='Minigame' />
                        </div>
                    </div>
                    <div className="logo-container">
                        <img className="pokemon-logo" src="./images/home-images/pokemon-logo.jpg" alt="Logo do pokemon" />
                        <p>Conheça seu pokémon!</p>
                        <button onClick={() => setLearnMore(true)} className="learn-more">Learn More</button>
                    </div>
                </main>
                <div className="image-fundo">
                    <img className="charmander" src="./images/home-images/charmander.jpg" alt="Charmander" />
                    <img className="butterfly" src="./images/home-images/butterfly.jpg" alt="Butterfly" />
                    <img src="./images/home-images/picachu-ash.jpg" alt="imagem de apresentação, Ash e sua equipe" />
                    <img className="squirtle" src="./images/home-images/squirtle.jpg" alt="Squirtle" />
                </div>
            </>}
            {learnMore && <LearnMore onClick={closeLearnMore}/> }
        </Container>
    )
}

const Container = styled.div`
    font-family: 'Gowun Dodum', sans-serif;
    display: flex;
    justify-content: ${({ learnmore }) => learnmore === 'true' ? 'flex-start' : 'center'};
    align-items: center;
    min-height: 100vh;
    position: relative;
    padding-block: 80px 40px;
    background: linear-gradient(145deg, #ffffff, #34495e, #7f8c8d);
    background-size: 300% 300%;
    animation: gradientAnimation 10s ease infinite;

    @keyframes gradientAnimation {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }

    .image-fundo {
        position: relative;
    }

    .squirtle,
    .charmander,
    .butterfly {
        height: 200px;
    }

    .butterfly {
        position: absolute;
        top: 0;
        left: -55px;
    }

    .charmander {
        margin: 0 -25px 20px 0;
    }

    .principal {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-inline: 50px;
    }

    .painels{
        display: flex;
        left: 150px;
        top: 100px;
        gap: 8px;
        position: absolute;
        z-index: 10;
    }

    .painels .btn {
        cursor: pointer;
        line-height: 110px;
        text-align: center;
        width: 110px;
        height: 110px;
        border-radius: 15px;
        color: white;
        background-color: #00000050;
        transition: ease-in-out 0.2s;
        &:hover {
            width: 170px;
            height: 170px;
            line-height: 170px;
        }
    }

    .logo-container {
        padding-top: 100px;
        max-width: 800px;
    }

    .pokemon-logo {
        animation: fadeIn 1.5s ease-in-out;
        margin-bottom: 20px;
        max-width: 70%;
    }

    .learn-more {
    font-family: 'Gowun Dodum', sans-serif;
    font-size: 22px;
    outline: none;
    border: none;
    border-radius: 50px;
    padding: 25px 120px;
    margin-left: 20px;
    cursor: pointer;
    color: #fff;
    background-color: #00000050;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);

    &:hover {
        background-color: #ffffff;
        color: #000;
        transform: scale(1.05);
        box-shadow: 0 6px 10px rgba(0, 0, 0, 0.3);
    }
    &:focus {
        outline: 2px solid #a1a1a1;
        outline-offset: 4px;
    }
    &:active {
        transform: scale(0.95);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
}

    .logo-container p {
        color: #fff;
        margin: 0 0 60px 30px ;
        font-size: 28px;
    }

    .painel {
        position: relative;
        transition: ease-in-out 0.3s;
        &:hover .game-title {
            bottom: 15px;
            display: block;
        }
    }

    .minigame {
        background-image: url(./images/painel-images/painel-minigame.jpg);
        background-size: cover;
    }

    .pokedex {
        background-image: url(./images/painel-images/painel-pokedex.jpg);
        background-size: cover;
    }

    .cards {
        background-image: url(./images/painel-images/painel-cards.jpg);
        background-size: cover;
    }

    .game-title {
        font-size: 28px;
        color:rgb(255, 255, 255);
        display: none;
        width: 115px;
        position: absolute;
        right: -120px;
        transition: ease-in-out 0.2s;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
    }

    @media (max-width: 1650px) {
        .squirtle,
        .charmander,
        .butterfly {
            display: none;
        }
    }

    @media (max-width: 920px) {
        .principal {
            padding-inline: 0;
        }

        .image-fundo {
            display: none;
        }

        .logo-container {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .painels {
            position: static;
        }

        .painel .btn {
            width: 90px;
            height: 90px;
        }

        .pokemon-logo, .logo-container p {
            margin: 0;
        }

        .learn-more {
            margin-left: 0;
            padding: 15px 60px;
        }
    }
`;

const Paineis = ({ secondClass, title }) => {
    return (
        <div className="painel">
            <div className={`btn ${secondClass}`}></div>
            <p className="game-title">{title}</p>
        </div>
    )
}