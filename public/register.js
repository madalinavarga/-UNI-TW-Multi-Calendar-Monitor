function onClick() {
    var firstName = document.getElementById('firstName')
    var lastName = document.getElementById('lastName')
    var email = document.getElementById('email')
    var password = document.getElementById('password')
    var errorElement = document.getElementById('error-msg')

    let messages = []

    if (firstName.value === '' || firstName.value == null) {
        messages.push('First name is required')
    }
    if (lastName.value === '' || lastName.value == null) {
        messages.push('Last name is required')
    }

    console.log(firstName.value);
}