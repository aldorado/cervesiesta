function calculateBillionthSecond() {
  const dobInput = document.getElementById('dob');
  const timeInput = document.getElementById('time');
  const resultElement = document.getElementById('result');
  const countdownElement = document.getElementById('countdown');

  const dob = new Date(`${dobInput.value}T${timeInput.value}`);
  if (isNaN(dob.getTime())) {
    resultElement.innerText = 'Please enter a valid date and time of birth.';
    return;
  }

  const billionthSecondDate = new Date(dob.getTime() + 1000000000 * 1000);

  // Save date and time of birth in a cookie
  document.cookie = `dob=${dob.toISOString()}; expires=${billionthSecondDate.toUTCString()}; path=/`;

  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };

  const resultText = `Your billionth second on Earth will be on ${billionthSecondDate.toLocaleDateString('en-US', options)}.`;
  resultElement.innerText = resultText;

  startCountdown(billionthSecondDate);
}

// Function to retrieve the date and time of birth from the cookie
function getDOBFromCookie() {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.split('=');
    if (name.trim() === 'dob') {
      return new Date(value);
    }
  }
  return null;
}

// Function to start the countdown
function startCountdown(billionthSecondDate) {
  const countdownElement = document.getElementById('countdown');

  const countdownInterval = setInterval(() => {
    const now = new Date();
    const timeDifference = billionthSecondDate - now;

    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      countdownElement.innerText = 'Congratulations! You have reached your billionth second!';
    } else {
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      countdownElement.innerText = `Time remaining: ${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
  }, 1000);
}

// Check if date and time of birth are saved in the cookie
const savedDOB = getDOBFromCookie();
if (savedDOB) {
  const dobInput = document.getElementById('dob');
  const timeInput = document.getElementById('time');

  // Format the date and time as "YYYY-MM-DD" and "HH:MM"
  const formattedDate = savedDOB.toISOString().split('T')[0];
  const formattedTime = savedDOB.toISOString().split('T')[1].slice(0, 5);

  dobInput.value = formattedDate;
  timeInput.value = formattedTime;

  const billionthSecondDate = new Date(savedDOB.getTime() + 1000000000 * 1000);

  // Check if the billionth second has already passed
  if (billionthSecondDate <= new Date()) {
    document.getElementById('result').innerText = 'Congratulations! You have already reached your billionth second!';
    const timeAgo = new Date() - billionthSecondDate;
    const timeAgoInSeconds = Math.floor(timeAgo / 1000);

    document.getElementById('countdown').innerText = `It occurred ${timeAgoInSeconds} seconds ago.`;
  } else {
    startCountdown(billionthSecondDate);
  }
}
