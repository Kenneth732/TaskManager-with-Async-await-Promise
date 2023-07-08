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

