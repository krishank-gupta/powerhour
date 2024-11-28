const timerElement = document.getElementById('timer');
const formContainer = document.querySelector('.form_container');
const timerContainer = document.querySelector('.timer_container');
const tasksForm = document.getElementById('tasks_form');

let timeLeft = 3600; // 1 hour in seconds

// Update the timer
function updateTimer() {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    timerElement.textContent = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if (timeLeft > 0) {
        timeLeft--;
    } else {
        clearInterval(timerInterval);
        alert('Power Hour complete!');
    }
}

// Handle form submission
tasksForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from reloading the page

    // Hide form and show timer
    formContainer.style.display = 'none';
    timerContainer.style.display = 'block';

    const tasksList = document.getElementById('tasks_list');
    const tasks = Array.from(document.querySelectorAll('.task_input')).map(input => input.value.trim()).filter(task => task !== '');;
    console.log(tasks);
    tasksList.innerHTML = `<h2>Your Tasks:</h2><ul>${tasks.map(task => `<li>${task}</li>`).join('')}</ul>`;
    
    const timerInterval = setInterval(updateTimer, 1000);
});
