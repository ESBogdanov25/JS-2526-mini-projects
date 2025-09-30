let input = document.getElementById("todo-input");
let todoArray = [];

window.addEventListener('DOMContentLoaded', () => {
    const savedTodos = localStorage.getItem('todos');

    if (savedTodos) 
        {
        todoArray = JSON.parse(savedTodos);
        displayTodo();
    }
});

function displayTodo() 
{
    let htmlText = ``;

    for (let i = 0; i < todoArray.length; i++) 
    {
        htmlText += `
        <div class="todo-style">
            <p>${todoArray[i]}</p>
            <button onclick="deleteTodo(${i})">Delete</button>
        </div>
        `;
    }

    document.getElementById("todo-list").innerHTML = htmlText;
    localStorage.setItem('todos', JSON.stringify(todoArray));
}

function deleteTodo(index) 
{
    todoArray.splice(index, 1);
    displayTodo();
}

function addTodo() 
{
    if (input.value.trim() === "") return;

    todoArray.push(input.value.trim());
    input.value = "";

    displayTodo();
}