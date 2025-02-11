const soundCards = document.querySelectorAll(".sound-card");
const sounds = {
    summer: document.getElementById("summer"),
    rain: document.getElementById("rain"),
    winter: document.getElementById("winter")
};


const backgrounds = {
    summer: "./assets/summer-bg.jpg",
    rain: "./assets/rainy-bg.jpg",
    winter: "./assets/winter-bg.jpg"
};

soundCards.forEach(card => {
    card.addEventListener("click", () => {
        const soundType = card.dataset.sound;
        const sound = sounds[soundType];

        if (sound.paused) {
            
            Object.values(sounds).forEach(audio => audio.pause());
            
            
            document.body.style.background = `url('${backgrounds[soundType]}') no-repeat center center/cover`;

            
            sound.play();
        } else {
            sound.pause();
        }
    });
});

