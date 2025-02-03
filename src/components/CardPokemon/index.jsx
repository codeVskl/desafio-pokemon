import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { typeStyles } from "../typeStyles";
import { ClickSound } from "../Sounds";

export const CardPokemon = ({ pokemonName, onCardClick, isModal, quiz }) => {
    const [pokemonData, setPokemonData] = useState(null);
    const [letterNumber, setLetterNumber] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPokemonData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
                );
                setPokemonData(response.data);
            } catch (err) {
                setError("Erro ao carregar os dados do Pokémon.");
            } finally {
                setLoading(false);
            }
        };

        setLetterNumber(1)
        fetchPokemonData();
    }, [pokemonName]);

    const tip = () => {
        if (pokemonData.name.length > letterNumber) setLetterNumber((prev) => prev + 1)
    }

    const handlePokemonName = () => {
        if (pokemonData.name.length === letterNumber) {
            return ''
        } else return '...'
    }

    if (loading) return <h1>Carregando...</h1>;
    if (error) return <h1>{error}</h1>;

    return (
        <Card quiz={quiz} ismodal={isModal} onClick={() => { ClickSound(); onCardClick(pokemonData); }} type={pokemonData.types[0].type.name}>
            <div className="pokemon-name-quiz">
                <h3>
                    {pokemonData.name.toUpperCase().substring(0, letterNumber) + handlePokemonName()}
                </h3>
                    {pokemonData.name.length > letterNumber && <button className="btn-tip" onClick={tip}>Tip</button>}
            </div>
            <div className="card-header">
                <p id="name-pokemon">{pokemonData.name}</p>
                <p>{pokemonData.id.toString().padStart(3, "00")}</p>
            </div>
            <div className="image-container">
                <img className="img-pokemon"
                    src={pokemonData.sprites.other["official-artwork"].front_default}
                    alt={pokemonData.name}
                />
            </div>
            <div className="description">
                {pokemonData.types.map((type, index) => (
                    <TypeTag key={index} type={type.type.name}>
                        {type.type.name}
                    </TypeTag>
                ))}
            </div>
            <div className="stats">
                <div className="stat-item">
                    <span>Altura:</span> <span>{pokemonData.height * 10} cm</span>
                </div>
                <div className="stat-item">
                    <span>Peso:</span> <span>{pokemonData.weight / 10} kg</span>
                </div>
                <div className="stat-item">
                    <span>Experiência Base:</span> <span>{pokemonData.base_experience}</span>
                </div>
            </div>
        </Card>
    );
};

const Card = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 250px;
height: ${({ quiz }) => quiz ? '' : '352px'};
font-size: 16px;
padding: 20px;
border-radius: 12px;
transform: scale${({ ismodal, quiz }) => ismodal ? '(1.8)' : quiz ? '(2)' : '(1)'};
cursor: ${({ quiz }) => quiz ? '' : 'pointer'};
transition: ease-in-out 0.2s;
box-shadow: ${({ quiz }) => quiz ? '' : '28px 20px 36px 0px rgba(0, 0, 0, 0.5)'};
background-size: cover;
${({ type }) => `
background-image: ${typeStyles[type]?.backgroundImage || "none"};
background-color: ${typeStyles[type]?.backgroundColor || "#ccc"};
`}
${({ quiz }) => `
background-image: ${quiz ? 'none' : ''};
background-color: ${quiz ? '#0000' : ''};
`}


&:hover {
transform: scale${({ ismodal, quiz }) => ismodal || quiz ? '' : '(1.1)'};
}

.pokemon-name-quiz {
    display: ${({ quiz }) => quiz ? '' : 'none'};
    position: relative;
    width: 100%;
    text-align: center;
}

.pokemon-name-quiz .btn-tip {
    position: absolute;
    cursor: pointer;
    top: -10px;
    right: 0;
    border: none;
    outline: none;
    background-color: #ffcc01;
    padding: 2px 5px;
    border-radius: 8px;
    transition: transform 0.2s ease;

    &:hover {
            transform: scale(1.05);
            background-color: #ffdd44;
        }
}

.card-header {
display: ${({ quiz }) => quiz ? 'none' : 'flex'};
justify-content: space-between;
width: 100%;
padding-inline: 40px 14px;
margin-block: -6px 7px;
text-transform: capitalize;
}

.image-container {
display: ${({ quiz }) => quiz ? 'none' : 'flex'};
height: 130px;
}

.img-pokemon {
height: 126px;
}

.description {
display: flex;
margin-top: ${({ quiz }) => quiz ? '' : '25px'};
width: 100%;
justify-content: space-evenly;
gap: 5px;
}

.stats {
background-color: #f9f9f982;
padding: 8px;
width: 100%;
border-radius: 8px;
margin-top: 17px;
box-shadow: inset 0px -2px 4px rgba(0, 0, 0, 0.1);
}

.stat-item {
display: flex;
justify-content: space-between;
margin-block: 5px;
}

@media (max-width: 920px) {
    transform: scale${({ ismodal, quiz }) => ismodal ? '(1.5)' : quiz ? '(1.2)' : '(0.9)'};
}

@media (max-width: 620px) {
    &:hover {
        transform: scale${({ quiz }) => quiz ? '' : '(0.9)'};
    }
    transform: scale${({ ismodal, quiz }) => ismodal ? '(1.2)' : quiz ? '(1.1)' : '(0.9)'};
}
`;

const TypeTag = styled.p`
${({ type }) => `
background-color: ${typeStyles[type]?.backgroundColor || "#ccc"};
`}
color: white;
border-radius: 10px;
padding: 4px 8px;
font-weight: bold;
text-transform: capitalize;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`;
