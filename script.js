//global Id and count variables for todo items
var id = 0;
var totalTodos = 0;

//--------------------------- todo element creation and deletion -----------------------------//
//create new todo item
function createToDo(event) {
    
    //prevent default behaviour of form submition
    event.preventDefault();

    //get value of text from submition and reset it
    var content = document.getElementById('to-do-entry').value
    document.getElementById('to-do-entry').value = "";

    if(content == "") { return; }

    //html for new todo item
    var html = '<article class="to-do-item active" id="' + id.toString() + '"><div class="text"><button class="to-do-check-button" id="button-1" onclick="checkOff(\'' + id.toString() + '\')"><img src="images/icon-check.svg" alt="" id="check-' + id.toString() + '"></button><h4>' + content + '</h4></div><img src="images/icon-cross.svg" alt="" class= "delete" id="delete-' + id.toString() + '" onclick="deleteToDo(\'' + id.toString() + '\')"></article>'

    //insert that html
    document.getElementById("nav").insertAdjacentHTML('beforebegin', html);

    //increment the id
    id += 1;
    totalTodos += 1;
    itemNumberUpdate();
} 

//event listener for form submition -> fires createToDo
var form = document.getElementById("form");
form.addEventListener('submit', createToDo);


//delete a to do
function deleteToDo(item) {
    var todo = document.getElementById(item);
    todo.remove();
    totalTodos -= 1;
    itemNumberUpdate();
}

//update number of items
function itemNumberUpdate() {
    document.getElementById("items-left-number").innerText = totalTodos.toString();
}


//--------------------------- checking and unchecking todo elements -------------------------------//
//toggle checked status of any todo
function checkOff(todo) {
    var element = document.getElementById(todo).classList
    
    element.toggle("checked");
    element.toggle("active")
}


//------------------------------ showing and hiding todo elements -----------------------------------//
//hide
function hide(selected) {
    var elements = document.getElementsByClassName(selected);

    Array.from(elements).forEach(element => {
        element.style.display = "none";
    });
}

//show
function show(selected) {
    var elements = document.getElementsByClassName(selected);

    Array.from(elements).forEach(element => {
        element.style.display = "flex";
    });
}

//show all
function showAll() {
    var elements = document.getElementsByClassName("to-do-item");

    Array.from(elements).forEach(element => {
        element.style.display = "flex";
    });
}

//show only selected
function showSelected(shown, hidden) {
    hide(hidden);
    show(shown);
}


//----------------------------- changing light and dark themes ---------------------------------------//

function changeColors() {
    var status = document.getElementById("theme-icon").src;
    
    
    if(status.includes("sun")) {
        document.getElementById("theme-icon").src = "images/icon-moon.svg";

        document.documentElement.style.setProperty('--background-color', 'hsl(0, 0%, 98%)');
        document.documentElement.style.setProperty('--todo-background-color', '#fff');
        document.documentElement.style.setProperty('--title-color', 'hsl(0, 0%, 98%)');

        document.documentElement.style.setProperty('--text-color', 'hsl(236, 9%, 61%)');
    }
}