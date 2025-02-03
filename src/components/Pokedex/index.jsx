import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ThemeContext } from "../../contexts/theme-context";
import { PokebolaLogo } from "../PokebolaLogo";
import axios from "axios";
import { Filter } from "../Filter";
import { PlayBgMusic } from "../Sounds";
import { useTransition } from "../../contexts/transition-context";
import { PokemonMoves } from "../PokemonMoves";

export const Pokedex = () => {
    const [pokemonData, setPokemonData] = useState({
        name: '',
        id: 0,
        weight: 0,
        height: 0,
        img: '',
        backImg: '',
        staticImg: '',
        backStaticImg: '',
        moves: [],
    });
    const [pokemonCostas, setPokemonCostas] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPokemonId, setCurrentPokemonId] = useState(1);
    const [animationDone, setAnimationDone] = useState(false);
    const { theme } = useContext(ThemeContext);
    const { isAnimating, setIsAnimating } = useTransition();

    const fetchPokemonData = async (idPokemon = 1) => {
        try {
            setLoading(true);
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);
            const data = response.data;

            setPokemonData({
                name: data.name,
                id: data.id,
                weight: data.weight,
                height: data.height,
                img: data.sprites.other["showdown"].front_default,
                backImg: data.sprites.other["showdown"].back_default,
                staticImg: data.sprites.front_default,
                backStaticImg: data.sprites.back_default,
                moves: data.moves,
            });
            setCurrentPokemonId(data.id);
        } catch (err) {
            setError("Erro ao carregar os dados do Pokémon.");
        } finally {
            setLoading(false);
        }
    };

    const fetchFilterValue = () => {
        const filter = document.getElementById('filter');
        let filterValue = filter.value.trim().replace(/^0+/, "").toLowerCase();

        setError(null);
        if (filterValue === '') {
            return 1;
        } else {
            return filterValue;
        }
    };

    const handleArrowKeys = (event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            setPokemonCostas((prev) => !prev);
        }
        if (event.key === "ArrowUp") {
            setCurrentPokemonId((prevId) => Math.min(prevId + 1, 1010));
        }
        if (event.key === "ArrowDown") {
            setCurrentPokemonId((prevId) => Math.max(prevId - 1, 1));
        }
    };

    useEffect(() => {
        fetchPokemonData(currentPokemonId);
    }, [currentPokemonId]);

    useEffect(() => {
        document.addEventListener("keyup", handleArrowKeys);
        return () => document.removeEventListener("keyup", handleArrowKeys);
    }, []);

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
        return <Pokeball theme={theme} > <img src="./images/logo-pokebola.jpg" alt="pokebola" /> </Pokeball>;
    }


    return (
        <Container onClick={PlayBgMusic} theme={theme}>
            <PokebolaLogo />
            <Filter onClick={() => fetchPokemonData(fetchFilterValue())} />
            <div className="pokedex">
                <div className="botoes">
                    <button className="btn up" onClick={() => setCurrentPokemonId((prev) => Math.min(prev + 1, 1010))}></button>
                    <div>
                        <button className="btn left" onClick={() => setPokemonCostas((prev) => !prev)}></button>
                        <button className="btn right" onClick={() => setPokemonCostas((prev) => !prev)}></button>
                    </div>
                    <button className="btn down" onClick={() => setCurrentPokemonId((prev) => Math.max(prev - 1, 1))}></button>
                </div>
                <div className="img-container">
                    {error && <Error>{error}</Error>}
                    {!error && !pokemonCostas && (
                        <img className="img-pokemon" src={pokemonData.img || pokemonData.staticImg} alt={pokemonData.name} />
                    )}
                    {!error && pokemonCostas && (
                        <img className="img-pokemon" src={pokemonData.backImg || pokemonData.backStaticImg} alt={pokemonData.name} />
                    )}
                    {loading && <Loading>Carregando...</Loading>}
                </div>
                <div className="informacoes">
                    <div className="main-info">
                        <div className="height" >{pokemonData.height * 10} Cm </div>
                        <div className="weight" >{pokemonData.weight / 10} Kg </div>
                    </div>
                    <div className="moves">
                        <PokemonMoves moves={pokemonData.moves} />
                    </div>
                </div>
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

.pokedex {
position: relative;
min-height: 559px;
min-width: 735px;
font-family: 'Jersey 15', sans-serif;
font-size: 24px;
background-image: url(./images/pokedex-images/pokedex.jpg);
background-position: center;
background-repeat: no-repeat;
}

.botoes {
left: 258px;
bottom: 85px;
position: absolute;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
}

.botoes div{
display: flex;
width: 74px;
justify-content: space-between;
}

.botoes .btn {
cursor: pointer;
height: 24px;
width: 24px;
opacity: 0.2;

&:active {
background-color: black;
}
}

.img-container {
display: flex;
align-items: center;
justify-content: center;
position: absolute;
left: 90px;
top: 184px;
padding: 5px;
height: 150px;
width: 222px;
background-color: #bbbbbb;
}

.img-pokemon{
min-height: 120px;
max-height: 146px;
max-width: 210px;
}

.informacoes {
    color: #6fd574;
}

.main-info {
    display: flex;
    position: absolute;
    right: 65px;
    bottom: 75px;
}

.main-info div {
    margin-left: 25px;
    width: 96px;
}

.moves {
    position: absolute;
    left: 445px;
    top: 200px;
    width: 219px;
}

    @media (max-width: 920px) {
    padding-block: 80px 0px;

        .pokedex {
            min-width: 320px;
            background-image: url(./images/pokedex-images/pokedex-mobile.jpg);
        }

        .img-container{
            left: 50px;
            top: 193px;
            height: 129px;
            width: 192px;
        }

        .botoes{
            left: 195px;
            bottom: 116px;
        }

        .botoes div{
            width: 63px;
        }

        .botoes .btn {
        height: 21px;
        width: 21px;
        }

        .informacoes {
            display: none;
        }

        .search {
            margin-left: 8px;
            font-size: 18px;
        }
    }

`

export const Pokeball = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(145deg, #ffffff, #34495e, #7f8c8d);
    z-index: 1000;
    
    &::after {
        position: fixed;
        content: '';
        z-index: -5;
        background-color: ${({ theme }) => theme.color === '#000000' ? '#b0e46c' : '#486f80'};
        border-radius: 50%; 
        animation: appear-disappear 1.5s ease-in-out;
    }

    img {
        animation: pokeball-animation 1.5s ease-in-out;
    }

    @keyframes appear-disappear {
        0%,100% { width: 0px; height: 0px; }
        50% { width: 2300px; height: 2300px; }
    }

    @keyframes pokeball-animation {
        0%, 100% { width: 0; height: 0; }
        30%, 70% { width: 320px; height: 320px; }
    }

    @keyframes gradientAnimation {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
`;

const Error = styled.div`
text-align: center;
font-size: 1.2rem;
color: #ff6347;
`;

const Loading = styled.div`
position: fixed;
text-align: center;
font-size: 1.2rem;
font-weight: bold;
`;