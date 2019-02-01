let rgbText = document.getElementById("rgb");
let msg = document.getElementById("msg");
let newGameBtn = document.getElementById("new");
let difficultBtn = document.getElementsByClassName("btn");
let color = document.getElementsByClassName("color");
var difficult;
var r, g, b;
var correctAns;

newGameBtn.addEventListener("click", newGame);
Array.from(difficultBtn).forEach(function (element) {
    element.addEventListener("click", difficultchoose);
});

newGame();

function difficultSelected() {
    let difficultSelected = document.getElementById("difficult");
    if (difficultSelected.firstElementChild.classList.contains("selected")) {
        difficult = "easy";
    } else if (difficultSelected.lastElementChild.classList.contains("selected")) {
        difficult = "hard";
    }
}

function newGame() {
    difficultSelected();
    msg.style.display = "none";
    if (difficult === "easy") {
        for (i = 0; i < 3; i++) {
            color[i].addEventListener("click", compareColor);
            color[i].style.backgroundColor = randomColor();
            color[i].style.display = "inline-block";
            color[i].style.visibility = "visible";
            color[i + 3].style.display = "none";
        }
        correctAns = color[Math.floor((Math.random() * 3))].style.backgroundColor;
        rgbText.innerText = correctAns;
    } else {
        for (i = 0; i < 6; i++) {
            color[i].addEventListener("click", compareColor);
            color[i].style.backgroundColor = randomColor();
            color[i].style.display = "inline-block";
            color[i].style.visibility = "visible";
        }
        correctAns = color[Math.floor((Math.random() * 3))].style.backgroundColor;
        rgbText.innerText = correctAns;
    }
}

function difficultchoose(e) {
    if (e.target.innerHTML === "easy") {
        if (!e.target.classList.contains("selected")) {
            e.target.classList.add("selected");
            e.target.nextElementSibling.classList.remove("selected");
        }
        difficult = "easy";
    } else if (e.target.innerHTML === "hard") {
        if (!e.target.classList.contains("selected")) {
            e.target.classList.add("selected");
            e.target.previousElementSibling.classList.remove("selected");
        }
        difficult = "hard";
    }
    newGame();
}

function randomColor() {
    r = Math.floor((Math.random() * 256));
    g = Math.floor((Math.random() * 256));
    b = Math.floor((Math.random() * 256));
    return `rgb(${r},${g},${b})`
}

function compareColor(e) {
    if (e.target.style.backgroundColor == correctAns) {
        msg.innerText = "Correct"
        if (difficult === "easy") {
            for (i = 0; i < 3; i++) {
                color[i].style.backgroundColor = correctAns;
                color[i].style.display = "inline-block";
                color[i].style.visibility = "visible";
            }
        }
        if (difficult === "hard") {
            for (i = 0; i < 6; i++) {
                color[i].style.backgroundColor = correctAns;
                color[i].style.display = "inline-block";
                color[i].style.visibility = "visible";
            }
        }
        setTimeout(newGame, 1500);
    } else {
        msg.innerText = "Try again"
        msg.style.display = "inline-block";
        e.target.style.visibility = "hidden"
    }
    msg.style.display = "inline-block";
}