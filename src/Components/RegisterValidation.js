function Validation(values) {
    let error = {}

    // checks if username is provided
    if (values.username.toString() === "") {
        error.username = "Please provide your username"
    }
    else {
        error.username = ""
    }

    // checks if password is provided
    if (values.password.toString() === "") {
        error.password = "Please provide your password"
    }
    else {
        error.password = ""
    }

    // checks if retyped password is provided
    if (values.confirmation.toString() === "") {
        error.confirmation = "Please retype your password"
    }
    // checks that password and retyped password are the same
    else if (values.password.toString() !== values.confirmation.toString()) {
        error.confirmation = "Retyped password did not match"
    }
    else {
        error.confirmation = ""
    }

    return error;
}

export default Validation;