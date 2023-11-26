import React from "react";

const Register = () => {
    return (
        <div className='d-flex justify-content-center algin-items-center vh-100'>
            <h1>Register for New Account</h1>
            <form action="/register">
                <div class="mb-3">
                    <input autocomplete="off" autofocus class="form-control mx-auto w-auto" id="username" name="username" placeholder="Username" type="text"></input>
                </div>
                <div class="mb-3">
                    <input class="form-control mx-auto w-auto" id="password" name="password" placeholder="Password" type="password"></input>
                </div>
                <div class="mb-3">
                    <input class="form-control mx-auto w-auto" id="confirmation" name="confirmation" placeholder="Re-Type Password" type="password"></input>
                </div>
                <button class="btn btn-primary" type="submit">Register</button>
            </form>

        </div>
    )
}

export default Register;