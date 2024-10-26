// Selecting DOM elements
const hoursInput = document.getElementById('hours')
const minutesInput = document.getElementById('minutes')
const secondsInput = document.getElementById('seconds')

const displayHours = document.getElementById('display-hours')
const displayMinutes = document.getElementById('display-minutes')
const displaySeconds = document.getElementById('display-seconds')

const startBtn = document.getElementById('startBtn')
const pauseBtn = document.getElementById('pauseBtn')
const resetBtn = document.getElementById('resetBtn')
const alertMessage = document.getElementById('alert')

// Variables for the timer
let countdownInterval // Holds the interval ID for countdown
let totalSeconds // Stores the total time in seconds
let isPaused = true // Track the state of the timer

// Function to update the display with hours, minutes, and seconds
function updateDisplay() {
  // Convert total seconds into hours, minutes, and seconds
  const hrs = Math.floor(totalSeconds / 3600)
  const mins = Math.floor((totalSeconds % 3600) / 60)
  const secs = totalSeconds % 60

  // Pad with zeros for consistency (e.g., 09:05:01)
  displayHours.textContent = String(hrs).padStart(2, '0')
  displayMinutes.textContent = String(mins).padStart(2, '0')
  displaySeconds.textContent = String(secs).padStart(2, '0')
}

// Function to start the countdown
function startCountdown() {
  if (isPaused) {
    // Get the user input values and convert to total seconds
    totalSeconds =
      parseInt(hoursInput.value) * 3600 +
      parseInt(minutesInput.value) * 60 +
      parseInt(secondsInput.value)

    // Prevent negative or zero values for countdown
    if (totalSeconds <= 0) return

    // Set buttons and pause state
    isPaused = false
    startBtn.disabled = true
    pauseBtn.disabled = false

    // Start interval to decrease totalSeconds every second
    countdownInterval = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--
        updateDisplay()
      } else {
        // Stop countdown and show alert when time is up
        clearInterval(countdownInterval)
        alertMessage.style.display = 'block'
      }
    }, 1000) // Update every second
  }
}

// Function to pause the countdown
function pauseCountdown() {
  if (!isPaused) {
    // Set pause state and clear interval
    isPaused = true
    clearInterval(countdownInterval)

    // Enable start button and disable pause
    startBtn.disabled = false
    pauseBtn.disabled = true
  }
}

// Function to reset the countdown
function resetCountdown() {
  // Clear interval, reset display and inputs
  clearInterval(countdownInterval)
  totalSeconds = 0
  isPaused = true

  displayHours.textContent = '00'
  displayMinutes.textContent = '00'
  displaySeconds.textContent = '00'

  hoursInput.value = 0
  minutesInput.value = 0
  secondsInput.value = 0

  // Hide alert and reset button states
  alertMessage.style.display = 'none'
  startBtn.disabled = false
  pauseBtn.disabled = true
}

// Event listeners for buttons
startBtn.addEventListener('click', startCountdown)
pauseBtn.addEventListener('click', pauseCountdown)
resetBtn.addEventListener('click', resetCountdown)
