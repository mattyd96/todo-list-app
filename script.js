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

    if (content == "") { return; }

    //html for new todo item
    var html = '<article class="to-do-item active" id="' + id.toString() + '" draggable="true" ondragenter="dragEnter(event, this)" ondragover="dragOver(event, this)" ondragleave="dragLeave(event, this)" ondrop="drop(event, this)"><div class="text"><button class="to-do-check-button" id="button-1" onclick="checkOff(\'' + id.toString() + '\')"><img src="images/icon-check.svg" alt="" id="check-' + id.toString() + '"></button><h4>' + content + '</h4></div><img src="images/icon-cross.svg" alt="" class= "delete" id="delete-' + id.toString() + '" onclick="deleteToDo(\'' + id.toString() + '\')"></article>'

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

//highlight helper function
function highlightHelper(element) {
    var navs = document.getElementsByClassName("hide-show");
    Array.from(navs).forEach(nav => {
        var nodes = nav.children;
        Array.from(nodes).forEach(node => {
            node.style.color = "var(--nav-text-color)";
        });

        nodes[element].style.color = "hsl(220, 98%, 61%)";
    });
}

//highlight selected option
function highlight(option) {
    switch (option) {
        case "all":
            highlightHelper(0);
            break;
        case "active":
            highlightHelper(1)
            break;
        case "checked":
            highlightHelper(2);
        default:
            break;
    }
}

//----------------------------- Deleting checked elements -------------------------------------------//

function clearCompleted() {
    var elements = document.getElementsByClassName("checked");

    Array.from(elements).forEach(element => {
        element.remove();
        totalTodos -= 1;
    });

    itemNumberUpdate();
}


//----------------------------- changing light and dark themes ---------------------------------------//

function changeColors() {
    var status = document.getElementById("theme-icon").src;


    if (status.includes("sun")) {
        document.getElementById("theme-icon").src = "images/icon-moon.svg";
        document.getElementsByClassName("dark")[0].style.display = "none";
        document.getElementsByClassName("light")[0].style.display = "block";

        document.documentElement.style.setProperty('--background-color', 'hsl(0, 0%, 98%)');
        document.documentElement.style.setProperty('--todo-background-color', '#fff');

        document.documentElement.style.setProperty('--title-color', 'hsl(0, 0%, 98%)');
        document.documentElement.style.setProperty('--text-color', 'hsl(235, 19%, 35%)');
        document.documentElement.style.setProperty('--checked-text-color', 'hsl(236, 33%, 92%)');
        document.documentElement.style.setProperty('--placeholder-text-color', 'hsl(233, 11%, 84%)');
        document.documentElement.style.setProperty('--text-hover-color', 'hsl(235, 19%, 35%)'); 
        document.documentElement.style.setProperty('--nav-text-color', 'hsl(236, 9%, 61%)');

        document.documentElement.style.setProperty('--border-color', 'hsl(236, 33%, 92%)');
        document.documentElement.style.setProperty('--button-border-color', 'hsl(236, 33%, 92%)');
        document.documentElement.style.setProperty('--drag-highlight-border-color', 'hsl(235, 19%, 35%)');
        document.documentElement.style.setProperty('--box-shadow-color', 'hsla(0, 0%, 0%, .05)');

    } else {
        document.getElementById("theme-icon").src = "images/icon-sun.svg";
        document.getElementsByClassName("dark")[0].style.display = "block";
        document.getElementsByClassName("light")[0].style.display = "none";

        document.documentElement.style.setProperty('--background-color', 'hsl(235, 21%, 11%)');
        document.documentElement.style.setProperty('--todo-background-color', 'hsl(235, 24%, 19%)');

        document.documentElement.style.setProperty('--title-color', 'hsl(236, 33%, 92%)');
        document.documentElement.style.setProperty('--text-color', 'hsl(234, 39%, 85%)');
        document.documentElement.style.setProperty('--checked-text-color', 'hsl(234, 11%, 52%)');
        
        document.documentElement.style.setProperty('--placeholder-text-color', 'hsl(234, 11%, 52%)');
        document.documentElement.style.setProperty('--text-hover-color', 'hsl(236, 33%, 92%)');
        document.documentElement.style.setProperty('--nav-text-color', 'hsl(233, 14%, 35%)');

        document.documentElement.style.setProperty('--border-color', 'hsl(237, 14%, 26%)');
        document.documentElement.style.setProperty('--button-border-color', 'hsl(237, 14%, 26%)');
        document.documentElement.style.setProperty('--drag-highlight-border-color', 'white');
        document.documentElement.style.setProperty('--box-shadow-color', 'hsla(0, 0%, 0%, .5)');
        
    }
}


//------------------------------- Drag and Drop ------------------------------------------------------//

document.getElementsByClassName("articles")[0].addEventListener('dragstart', dragStart);

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
}


function dragEnter(e, el) {
    e.preventDefault();
    el.classList.add('dragover');
}

function dragOver(e, el) {
    e.preventDefault();
}

function dragLeave(e, el) {
    el.classList.remove('dragover');
}

function drop(e, el) {
    e.target.classList.remove('dragover');
    // get the draggable element
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);

    el.parentNode.insertBefore(draggable, el);
}