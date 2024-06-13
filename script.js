//function for hamburger menu

function showSidebar()
{
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
}
function hideSidebar()
{
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'
}


//function for changing h2title (homepage)

const words = ["Software Engineer", "Frontend Developer", "SEO Specialist"];
let currentWordIndex = 0;
let currentCharIndex = 0;
const typingSpeed = 200; // Speed of typing
const erasingSpeed = 100; // Speed of erasing
const delayBetweenWords = 2000; // Delay between words

const animatedTextElement = document.getElementById("animated-text");

function typeWord() 
{
    if (currentCharIndex < words[currentWordIndex].length) 
    {
        animatedTextElement.textContent += words[currentWordIndex].charAt(currentCharIndex);
        currentCharIndex++;
        setTimeout(typeWord, typingSpeed);
    } 
    else 
    {
        setTimeout(eraseWord, delayBetweenWords);
    }
}

function eraseWord() 
{
    if (currentCharIndex > 0) 
    {
        animatedTextElement.textContent = animatedTextElement.textContent.slice(0, -1);
        currentCharIndex--;
        setTimeout(eraseWord, erasingSpeed);
    } 
    else 
    {
        currentWordIndex = (currentWordIndex + 1) % words.length;
        setTimeout(typeWord, typingSpeed);
    }
}

// Start the typing animation
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(typeWord, typingSpeed);
});


//js for hide preloader after site loaded

window.addEventListener('load', function () {
    document.querySelector('.pre-loader').className += ' hidden';
});


// to get current year
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();

//contact form js

const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "Please wait..."

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = "Form submitted successfully";
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .finally(function() {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
});