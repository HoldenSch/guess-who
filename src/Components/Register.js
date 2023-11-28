import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Validation from './RegisterValidation.js';
import axios from 'axios';

function Register() {
    const [values, setValues] = useState({
        username: '',
        password: '',
        confirmation: ''
    })
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        if(errors.username === "" && errors.password === "" && errors.confirmation === "") {
            axios.post('http://localhost:8081/validate', values)
            .then(res => {
                if (res.data === "Username taken") {
                    alert('username already taken, type another username')
                }
                else if (res.data === "Success") {
                    axios.post('http://localhost:8081/register', values)
                    .then(res =>   {
                        navigate('/')
                    })
                    .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
        }
    }

    return (
        <div className='d-flex justify-content-center algin-items-center vh-100'>
            <h1>Register for New Account</h1>
            <form action="/register" onSubmit={handleSubmit}>
                <div class="mb-3">
                    <input autocomplete="off" autofocus class="form-control mx-auto w-auto" id="username" name="username" 
                    onChange={handleInput} placeholder="Username" type="text"/>
                    {errors.username && <span class='text-danger'> {errors.username}</span>}
                </div>
                <div class="mb-3">
                    <input class="form-control mx-auto w-auto" id="password" name="password" 
                    onChange={handleInput} placeholder="Password" type="password"/>
                    {errors.password && <span class='text-danger'> {errors.password}</span>}
                </div>
                <div class="mb-3">
                    <input class="form-control mx-auto w-auto" id="confirmation" name="confirmation" 
                    onChange={handleInput} placeholder="Re-Type Password" type="password"/>
                    {errors.confirmation && <span class='text-danger'> {errors.confirmation}</span>}
                </div>
                <button class="btn btn-primary" type="submit">Register</button>
                <Link to="/" class="btn btn-default border">Log In</Link>
            </form>

        </div>
    )
}

export default Register;