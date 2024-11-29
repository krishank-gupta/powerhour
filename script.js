const timerElement = document.getElementById('timer');
const formContainer = document.querySelector('.form_container');
const timerContainer = document.querySelector('.timer_container');
const tasksForm = document.getElementById('tasks_form');

function startTimer(length) {
    const startTime = new Date(); // Get the current date and time
    const endTime = new Date(startTime); // Copy the start time
    endTime.setSeconds(endTime.getSeconds() + length); // Add timeLeft in seconds to the end time

    // Update the timer every second
    const timerInterval = setInterval(() => {
        const currentTime = new Date(); // Get the current time
        timeLeft = Math.max(0, Math.floor((endTime - currentTime) / 1000)); // Calculate remaining time in seconds

        // If the timer reaches 0, stop the interval
        if (timeLeft <= 0) {
            timerEnded(timerInterval);
        } else {
            const minutes = Math.floor(timeLeft / 60); // Get minutes left
            const seconds = timeLeft % 60; // Get seconds left
            timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }, 1000); // Update every second (1000 ms)

    // Return the interval ID so it can be cleared elsewhere
    return timerInterval;
}

function timerEnded(timerInterval) {
    clearInterval(timerInterval); // Stop the timer
    console.log('Timer has ended!');
    timerElement.textContent = `00:00`;

    const duration = 15 * 1000,
        animationEnd = Date.now() + duration,
        defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // Since particles fall down, start a bit higher than random
        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            })
        );
        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            })
        );
    }, 250);
    
}

// Handle form submission
tasksForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from reloading the page

    const timerInterval = startTimer(20); // Start the timer and get the interval ID

    // Hide form and show timer
    formContainer.style.display = 'none';
    timerContainer.style.display = 'block';

    const tasksList = document.getElementById('tasks_list');
    const tasks = Array.from(document.querySelectorAll('.task_input'))
        .map(input => input.value.trim())
        .filter(task => task !== '');
    console.log(tasks);

    tasksList.innerHTML = `<h2>Your Tasks:</h2><ul>${tasks
        .map(
            task => `
            <li>
                <input type="checkbox" class="task-checkbox" />
                <span class="task-text">${task}</span>
            </li>`
        )
        .join('')}
    </ul>`;

    // Add event listeners to the checkboxes to toggle strikethrough style
    const checkboxes = document.querySelectorAll('.task-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const taskText = this.nextElementSibling; // Get the corresponding task text span
            if (this.checked) {
                taskText.style.textDecoration = 'line-through'; // Apply strikethrough
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                });
            } else {
                taskText.style.textDecoration = 'none'; // Remove strikethrough
            }

            // Check if all checkboxes are checked
            const allChecked = Array.from(checkboxes).every(cb => cb.checked);
            if (allChecked) {
                timerEnded(timerInterval); // Stop the timer when all are checked
                console.log("All tickmarks checked");
            }
        });
    });
});
