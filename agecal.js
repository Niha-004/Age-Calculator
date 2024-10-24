const api_url = "https://zenquotes.io/api/random";

// Fetching a random quote from the API using AllOrigins to bypass CORS issues
async function getquote() {
  const quote = document.getElementById("quote");
  const author = document.getElementById("author");

  try {
    // Adding a timestamp to the URL to prevent caching
    const urlWithTimestamp = `${api_url}?t=${new Date().getTime()}`;
    const proxy_url = `https://api.allorigins.win/get?url=${encodeURIComponent(urlWithTimestamp)}`;

    const response = await fetch(proxy_url);
    const data = await response.json();
    const jsonData = JSON.parse(data.contents); // Extract the actual JSON content

    // Accessing the quote and author correctly
    quote.innerHTML = `"${jsonData[0].q}"`; // Quote text
    author.innerHTML = `- ${jsonData[0].a}`; // Author name
  } catch (error) {
    console.error('Error fetching quote:', error);
    quote.innerHTML = "Couldn't load quote.";
    author.innerHTML = "";
  }
}

// Event listener to fetch new quotes on button click
document.getElementById("new-quote-btn").addEventListener("click", function() {
  getquote();  // Call the function to fetch a new quote
});

// Age calculator logic remains unchanged
function calculateAge() {
  const dob = document.getElementById("dob").value;

  // Calling the quote function to fetch a new quote on age calculation
  getquote();

  if (!dob) {
    alert("Please enter your date of birth.");
    return;
  }

  const birthDate = new Date(dob);
  const now = new Date();
  let years = now.getFullYear() - birthDate.getFullYear();
  let months = now.getMonth() - birthDate.getMonth();
  let days = now.getDate() - birthDate.getDate();
  let hours = now.getHours() - birthDate.getHours();
  let minutes = now.getMinutes() - birthDate.getMinutes();
  let seconds = now.getSeconds() - birthDate.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes--;
  }
  if (minutes < 0) {
    minutes += 60;
    hours--;
  }
  if (hours < 0) {
    hours += 24;
    days--;
  }
  if (days < 0) {
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    months--;
  }
  if (months < 0) {
    months += 12;
    years--;
  }

  document.getElementById("years").textContent = years;
  document.getElementById("months").textContent = months;
  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

