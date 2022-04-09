// opreste refresh-ul
const form = document.getElementById("form");
form.addEventListener('submit', (e) => {
    e.preventDefault();
});

alert("incarcat javascript")

function onClick() {
    const firstName = document.getElementById('firstName').value
    const lastName = document.getElementById('lastName').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const passwordConfirm = document.getElementById('password-confirm').value

    if (!firstName || !lastName || !email || !password || !passwordConfirm) {
        alert("All fields are required!")
        return;
    }

    const payload = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    }

    console.log(payload)
    fetch('/register', {
        method: 'POST', // *GET, POST, PUT, DELETE
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload) // body data 
    });

}