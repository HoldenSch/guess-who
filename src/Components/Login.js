import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation.js';
import axios from 'axios';

function Login () {
    // sets variables
    const [values, setValues] = useState({
        username: '',
        password: ''
    })
    const [errors, setErrors] = useState({})
    const navigate = useNavigate();

    // takes user input for username and password
    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }

    // checks validity of submission
    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));

        // checks for errors
        if(errors.username === "" && errors.password === "") {
            // posts server.js '/login' function
            axios.post('http://localhost:8081/login', values)
            .then(res => {
                // if invalid login, prompt the user to retype
                if (res.data === "Fail") {
                    alert('invalid username and/or password');
                }
                else {
                    // navigates user to the home page
                    navigate('/home');
                }
            })
            // catches any error
            .catch(err => console.log(err));
        }
    }

    return (
        <div className='d-flex justify-content-center algin-items-center vh-100'>
            <h1>Login</h1>
            {/* login form */}
            <form action="" onSubmit={handleSubmit}>
                {/* username input */}
                <div class="mb-3">
                    <input autocomplete="off" autofocus class="form-control mx-auto w-auto" id="username" name="username" 
                    onChange={handleInput} placeholder="Username" type="text"/>
                    {errors.username && <span class='text-danger'> {errors.username}</span>}
                </div>
                {/* password input */}
                <div class="mb-3">
                    <input class="form-control mx-auto w-auto" id="password" name="password" 
                    onChange={handleInput} placeholder="Password" type="password"/>
                    {errors.password && <span class='text-danger'> {errors.password}</span>}
                </div>
                {/* submit button */}
                <button class="btn btn-success" type="submit">Log In</button>
                {/* register button, directs to register page */}
                <Link to="/register" class="btn btn-default border">Create Account</Link>
            </form>

        </div>
    )
}

export default Login;