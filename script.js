const screen = document.querySelector(".screen");
const numKeys = document.querySelectorAll(".num");
numKeys.forEach((key) => key.addEventListener("click", clickNum));

function clickNum(e) {
    if (screen.textContent.length >= 12) return;
    if (screen.textContent == 0) screen.textContent = e.target.textContent;
    else screen.textContent += e.target.textContent;
}

const delKey = document.querySelector(".del");
delKey.addEventListener("click", (e) => {
    const arr = screen.textContent.split("");
    arr.pop();
    screen.textContent = arr.join("");
    if (screen.textContent.length === 0) screen.textContent = 0;
});

const acKey = document.querySelector(".ac");
acKey.addEventListener("click", (e) => (screen.textContent = 0));
