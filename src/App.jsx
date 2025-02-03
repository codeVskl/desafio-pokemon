import { createGlobalStyle } from "styled-components"
import { ThemeProvider } from "./contexts/theme-context"
import { AppRoutes } from "./pages/routes"
import { Settings } from "./components/Settings"
import { TransitionProvider } from "./contexts/transition-context"

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider >
        <TransitionProvider>
          <Settings />
          <AppRoutes />
        </TransitionProvider>
      </ThemeProvider >
    </>
  )
}

const GlobalStyle = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
font-family: "Lexend", sans-serif;
}

a {
color: #000000;
text-decoration: none;
}

ul {
list-style-type: none;
}
`

export default App
