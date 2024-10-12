const taskListElement = document.getElementById('task-list');
const taskForm = document.getElementById('task-form');

let tasks = [];

taskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const task = {
        id: Date.now(),
        name: document.getElementById('task-name').value,
        dueDate: document.getElementById('due-date').value,
        priority: document.getElementById('priority').value,
        assignedTo: document.getElementById('assigned-to').value,
        status: 'Pending', // Default status
        comment: document.getElementById('comment').value
    };
    tasks.push(task);
    renderTasks();
    taskForm.reset();
});

function renderTasks() {
    taskListElement.innerHTML = '';
    tasks.forEach(task => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${task.name}</td>
            <td>${task.dueDate}</td>
            <td>${task.priority}</td>
            <td>${task.assignedTo}</td>
            <td>
                <select class="form-control" onchange="changeStatus(${task.id}, this.value)">
                    <option value="Pending" ${task.status === 'Pending' ? 'selected' : ''}>Pending</option>
                    <option value="In Progress" ${task.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                    <option value="Completed" ${task.status === 'Completed' ? 'selected' : ''}>Completed</option>
                </select>
            </td>
            <td>${task.comment}</td>
            <td>
                <button class="btn btn-warning" onclick="editTask(${task.id})">Edit</button>
                <button class="btn btn-danger" onclick="deleteTask(${task.id})">Delete</button>
            </td>
        `;
        taskListElement.appendChild(tr);
    });
}

function changeStatus(id, status) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.status = status; // Update the status of the task
        renderTasks(); // Re-render the task list
    }
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        document.getElementById('task-name').value = task.name;
        document.getElementById('due-date').value = task.dueDate;
        document.getElementById('priority').value = task.priority;
        document.getElementById('assigned-to').value = task.assignedTo;
        document.getElementById('comment').value = task.comment;
        tasks = tasks.filter(t => t.id !== id);
        renderTasks();
    }
}

function deleteTask(id) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
    }
}

function searchTasks() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    taskListElement.innerHTML = '';
    tasks.filter(task => task.name.toLowerCase().includes(searchValue))
        .forEach(task => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${task.name}</td>
                <td>${task.dueDate}</td>
                <td>${task.priority}</td>
                <td>${task.assignedTo}</td>
                <td>
                    <select class="form-control" onchange="changeStatus(${task.id}, this.value)">
                        <option value="Pending" ${task.status === 'Pending' ? 'selected' : ''}>Pending</option>
                        <option value="In Progress" ${task.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                        <option value="Completed" ${task.status === 'Completed' ? 'selected' : ''}>Completed</option>
                    </select>
                </td>
                <td>${task.comment}</td>
                <td>
                    <button class="btn btn-warning" onclick="editTask(${task.id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteTask(${task.id})">Delete</button>
                </td>
            `;
            taskListElement.appendChild(tr);
        });
}
