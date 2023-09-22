


//hämtar alla element som ska manipuleras och lagrar i variabler
const wrapper = document.querySelector(".wrapper")
const registerButton = document.getElementById("regBtn") // via id
const registerLink = document.querySelector(".register-link") // via classnamn
const wrapperReg = document.querySelector(".wrapper-reg")

const login = document.querySelector(".btn-popup");
const closeButtons = document.querySelectorAll(".close"); // via alla som har detta klassnamn: behöver loopas igenom


// så att knappen går att trycka på
login.addEventListener("click", () => {
    wrapper.classList.add("popup");
    wrapperReg.classList.add("popup")
})

//ändrar vilka klasser som bor på ett element -> visa i webbläsaer hur de tillkommer vid knapptryk
registerLink.addEventListener("click", () => {
    wrapper.classList.add("hidden")
    wrapperReg.classList.remove("hidden")
})

registerButton.addEventListener("click", () => {
    wrapper.classList.remove("hidden")
    wrapperReg.classList.add("hidden")
})

// loopar och tillskriver classnamn för varje element i HTML som har classnamnet ".close"
closeButtons.forEach((element) => {
    element.addEventListener("click", () => {
        wrapper.classList.remove("popup");
        wrapperReg.classList.remove("popup");
    });
});






// Nivå 2 -> förbättra koden genom att använda dig av funktioner

/* 
const wrapper = document.querySelector(".wrapper");
const registerButton = document.getElementById("regBtn");
const registerLink = document.querySelector(".register-link");
const wrapperReg = document.querySelector(".wrapper-reg");

const login = document.querySelector(".btnLogin-popup");
const closeButtons = document.querySelectorAll(".close-button"); // Förtydligande namn

registerLink.addEventListener("click", () => {
    togglePopup(false);
});

registerButton.addEventListener("click", () => {
    togglePopup(true);
});

login.addEventListener("click", () => {
    togglePopup(true);
});

closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        togglePopup(false);
    });
});

function togglePopup(isVisible) {
    wrapper.classList.toggle("popup", isVisible);
    wrapperReg.classList.toggle("popup", isVisible);
    wrapper.classList.toggle("hidden", !isVisible);
    wrapperReg.classList.toggle("hidden", isVisible);
}

*/
