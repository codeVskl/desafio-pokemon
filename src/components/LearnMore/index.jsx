import styled from "styled-components"

export const LearnMore = ({ onClick }) => {
    return (
        <>
            <Close className="close">
                <Cross onClick={onClick}></Cross>
            </Close>
            <Informacoes>
                <p>
                    Pokémon é uma franquia de mídia japonesa criada por Satoshi Tajiri e desenvolvida pela Nintendo, Game Freak, e Creatures Inc. O termo "Pokémon" é uma abreviação de "Pocket Monsters" (Monstros de Bolso).
                </p>
                <p>
                    No universo de Pokémon, as criaturas chamadas Pokémon coexistem com os humanos. Esses seres possuem habilidades especiais, variadas aparências e personalidades únicas. Os humanos, conhecidos como Treinadores Pokémon, podem capturá-los, treiná-los e colocá-los em batalhas para testar suas estratégias e força.
                </p>
                <p>
                    A franquia começou como uma série de jogos de videogame em 1996 para o Game Boy e rapidamente se expandiu para incluir:
                </p>

                <ul>
                    <li>
                        <p>
                            Anime: Uma série animada que segue as aventuras de Ash Ketchum e seu parceiro Pikachu.
                        </p>
                    </li>
                    <li>
                        <p>
                            Filmes: Longas-metragens baseados no universo Pokémon.
                        </p>
                    </li>
                    <li>
                        <p>
                            Cartas colecionáveis: Um jogo estratégico que desafia os jogadores a usar cartas representando Pokémon em batalhas.
                        </p>
                    </li>
                    <li>
                        <p>
                            Brinquedos e produtos licenciados: Desde pelúcias até acessórios escolares.
                        </p>
                    </li>
                    <li>
                        <p>
                            Jogos móveis: Como o famoso Pokémon GO, que usa realidade aumentada.
                        </p>
                    </li>
                </ul>
                <p>
                    O tema central de Pokémon envolve amizade, exploração, aprendizado e superação de desafios, com a famosa    missão de "pegar todos" os Pokémon disponíveis. A franquia é uma das mais bem-sucedidas globalmente, sendo adorada por crianças e adultos em todo o mundo.
                </p>
            </Informacoes >
        </>
    )
}

const Informacoes = styled.div`
    padding-inline: 35px;
    font-size: 33px;
    max-width: 75%;

    p {
        padding-inline: 15px;
        margin-bottom: 15px;
    }

    ul {
        padding: 25px;
        border-radius: 12px;
        background-color: #fff2;
    }

    @media (max-width: 920px) {
        padding-inline: 30px;
        font-size: 28px;
        max-width: 85%;

        ul {
        padding: 12px;
        border-radius: 8px;
    }
    }

    @media (max-width: 620px) {
        padding-inline: 8px;
        font-size: 20px;
        max-width: 95%;
    }
`

const Close = styled.div`
    position: absolute;
    top: 25px;
    left: 25px;
`

const Cross = styled.div`
    position: relative;
    display: block;
    width: 45px;
    height: 40px;
    padding-top: 13px;
    cursor: pointer;
    transition: 0.5s ease-in-out;
    &::after, &::before{
        background-color: #eee;
        content:"";
        display: block;
        width: 45px;
        height: 2px;
        position: absolute;
        transition: 0.2s ease-in-out;
    }
    &::after{
        transform: rotate(45deg);
    }
    &::before {
        transform: rotate(-45deg);
    }
`