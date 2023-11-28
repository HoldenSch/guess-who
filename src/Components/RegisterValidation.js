function Validation(values) {
    let error = {}

    if (values.username === "") {
        error.username = "Please provide your username"
    }
    else {
        error.username = ""
    }

    if (values.password === "") {
        error.password = "Please provide your password"
    }
    else {
        error.password = ""
    }

    if (values.confirmation === "") {
        error.confirmation = "Please retype your password"
    }
    else if (values.password.toString() !== values.confirmation.toString()) {
        error.confirmation = "Retyped password did not match"
    }
    else {
        error.confirmation = ""
    }

    return error;
}

export default Validation;