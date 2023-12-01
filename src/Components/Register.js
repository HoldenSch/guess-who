import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Validation from './RegisterValidation.js';
import axios from 'axios';

function Register() {
    // sets variables
    const [values, setValues] = useState({
        username: '',
        password: '',
        confirmation: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // takes user input for username, password, and retyped password
    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}));
    }
    
    // checks validity of submission
    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));

        // checks for errors
        if(errors.username === "" && errors.password === "" && errors.confirmation === "") {
            // posts server.js '/validate' function
            axios.post('http://localhost:8081/validate', values)
            .then(res => {
                // if username is taken, prompt the user to select new username
                if (res.data === "Username taken") {
                    alert('username already taken, type another username');
                }
                else if (res.data === "Success") {
                    // post server.js '/register' function
                    axios.post('http://localhost:8081/register', values)
                    // navigates user to the login page
                    .then(res =>   {
                        navigate('/');
                    })
                    // catches any errors
                    .catch(err => console.log(err));
                }
            })
            // catches any errors
            .catch(err => console.log(err));
        }
    }

    return (
        <div className='d-flex justify-content-center algin-items-center vh-100'>
            <h1>Register for New Account</h1>
            {/* registeration form */}
            <form action="/register" onSubmit={handleSubmit}>
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
                {/* retyped password input */}
                <div class="mb-3">
                    <input class="form-control mx-auto w-auto" id="confirmation" name="confirmation" 
                    onChange={handleInput} placeholder="Re-Type Password" type="password"/>
                    {errors.confirmation && <span class='text-danger'> {errors.confirmation}</span>}
                </div>
                {/* submit button */}
                <button class="btn btn-primary" type="submit">Register</button>
                {/* login button, directs to login page */}
                <Link to="/" class="btn btn-default border">Log In</Link>
            </form>

        </div>
    );
}

export default Register;