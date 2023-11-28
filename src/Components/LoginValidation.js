function Validation(values) {
    let error = {}

    if (values.username.toString() === "") {
        error.username = "Please provide your username"
    }
    else {
        error.username = ""
    }

    if (values.password.toString() === "") {
        error.password = "Please provide your password"
    }
    else {
        error.password = ""
    }
    return error;
}

export default Validation;