// Create an empty array to store tasks
let taskList = [];

// Select the form element and add a submit event listener
document.querySelector('#form').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get the value entered in the task input field
    let taskInput = document.querySelector('#taskInput');
    let task = taskInput.value;

    // Create a new task object
    let newTask = {
        name: task,
        completed: false
    };

    // Add the new task to the taskList array
    taskList.push(newTask);

    // Call the async function to handle displaying the tasks
    await displayTasks(taskList);

    // Reset the task input field
    taskInput.value = '';
});


// Function to display the tasks
async function displayTasks(tasks) {
    return new Promise(resolve => {
        // Get the element where the task list will be displayed
        let taskListElement = document.getElementById('taskList');

        // Clear any existing content
        taskListElement.innerHTML = '';

        // Iterate over the tasks array and generate HTML for each task
        tasks.forEach((task, index) => {
            let taskElement = document.createElement('li');
            taskElement.textContent = task.name;

            // Add 'completed' class if the task is marked as completed
            if (task.completed) {
                taskElement.classList.add('completed');
            }

            // Add delete button
            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                deleteTask(index);
            });
            taskElement.appendChild(deleteButton);

            // Add edit button
            let editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => {
                editTask(index);
            });
            taskElement.appendChild(editButton);

            taskListElement.appendChild(taskElement);
        });

        resolve();
    });
}
