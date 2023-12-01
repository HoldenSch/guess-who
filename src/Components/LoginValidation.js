function Validation(values) {
    let error = {};

    // checks if username is provided 
    if (values.username.toString() === "") {
        error.username = "Please provide your username";
    }
    else {
        error.username = "";
    }

    // checks is password is provided
    if (values.password.toString() === "") {
        error.password = "Please provide your password";
    }
    else {
        error.password = "";
    }

    return error;
}

export default Validation;