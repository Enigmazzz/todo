
let tasks = []; 

const initLocalStorage = () => {
    if (!localStorage.getItem('tasks')) {
        localStorage.setItem('tasks', JSON.stringify([])); 
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks')); 
    }
};

const saveTasksToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks)); 
};

const renderTasks = () => {
    const todoTasks = document.querySelector('.todo__tasks');
    todoTasks.innerHTML = ''; 

    tasks.forEach(task => {
        const todoBlock = document.createElement('div');
        todoBlock.className = 'todo__task';

        const inputCheckbox = document.createElement('input');
        inputCheckbox.type = 'checkbox';
        inputCheckbox.id = task.id;
        inputCheckbox.checked = task.completed;

        const inputText = document.createElement('p');
        inputText.textContent = task.text;

       
        inputCheckbox.addEventListener('change', () => {
            task.completed = inputCheckbox.checked;
            saveTasksToLocalStorage();
        });

        todoBlock.append(inputCheckbox);
        todoBlock.append(inputText);
        todoTasks.append(todoBlock);
    });
};

const startApp = () => {
    initLocalStorage();
    renderTasks(); 
};
startApp();

const inputValue = document.querySelector('#task-input');
const addBtn = document.querySelector('.todo__add');

addBtn.addEventListener('click', () => {
    if (!inputValue.value.trim()) return; 

    const newTask = {
        id: "id" + Math.random().toString(16).slice(2),
        text: inputValue.value.trim(), 
        completed: false
    };

    tasks.push(newTask); 
    saveTasksToLocalStorage(); 
    renderTasks();

    inputValue.value = ''; 
});

