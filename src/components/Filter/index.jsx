import { useEffect } from "react"
import styled from "styled-components"

export const Filter = ({ onClick, pokemonList }) => {

    useEffect(() => {
        const filter = document.getElementById("filter");
        const btnSearch = document.getElementById("search");

        if (pokemonList === true) {
            if (filter && btnSearch) {
                btnSearch.addEventListener('click', function () {
                    const valorFiltro = filter.value.toLowerCase();
                    const itens = document.querySelectorAll('#pokemon-list li ');
                    itens.forEach(item => {
                        if (item.textContent.toLowerCase().indexOf(valorFiltro) > -1) {
                            item.style.display = '';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                });
                filter.addEventListener('keyup', () => {
                    if (filter.value === '') {
                        btnSearch.click()
                    }
                })
            }
        }

        if (filter && btnSearch) {
            const handleKeyDown = (event) => {
                if (event.key === "Enter" && document.activeElement === filter) {
                    btnSearch.click();
                }
            };
            filter.addEventListener("keydown", handleKeyDown);
            return () => {
                filter.removeEventListener("keydown", handleKeyDown);
            };
        }
    }, []);

    return (
        <Container>
            <label htmlFor="filter">
                <input spellCheck="false" className="input" placeholder="Ex: 'bulbasaur', '001' " type="text" name="filter" id="filter" />
                <img className="lupa" src="./images/pokedex-images/lupa.jpg" alt="lupa-search" />
            </label>
            <button onClick={onClick} className="search" id="search">Search</button>
        </Container>
    )
}

const Container = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 22px;
    font-size: 26px;
    color: #000000;


    label {
        position: relative;
    }

    .input{
        border: none;
        outline: none;
        border-radius: 12px;
        margin-left: 15px;
        padding: 4px 16px 4px 35px;
        font-size: 26px;
        background-color: #fff;
        color: #444444;
    }

    .lupa {
        background-color: #ffffff;
        position: absolute;
        left: 0;
        height: 100%;
        cursor: pointer;
        border-radius: 12px;
        padding: 5px 8px;
    }

    .search {
        background-color: #ffffff;
        border-radius: 12px;
        padding: 5px 10px;
        font-size: 22px;
        cursor: pointer;
        margin-left: 15px;
        border: none;
        outline: none;
        transition: ease 0.3s;
        &:hover {
            transform: scale(1.05);
            background-color: #eeeeee;
        }
        &:active {
            transform: scale(0.95);
        }
    }

    @media (max-width: 920px) {
        top: 70px;

        label {
            font-size: 18px;
        }

        label .input {
        width: 210px;
        font-size: 18px;
        }

        .search {
            margin-left: 4px;
        }
    }
`