    var firstName = document.getElementById('firstName')
    var lastName = document.getElementById('lastName')
    var email = document.getElementById('email')
    var password = document.getElementById('password')

    var form = document.getElementById("form");


    form.addEventListener('submit', (e) => {
        e.preventDefault();
        checkPassword();
        console.log("form");
    });

    function checkPassword() {
        console.log("Good input");
    }