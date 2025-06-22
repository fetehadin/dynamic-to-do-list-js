// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load existing tasks from Local Storage
    loadTasks();

    // Add task on button click
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task');
            return;
        }
        addTask(taskText);
        taskInput.value = ''; // Clear input
    });

    // Add task on Enter key press
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText === '') {
                alert('Please enter a task');
                return;
            }
            addTask(taskText);
            taskInput.value = ''; // Clear input
        }
    });

    // Function to add a task
    function addTask(taskText, save = true) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Remove task on button click
        removeBtn.onclick = () => {
            li.remove();
            removeFromLocalStorage(taskText);
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        if (save) {
            saveToLocalStorage(taskText);
        }
    }

    // Save a task to Local Storage
    function saveToLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Remove a task from Local Storage
    function removeFromLocalStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(task => addTask(task, false));
    }
});
