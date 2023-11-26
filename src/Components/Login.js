import React from "react";
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div className='d-flex justify-content-center algin-items-center vh-100'>
            <h1>Login</h1>
            <form action="/register">
                <div class="mb-3">
                    <input autocomplete="off" autofocus class="form-control mx-auto w-auto" id="username" name="username" placeholder="Username" type="text"></input>
                </div>
                <div class="mb-3">
                    <input class="form-control mx-auto w-auto" id="password" name="password" placeholder="Password" type="password"></input>
                </div>
                <button class="btn btn-success" type="submit">Log In</button>
                <Link to="/register" class="btn btn-default border">Create Account</Link>
            </form>

        </div>
    )
}

export default Login;