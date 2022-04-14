// opreste refresh-ul
alert("incarcat javascript")
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
    console.log(payload)
    fetch('/login', {
        method: 'POST', // *GET, POST, PUT, DELETE
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload) // body data 
    });
}