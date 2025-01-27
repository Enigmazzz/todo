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

        const todoInfo = document.createElement('div');
        todoInfo.className = 'todo__info';

        const inputCheckbox = document.createElement('input');
        inputCheckbox.type = 'checkbox';
        inputCheckbox.id = task.id;
        inputCheckbox.checked = task.completed;

        const inputText = document.createElement('p');
        inputText.className = 'todo__text';
        inputText.textContent = task.text;

        const editBlock = document.createElement('div');
        editBlock.className = 'todo__edit-block';

        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.className = 'todo__edit-input';
        editInput.value = task.text;

        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'todo__buttons';

        const updateButton = document.createElement('button');
        updateButton.className = 'todo__update';
        updateButton.textContent = 'Update';

        const cancelButton = document.createElement('button');
        cancelButton.className = 'todo__cancel';
        cancelButton.textContent = 'Cancel';

        buttonsDiv.append(updateButton, cancelButton);
        editBlock.append(editInput, buttonsDiv);

        if (task.completed) {
            todoBlock.classList.add('completed');
        }

        inputText.addEventListener('click', () => {
            inputText.style.display = 'none';
            editBlock.style.display = 'flex';
        });

        updateButton.addEventListener('click', () => {
            task.text = editInput.value.trim();
            inputText.textContent = task.text;
            editBlock.style.display = 'none';
            inputText.style.display = 'block';
            saveTasksToLocalStorage();
        });

        cancelButton.addEventListener('click', () => {
            editBlock.style.display = 'none';
            inputText.style.display = 'block';
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'REMOVE';
        deleteButton.className = 'todo__delete';

        deleteButton.addEventListener('click', () => {
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasksToLocalStorage();
            renderTasks();
        });

        inputCheckbox.addEventListener('change', () => {
            task.completed = inputCheckbox.checked;
            if (task.completed) {
                todoBlock.classList.add('completed');
            } else {
                todoBlock.classList.remove('completed');
            }
            saveTasksToLocalStorage();
        });

        todoInfo.append(inputCheckbox);
        todoInfo.append(inputText);
        todoInfo.append(editBlock);

        todoBlock.append(todoInfo);
        todoBlock.append(deleteButton);

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
