const timerElement = document.getElementById('timer');
const formContainer = document.querySelector('.form_container');
const timerContainer = document.querySelector('.timer_container');
const tasksForm = document.getElementById('tasks_form');

let timeLeft = 3600; // 1 hour in seconds

function startTimer() {
    const startTime = new Date(); // Get the current date and time
    const endTime = new Date(startTime); // Copy the start time
    endTime.setHours(endTime.getHours() + 1); // Set the end time to 1 hour from now
  
    // Update the timer every second
    const timerInterval = setInterval(() => {
      const currentTime = new Date(); // Get the current time
      const timeLeft = endTime - currentTime; // Calculate the time remaining
  
      // If the timer reaches 0, stop the interval
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        console.log('Timer has ended!');
      } else {
        const hours = Math.floor(timeLeft / 1000 / 60 / 60); // Get hours left
        const minutes = Math.floor((timeLeft / 1000 / 60) % 60); // Get minutes left
        const seconds = Math.floor((timeLeft / 1000) % 60); // Get seconds left
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      }
    }, 1000); // Update every second (1000 ms)
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
    
    startTimer();
});


