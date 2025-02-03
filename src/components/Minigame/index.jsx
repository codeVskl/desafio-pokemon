import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { ThemeContext } from "../../contexts/theme-context"
import { PlayBgMusic } from "../Sounds"
import { PokebolaLogo } from "../PokebolaLogo"
import { CardPokemon } from "../CardPokemon"
import { Pokeball } from "../Pokedex"
import { useTransition } from "../../contexts/transition-context"

export const Minigame = () => {
    const [currentCard, setCurrentCard] = useState(null);
    const [cardInfo, setCardInfo] = useState(null)
    const [vezesJogadas, setVezesJogadas] = useState(0);
    const [cardFliped, setCardFliped] = useState(false);
    const [animationDone, setAnimationDone] = useState(false);
    const [cardExpanded, setCardExpanded] = useState(false);
    const [message, setMessage] = useState('')
    const { theme } = useContext(ThemeContext);
    const { isAnimating, setIsAnimating } = useTransition();

    const flipCard = () => {
        if (!cardFliped) {
            setCardFliped(true);

            setTimeout(() => {
                setCardExpanded(true);
            }, 2000);
        }
    };

    const refreshCard = () => {
        if (cardFliped) {
            setCardFliped(false);
            setCardExpanded(false);

            setTimeout(() => {
                setVezesJogadas((prev) => prev + 1);
            }, 2000);
        }
    };

    const checkCorrectName = () => {
        const whoIsPokemonAudio = document.getElementById('who-is-pokemon')
        const pokemonNameTyped = document.getElementById('pokemon-name')
        const realPokemonName = document.getElementById('name-pokemon')

        if (!cardFliped) {
            if (whoIsPokemonAudio) whoIsPokemonAudio.play()
            setTimeout(() => {
                if (pokemonNameTyped.value.trim().toLowerCase() === realPokemonName.textContent) {
                    setMessage('Congratulations! You are right')
                } else {
                    setMessage('Good luck next time :(')
                }
                if (pokemonNameTyped) pokemonNameTyped.value = ''
            }, 1500);
        }
    }

    useEffect(() => {
        let idPokemon = Math.floor(Math.random() * 151) + 1
        setCardInfo(
            <CardPokemon
                quiz={'true'}
                onCardClick={() => { }}
                pokemonName={idPokemon}
            />
        )
        setCurrentCard(
            <CardPokemon
                onCardClick={() => { }}
                pokemonName={idPokemon}
            />
        );
        setMessage('')
    }, [vezesJogadas]);

    useEffect(() => {
        if (isAnimating) {
            const timer = setTimeout(() => {
                setAnimationDone(true);
                setIsAnimating(false);
            }, 1500);

            return () => clearTimeout(timer);
        } else {
            setAnimationDone(true);
        }
    }, [isAnimating, setIsAnimating]);

    if (!animationDone) {
        return <Pokeball theme={theme}> <img src="./images/logo-pokebola.jpg" alt="pokebola" /> </Pokeball>;
    }

    return (
        <Container onClick={PlayBgMusic} theme={theme}>
            <PokebolaLogo />
            <main className="principal">
                <div className={`card ${cardFliped ? "flip" : ""} ${cardExpanded ? "expanded" : ""}`}>
                    <div className="card-face card-front">
                        {currentCard}
                    </div>
                    <div className="card-face card-back">
                        <img className="img-verso-carta"
                            src="./images/cards/pokemon-card-back.jpg"
                            alt="Verso da carta pokemon"
                        />
                    </div>
                </div>
                <div className="card-info">
                    {cardInfo}
                </div>
            </main>
            <label className="pokemon-name" htmlFor="pokemon-name"> Try:
                <input spellCheck="false" id="pokemon-name" type="text" />
            </label>
            {message && <Message>{message}</Message>}
            <div className="buttons">
                {cardFliped &&
                    <button onClick={refreshCard} className="btn-refresh">
                        Restart
                    </button>
                }
                <button onClick={() => { flipCard(); checkCorrectName() }} className="submit" id="submit" type="submit" >Submit</button>
            </div>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    position: relative;
    padding-block: 80px 40px;
    background-image: url(${({ theme }) => theme.bgImg});
    background-position: center;
    background-size: cover;
    background-attachment: fixed;

    .principal {
        display: flex;
        gap: 150px;
    }

    .card {
        width: 250px;
        height: 352px;
        position: relative;
        perspective: 500px;
        cursor: pointer;
        transition: transform 0.5s ease;
    }

    .card .card-face {
        position: absolute;
        backface-visibility: hidden;
        transition: transform 2s ease
    }

    .card .card-face .img-verso-carta {
        width: 250px;
        height: 352px;
        border-radius: 12px;
    }

    .card .card-back { transform: rotateY(0deg); }
    .card .card-front { transform: rotateY(560deg); }

    .card.flip .card-back { transform: rotateY(-560deg); }
    .card.flip .card-front { transform: rotateY(0deg); }

    .card.expanded {
        transform: scale(1.2); 
    }


    .card-info {
        display: flex;
        align-items: center;
    }

    .pokemon-name{
        color: #ffef00;
        -webkit-text-stroke: 1px #000000;
        font-family: 'Coiny', sans-serif;
        font-size: 33px;
    }

    .pokemon-name input{
        font-size: 26px;
        margin-top: 75px;
        margin-left: 25px;
        padding-inline: 12px;
        border-radius: 12px;
        border: none;
        outline: none;
        background-color: #fff;
        z-index: 1;
    }

    .btn-refresh, .submit {
        padding: 10px 20px;
        font-size: 22px;
        -webkit-text-stroke: 0;
        background-color: #ffcc01;
        border: none;
        border-radius: 8px;
        color: #333;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
        transition: transform 0.2s ease;

        &:hover {
            transform: scale(1.05);
            background-color: #ffdd44;
        }
    }

    .buttons {
        margin-top: 30px;
        gap: 45px;
        display: flex;
    }

    @media (max-width: 920px) {
        padding-block: 60px 10px;

        .pokemon-name {
            font-size: 26px;
        }

        .pokemon-name input {
            margin: 0;
            font-size: 18px;
        }

        .principal {
            flex-direction: column;
            gap: 0;
        }

        .card .card-face .img-verso-carta {
            transform: scale(0.9);
        }

        .card.expanded {
        transform: scale(1); 
    }

        .buttons {
            margin-top: 12px;
            gap: 5px;
        }

        .btn-refresh, .submit {
            font-size: 18px;
        }
    }
`
const Message = styled.div`
    color: #ffef00;
    -webkit-text-stroke: 1px #000000;
    font-family: 'Coiny', sans-serif;
    position: absolute;
    text-align: center;
    top: 150px;
    font-size: 33px;
    margin-top: 15px;

    @media (max-width: 920px) {
        bottom: 450px;
    }
`