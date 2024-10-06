document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('create-task-form');
  const taskList = document.getElementById('tasks');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const taskDesc = form['new-task-description'].value;
    const taskPriority = form['priority'].value;
    const taskDue = form['due-date'].value;
    const assignedUser = form['user'].value;

    const li = document.createElement('li');
    li.innerHTML = `${taskDesc} (Due: ${taskDue}, Assigned to: ${assignedUser})`;
    
    li.style.color = taskPriority === 'high' ? 'red' :
                     taskPriority === 'medium' ? 'yellow':
                     taskPriority === 'low' ? 'green' : 'black';

    li.innerHTML += ' <button class="delete">Delete</button> <button class="edit">Edit</button>';

    taskList.appendChild(li);

    li.querySelector('.delete').addEventListener('click', () => li.remove());

    li.querySelector('.edit').addEventListener('click', () => {
      const newDesc = prompt("Edit task:", taskDesc);
      if (newDesc) li.firstChild.nodeValue = `${newDesc} (Due: ${taskDue}, Assigned to: ${assignedUser}) `;
    });

    form.reset();
  });

  document.getElementById('sort-tasks-asc').addEventListener('click', () => {
    Array.from(taskList.children)
      .sort((a, b) => priorityToValue(a.style.color) - priorityToValue(b.style.color))
      .forEach(task => taskList.appendChild(task));
  });

  document.getElementById('sort-tasks-desc').addEventListener('click', () => {
    Array.from(taskList.children)
      .sort((a, b) => priorityToValue(b.style.color) - priorityToValue(a.style.color))
      .forEach(task => taskList.appendChild(task));
  });

  function priorityToValue(color) {
    if (color === 'red') return 1;    
    if (color === 'yellow') return 2; 
    if (color === 'green') return 3;  
    return 4;
  }
});
