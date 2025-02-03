import { useContext, useState } from "react"
import { ThemeContext } from "../../contexts/theme-context";
import styled from "styled-components";

export const MuteUnmute = () => {
    const { theme } = useContext(ThemeContext)
    const [ muted, setMuted ] = useState(false)

    function mutarDesmutarMusica() {
        const music = document.getElementById('bg-music') 
        const btnVolume = document.querySelector('.btn-volume')
        music.play()
        if (music.muted === true) {
            music.muted = false
            setMuted(false)
            btnVolume.classList.remove('muted')
        } else {
            music.muted = true
            setMuted(true)
            btnVolume.classList.add('muted')
        }
    }

    return (
        <Button>
            <button className="btn-volume" onClick={() => { mutarDesmutarMusica() }}>
                <p>{muted === false ? "Mute" : "Unmute"}</p>
            </button>
        </Button>
    )
}

const Button = styled.div`
.btn-volume{
font-size: 18px;
width: 100%;
background-color: #fff38c;
color: #000;
padding: 8px 20px;
cursor: pointer;
border-radius: 6px;
text-align: center;
transition: all 0.3s ease;
}
`