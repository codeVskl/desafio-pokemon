import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Cards } from "./cardsPokemon";
import { HomePage } from "./homePage";
import { PokedexPage } from "./PokedexPage";
import { MinigamePage } from "./minigamePage";


export const AppRoutes = () => (
    <BrowserRouter basename="/desafio-pokemon/">
        <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/cards" element={<Cards />} />
            <Route exact path="/pokedex" element={<PokedexPage />} />
            <Route exact path="/minigame" element={<MinigamePage />} />
        </Routes>
    </BrowserRouter>
)
