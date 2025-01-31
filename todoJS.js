let tasks = [];

const initLocalStorage = () => {
    if (!localStorage.getItem('tasks')) {
        localStorage.setItem('tasks', JSON.stringify([]));
    } 
        tasks = JSON.parse(localStorage.getItem('tasks'));
    };

const saveTasksToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};


const renderTasks = (filter = 'all') => {
    const todoTasks = document.querySelector('.todo__tasks');
    todoTasks.innerHTML = '';
    let filteredTasks = tasks;

    if (filter === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    }

    filteredTasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('todo__task');
        if (task.completed) taskElement.classList.add('completed');
        taskElement.id = task.id;

        taskElement.innerHTML = `
            <div class="todo__info">
                <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTask('${task.id}')">
                <p class="todo__text">${task.text}</p>
                <div class="todo__edit-block">
                    <input type="text" class="todo__edit-input" value="${task.text}">
                    <div class="todo__buttons">
                        <button class="todo__update" onclick="updateTask('${task.id}')">Update</button>
                        <button class="todo__cancel" onclick="cancelEdit('${task.id}')">Cancel</button>
                    </div>
                </div>
                <span class="todo__date">${task.date}</span>
            </div>
            <button class="todo__delete" onclick="removeTask('${task.id}')">REMOVE</button>
        `;

        const taskTextElement = taskElement.querySelector('.todo__text');
        const editBlock = taskElement.querySelector('.todo__edit-block');
        const buttonsDiv = taskElement.querySelector('.todo__buttons');

        taskTextElement.addEventListener('click', () => {
            taskTextElement.style.display = 'none';
            editBlock.classList.add('show'); 
        });

        todoTasks.appendChild(taskElement);
    });
};

function updateTask(id) {
    const task = tasks.find(task => task.id === id);
    const updatedText = document.querySelector(`#${id} .todo__edit-input`).value.trim();
    if (updatedText) {
        task.text = updatedText;
        saveTasksToLocalStorage();
        renderTasks();
    }
}

function cancelEdit(id) {
    const taskElement = document.getElementById(id);
    const taskTextElement = taskElement.querySelector('.todo__text');
    const editBlock = taskElement.querySelector('.todo__edit-block');

    taskTextElement.style.display = 'block';
    editBlock.classList.remove('show');
}

        
        
        // const todoBlock = document.createElement('div');
        // todoBlock.className = 'todo__task';

        // const todoInfo = document.createElement('div');
        // todoInfo.className = 'todo__info';

        // const inputCheckbox = document.createElement('input');
        // inputCheckbox.type = 'checkbox';
        // inputCheckbox.id = task.id;
        // inputCheckbox.checked = task.completed;

        // const inputText = document.createElement('p');
        // inputText.className = 'todo__text';
        // inputText.textContent = task.text;

        // const editBlock = document.createElement('div');
        // editBlock.className = 'todo__edit-block';

        // const editInput = document.createElement('input');
        // editInput.type = 'text';
        // editInput.className = 'todo__edit-input';
        // editInput.value = task.text;

        // const buttonsDiv = document.createElement('div');
        // buttonsDiv.className = 'todo__buttons';

        // const updateButton = document.createElement('button');
        // updateButton.className = 'todo__update';
        // updateButton.textContent = 'Update';

        // const cancelButton = document.createElement('button');
        // cancelButton.className = 'todo__cancel';
        // cancelButton.textContent = 'Cancel';

        // buttonsDiv.append(updateButton, cancelButton);
        // editBlock.append(editInput, buttonsDiv);

        // if (task.completed) {
        //     todoBlock.classList.add('completed');
        // }

        // inputText.addEventListener('click', () => {
        //     inputText.style.display = 'none';
        //     editBlock.style.display = 'flex';
        // });

        // updateButton.addEventListener('click', () => {
        //     task.text = editInput.value.trim();
        //     inputText.textContent = task.text;
        //     editBlock.style.display = 'none';
        //     inputText.style.display = 'block';
        //     saveTasksToLocalStorage();
        // });

        // cancelButton.addEventListener('click', () => {
        //     editBlock.style.display = 'none';
        //     inputText.style.display = 'block';
        // });

        // const deleteButton = document.createElement('button');
        // deleteButton.textContent = 'REMOVE';
        // deleteButton.className = 'todo__delete';

        // deleteButton.addEventListener('click', () => {
        //     tasks = tasks.filter(t => t.id !== task.id);
        //     saveTasksToLocalStorage();
        //     renderTasks();
        // });

        // inputCheckbox.addEventListener('change', () => {
        //     task.completed = inputCheckbox.checked;
        //     if (task.completed) {
        //         todoBlock.classList.add('completed');
        //     } else {
        //         todoBlock.classList.remove('completed');
        //     }
        //     saveTasksToLocalStorage();
        // });

        // todoInfo.append(inputCheckbox);
        // todoInfo.append(inputText);
        // todoInfo.append(editBlock);

        // todoBlock.append(todoInfo);
        // todoBlock.append(deleteButton);

        // todoTasks.append(todoBlock);
   

const startApp = () => {
    initLocalStorage();
    renderTasks();
};

startApp();

function removeTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasksToLocalStorage();
    renderTasks();
}
function toggleTask(id) {
       tasks = tasks.map(task => {
         if (task.id === id) {
             return { ...task, completed: !task.completed };
      }
           return task;
    });
  
    saveTasksToLocalStorage();
  
      renderTasks();
  }
function editTask(id) {
    const newText = prompt("Edit task:", tasks.find(task => task.id === id).text);
    if (newText !== null) {
        tasks = tasks.map(task => task.id === id ? {...task, text: newText} : task);
        saveTasksToLocalStorage();
        renderTasks();
    }
}

const inputValue = document.querySelector('#task-input');
const addBtn = document.querySelector('.todo__add');
const inputDate = document.querySelector('#dateInput');
inputDate.addEventListener('change', (event) => {
    console.log(event.target.value);
});
// делаем чтобы дата по умолчанию была сегодняшняя
const today = new Date();
console.log(today)
const formattedDate = today.toISOString().substr(0, 10);
const selectData = document.getElementById('dateInput').value = formattedDate; //  formattedDate делает дату сегодняшней
inputDate.min = formattedDate; //выставляем чтобы дата была не меньше сегодняшней св-во min 
console.log(selectData);

 //конец
 addBtn.addEventListener('click', () => {
    if (!inputValue.value.trim()) return;

    const newTask = {
        id: "id" + Math.random().toString(16).slice(2),
        text: inputValue.value.trim(),
        completed: false,
        date: inputDate.value
    };

    tasks.push(newTask);
    saveTasksToLocalStorage();
    renderTasks();

    inputValue.value = '';
});

const option = document.querySelector('.todo__options');
option.addEventListener('change', () => {
    renderTasks(option.value);
});

// todoTasks.innerHTML += `
//         <div class="todo__task", id="${task.id}">
//         <div class="todo__info" id="${task.id}">
//        <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''}>
//        <p class = "todo__text" ${task.text}>
//        <div class = "todo__edit-block" >
//        <input type="text" class="todo__edit-input" value="${task.text}">
//        <div class="todo__buttons">
//        <button class="todo__update" id="${task.id}">Update</button>
//         <button class="todo__cancel" id="${task.id}">Cancel</button>
//          </div>
//     })
