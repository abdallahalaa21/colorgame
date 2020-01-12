const title = document.getElementById("rgb");
const newGameButton = document.getElementById("new");
const message = document.getElementById("msg");
const difficultBtn = document.querySelectorAll(".btn");
const gameContainer = document.getElementsByClassName("center")[0];
let correctAns,
  difficulty = "easy";

const random = () => Math.floor(Math.random() * 256);
const createColor = () => `rgb(${random()},${random()},${random()})`;

const checkColor = e => {
  const selectedColor = e.target.style.backgroundColor;
  if (selectedColor === correctAns) {
    message.textContent = "correct";
    const divs = document.querySelectorAll(".color");
    divs.forEach(element => {
      element.style.backgroundColor = correctAns;
      element.style.visibility = "visible";
      element.removeEventListener("click", checkColor);
    });
    setTimeout(() => render(), 2000);
    newGameButton.disabled = true;
  } else {
    message.textContent = "wrong try again";
    e.target.style.visibility = "hidden";
  }
};

const difficultchoose = e => {
  if (!e.target.classList.contains("selected")) {
    if (e.target.innerHTML === "easy") {
      e.target.classList.add("selected");
      e.target.nextElementSibling.classList.remove("selected");
      difficulty = "easy";
    } else if (e.target.innerHTML === "hard") {
      e.target.classList.add("selected");
      e.target.previousElementSibling.classList.remove("selected");
      difficulty = "hard";
    }
    render();
  }
};

difficultBtn.forEach(btn => {
  btn.addEventListener("click", difficultchoose);
});

const createElements = level => {
  const chosenColors = [];
  gameContainer.innerHTML = "";
  for (let i = 0; i < level; i++) {
    const div = document.createElement("div");
    div.style.backgroundColor = createColor();
    div.setAttribute("class", "color");
    chosenColors.push(div.style.backgroundColor);
    gameContainer.appendChild(div);
    div.addEventListener("click", checkColor);
  }
  correctAns = chosenColors[Math.floor(Math.random() * 3)];
  title.textContent = correctAns.toUpperCase();
};

const render = () => {
  message.textContent = "";
  newGameButton.disabled = false;
  difficulty === "easy" ? createElements(3) : createElements(6);
};

newGameButton.addEventListener("click", render);
render();
