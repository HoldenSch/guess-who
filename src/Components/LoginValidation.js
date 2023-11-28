function Validation(values) {
    let error = {}
    const username_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if (values.username.toString() === "") {
        error.username = "Please provide your username"
    }
    else if (!username_pattern.test(values.username)) {
        error.username = "Username does not match"
    }
    else {
        error.username = ""
    }

    if (values.password.toString() === "") {
        error.password = "Please provide your password"
    }
    else if (!password_pattern.test(values.password)) {
        error.password = "Password does not match"
    }
    else {
        error.password = ""
    }
    return error;
}

export default Validation;