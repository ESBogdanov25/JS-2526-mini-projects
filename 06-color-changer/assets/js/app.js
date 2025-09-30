const color = document.getElementById("color-picker");
const text = document.getElementById("current-color");


color.addEventListener('input', () => {
    document.body.style.backgroundColor = color.value;
    text.innerText = `Current Color: ${color.value}`;
});

function randomColor() {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    document.body.style.backgroundColor = "#" + randomColor;
    text.innerText = `Current Color: #${randomColor}`;
}