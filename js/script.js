// Create an empty array to store tasks
let taskList = [];

// Select the form element and add a submit event listener
document.querySelector('#form').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get the value entered in the task input field
    let taskInput = document.querySelector('#taskInput');
    let task = taskInput.value;

    try {
        if (task) {
            // Check if the task already exists
            const existingTask = taskList.find(existingTask => existingTask.name === task);
            
            if (existingTask) {
                // If the task exists, update the task name
                existingTask.name = task;
            } else {
                // Create a new task object
                let newTask = {
                    name: task,
                    completed: false
                };
    
                // Add the new task to the taskList array
                taskList.push(newTask);
            }

            // Call the async function to handle displaying the tasks
            await displayTasks(taskList);

            // Reset the task input field
            taskInput.value = '';
        } else {
            console.error('Please enter a task.');
        }
    } catch (error) {
        console.error(error);
    }
});

// Function to display the tasks
async function displayTasks(tasks) {
    // Get the element where the task list will be displayed
    let taskListElement = document.getElementById('taskList');

    // Clear any existing content
    taskListElement.innerHTML = '';

    // Iterate over the tasks array and generate HTML for each task
    tasks.forEach(task => {
        let taskElement = document.createElement('li');
        taskElement.textContent = task.name;

        // Add 'completed' class if the task is marked as completed
        if (task.completed) {
            taskElement.classList.add('completed');
        }

        // Create a delete button
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            deleteTask(task);
        });

        // Create an edit button
        let editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
            editTask(task);
        });

        // Append the delete and edit buttons to the task element
        taskElement.appendChild(deleteButton);
        taskElement.appendChild(editButton);

        taskListElement.appendChild(taskElement);
    });
}

// Function to delete a task
function deleteTask(task) {
    // Find the index of the task in the taskList array
    const index = taskList.findIndex(existingTask => existingTask.name === task.name);

    if (index !== -1) {
        // Remove the task from the taskList array
        taskList.splice(index, 1);

        // Re-display the updated task list
        displayTasks(taskList);
    }
}

// Function to edit a task
function editTask(task) {
    // Get the new task name from user input
    const newTaskName = prompt('Enter the new task name:', task.name);

    if (newTaskName) {
        // Find the task in the taskList array
        const existingTask = taskList.find(existingTask => existingTask.name === task.name);

        if (existingTask) {
            // Update the task name
            existingTask.name = newTaskName;

            // Re-display the updated task list
            displayTasks(taskList);
        }
    }
}

// Call the displayTasks function initially to show any existing tasks
displayTasks(taskList);
