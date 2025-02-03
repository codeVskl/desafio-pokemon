import styled from "styled-components"

export function PokemonMoves({ moves }) {
    return (
        <Moves>
            <ul>
                {
                    moves.map((move, index) => {
                        return (
                            <li key={index}><p>Mov {index + 1}: <b>{move.move.name}</b></p></li>
                        )
                    })
                }
            </ul>
        </Moves>
    )
};

const Moves = styled.div`
max-height: 79px;
max-width: 243px;
overflow: auto;

&::-webkit-scrollbar {
width: 8px;
background-color: #084035;
}

&::-webkit-scrollbar-thumb {
border-radius: 12px;
background-color: #6fd574;
-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
cursor: grab;

&:active {
cursor:grabbing
}}

&::-webkit-scrollbar-button {
height: 8px;
background-color: #6fd574;
cursor: pointer;
}

h1{
padding: 0 50px 20px 10px;
font-weight: 400;
}

li {
line-height: 25px;
}
`