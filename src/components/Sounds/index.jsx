export const PlayBgMusic = () => {
    document.getElementById('bg-music').play()
}

export const ClickSound = () => {
        const clickSound = document.getElementById('click-sound')
        clickSound.currentTime = 0;
        clickSound.play()
}