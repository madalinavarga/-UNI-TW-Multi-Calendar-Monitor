// opreste refresh-ul
const form = document.getElementById("form");
form.addEventListener('submit', (e) => {
    e.preventDefault();
});

function onClick() {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    if (!email || !password) {
        alert("All fields are required!")
        return;
    }
    const payload = {
        email: email,
        password: password
    }

    fetch('/login', {
        method: 'POST', // *GET, POST, PUT, DELETE
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload) // body data 
    }).then((response) => {
        console.log("Login raspuns")
        console.log(response) // check if was ok the user or not 
            // window.location.href = '/home'
    })
}