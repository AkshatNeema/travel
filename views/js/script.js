// You can add JavaScript functionality here
// For example, handling form submissions, client-side validation, etc.

// Handling login form submission
const loginForm = document.getElementById('loginForm');
if(loginForm){
// console.log(loginForm, "Printing x");
loginForm.addEventListener('submit', function(event) {
    console.log('Form submitted');
    event.preventDefault(); // Prevent default form submission
    const userId = document.getElementById('userId').value;
    console.log(userId);
    const password = document.getElementById('password').value;
    // return
    // Perform client-side validation if needed
    
    // Send AJAX request to server for login
    fetch('/login', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, password })
    })
    .then(response => {
        if (response.redirected) {
            window.location.href = response.url; // Redirect to the redirected URL
        } else {
            // Handle unsuccessful login
            // For example, display an error message
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle error, display error message, etc.
    });
});
}


// Handling signup form submission

const signupForm = document.getElementById('signupForm');
if (signupForm ){
signupForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    const formData = new FormData(this);

    // Convert form data to JSON object
    const formDataJSON = {};
    formData.forEach((value, key) => {
        formDataJSON[key] = value;
    });

    // Send AJAX request to server for signup
    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataJSON)
    })
    .then(response => {
        if (response.redirected) {
            window.location.href = response.url; // Redirect to the redirected URL
        } else {
            // Handle unsuccessful signup
            // For example, display an error message
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle error, display error message, etc.
    });
});
}
