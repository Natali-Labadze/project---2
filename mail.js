function getError(input, message) {
    const user = input.parentElement
        // this is .user div class
    const small = user.querySelector('small')
    small.innerText = message
    user.classList.add('error')

}

function getSuccess(input, message) {
    const user = input.parentElement
    const small = user.querySelector('small')
    small.innerText = message
    user.classList.remove('error')
    user.classList.add('success')

}


const formLogin = document.getElementById('login')
const usernameLogin = document.getElementById("username")
const passwordLogin = document.getElementById("password")

function getSignIn() {
    let errors = false
    const usernameValue = usernameLogin.value.trim()
    const passwordValue = passwordLogin.value.trim()
    if (usernameLogin === '') {

        getError(usernameLogin, 'username be blank')
        errors = true
    } else if (usernameValue.length < 4) {
        getError(usernameLogin, 'You need at least 4 charachter')
        errors = true
    } else {

        getSuccess(usernameLogin, 'this is successful name')
    }

    if (passwordLogin === '') {

        getError(passwordLogin, 'username be blank')
        errors = true
    } else if (passwordValue.length < 4) {
        getError(passwordLogin, 'You need at least 4 charachter')
        errors = true
    } else {

        getSuccess(passwordLogin, 'this is successful name')
    }

    if (!errors) {
        LogIn()

    }
}

formLogin.addEventListener('submit', (e) => {
    e.preventDefault()
    getSignIn()
})


function LogIn() {
    alert("You have successfully loged in")
    window.location.href = "index.html"

    //this window equals ==> window.open
}


function getSignUp() {
    document.getElementById("register").style.display = "block"
    document.getElementById("login").style.display = "none"
}

const checkBox = document.getElementById('check_box')
const firstName = document.getElementById('first_name')
const lastName = document.getElementById('last_name')
const form = document.getElementById('register')
const username = document.getElementById('usernameRegistr')
const password = document.getElementById('passwordRegistr')
const email = document.getElementById('email')
const confPassword = document.getElementById('confPassRegistr')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    checkIn()
})


function checkIn() {
    let errors = false
    const lastNameValue = lastName.value.trim()
    const firstNameValue = firstName.value.trim()
    const usernameValue = username.value.trim()
    const emailValue = email.value.trim()
    const passValue = password.value.trim()
    const confPassValue = confPassword.value.trim()


    if (usernameValue === '') {
        //show error
        //add error class
        getError(username, 'username be blank')
        errors = true
    } else if (usernameValue.length < 4) {
        getError(username, 'You need at least 4 charachter')
        errors = true
    } else {
        //add success class
        getSuccess(username, 'this is successful name')
    }

    if (emailValue === '') {

        getError(email, 'email be blank')
        errors = true

    } else if (!validateEmail(emailValue)) {
        getError(email, 'email is not valid')
        errors = true
    } else {
        //if email value is correct , write text this is succesful email
        getSuccess(email, 'this is succesful email')
    }

    if (passValue === '') {
        getError(password, 'password cannot be blank')
        errors = true
    } else if (passValue.length < 8) {
        getError(password, 'You need at least 8 characters')
        errors = true
    } else {
        getSuccess(password, 'this is successful password')
    }


    if (confPassValue === '') {

        getError(confPassword, 'password cannot be blank')
        errors = true

    } else if (passValue !== confPassValue) {

        getError(confPassword, 'password is not correct')
        errors = true

    } else {
        //when passValue == confPassValue  write ==> this is correct password
        getSuccess(confPassword, 'this is correct')
    }
    if (firstNameValue === '') {
        //show error
        //add error class
        getError(firstName, 'username be blank')
        errors = true
    } else if (firstNameValue.length < 4) {
        getError(firstName, 'You need at least 4 charachter')
        errors = true
    } else {
        //add success class
        getSuccess(firstName, 'this is successful firstname')
    }
    if (lastNameValue === '') {
        //show error
        //add error class
        getError(lastName, 'username be blank')
        errors = true
    } else if (lastNameValue.length < 4) {
        getError(lastName, 'You need at least 4 charachter')
        errors = true
    } else {
        //add success class
        getSuccess(lastName, 'this is successful lastname')
    }

    if (!checkBox.checked) {
        errors = true
        document.getElementById('error_check').style.display = "block"

    } else {
        document.getElementById('error_check').style.display = "none"
    }

    // if not errors , user register
    if (!errors) {
        register()

    }

}

//this is function of validation

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


//this is function of register
function register() {
    alert("You have successfully registered")
    window.location.href = "index.html"
}