import { useState, useEffect, useContext } from "react";
import { CardPokemon } from "../CardPokemon";
import styled from "styled-components";
import { ThemeContext } from "../../contexts/theme-context";
import { PokebolaLogo } from "../PokebolaLogo";
import { PlayBgMusic } from "../Sounds";
import { useTransition } from "../../contexts/transition-context";
import { Pokeball } from "../Pokedex";
import { Filter } from "../Filter";

export const CardPokemonList = () => {
    const [pokemonData, setPokemonData] = useState([]);
    const [offset, setOffset] = useState(10);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [animationDone, setAnimationDone] = useState(false);
    const { isAnimating, setIsAnimating } = useTransition();
    const { theme } = useContext(ThemeContext);
    const limit = 10;

    const fetchPokemonName = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return data.name;
    };

    const fetchPokemonList = async (initialLoad = false) => {
        try {
            setLoading(true);
            const currentOffset = initialLoad ? 0 : offset;
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${currentOffset}&limit=${limit}`);
            const data = await response.json();

            const detailedPokemonData = await Promise.all(
                data.results.map((pokemon) => fetchPokemonName(pokemon.url))
            );

            setPokemonData((prev) =>
                initialLoad ? detailedPokemonData : [...prev, ...detailedPokemonData]
            );

            if (!initialLoad) {
                setOffset((prev) => prev + limit);
            }
        } catch (err) {
            setError("Erro ao carregar a lista de Pokémon.");
        } finally {
            setLoading(false);
        }
    };

    const showLessPokemons = () => {
        if (pokemonData.length > limit) {
            setPokemonData((prev) => prev.slice(0, -limit));
            setOffset((prev) => Math.max(0, prev - limit));
        }
    };

    useEffect(() => {
        fetchPokemonList(true);
    }, []);

    const closeModal = () => {
        setSelectedPokemon(null);
    };

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
            {error && <Error>{error}</Error>}
            <PokebolaLogo />
            <Filter pokemonList={true} />
            <main>
                <ul id="pokemon-list" className="card-list">
                    {
                        pokemonData.map((pokemon, index) => {
                            return(
                                <li key={index}>
                                    <CardPokemon
                                        pokemonName={pokemon}
                                        onCardClick={(data) => setSelectedPokemon(data)}
                                    />
                                </li>
                            )
                        })
                    }
                </ul>
            </main>
            <div className="btn-container">
                {!loading && (
                    <>
                        <button onClick={() => fetchPokemonList()}>Mostrar mais</button>
                        <button disabled={pokemonData.length <= limit} onClick={showLessPokemons}>
                            Mostrar menos
                        </button>
                    </>
                )}
            </div>
            {loading && <Loading>Carregando mais Pokémon...</Loading>}
            {selectedPokemon && (
                <Modal onClick={closeModal}>
                    <div onClick={(e) => e.stopPropagation()}>
                        <CardPokemon isModal={'true'} pokemonName={selectedPokemon.name} onCardClick={() => { }} />
                    </div>
                </Modal>
            )}
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

    .card-list {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        max-width: 1450px;
        gap: 50px;
    }

    .btn-container {
        display: flex;
        gap: 10px;
        justify-content: center;
        margin-block: 40px 16px;
    }

    .btn-container button {
        padding: 10px 20px;
        font-size: 18px;
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

        &:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }
    }

    @media (max-width: 920px) {
        padding-top: 120px;

        .card-list {
            gap: 30px;
        }

        .btn-container {
            gap: 8px;
        }

        .btn-container button {
            font-size: 16px;
            padding: 8px 16px;
        }
    }

    @media (max-width: 480px) {
        .card-list {
            gap: 20px;
        }

        .btn-container {
            flex-direction: column;
            gap: 12px;
        }

        .btn-container button {
            font-size: 14px;
            padding: 6px 12px;
        }
    }
`;

const Error = styled.div`
    text-align: center;
    font-size: 1.2rem;
    color: #ff6347;
`;

const Loading = styled.div`
    text-align: center;
    font-size: 1.2rem;
    color: #666;
`;

const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

