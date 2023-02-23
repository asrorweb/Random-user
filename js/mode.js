const body = document.querySelector("body");
const darkBtn = document.getElementById("dark-btn");
const lightBtn = document.getElementById("light-btn");
let mode = localStorage.getItem("mode");

function toggleBtn() {
    darkBtn.classList.toggle("hidden");
    lightBtn.classList.toggle("hidden");
    body.classList.toggle("dark-mode");
}

if (mode == "dark-mode") {
    toggleBtn();
}

darkBtn.addEventListener("click", () => {
    toggleBtn();
    localStorage.setItem("mode", "dark-mode");
});

lightBtn.addEventListener("click", () => {
    toggleBtn();
    localStorage.setItem("mode", "");
});
