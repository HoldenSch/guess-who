import React from "react";
import Navbar from "./Components/Navbar/Navbar.js";
import { BrowserRouter as Router, Routes, Route,} from "react-router-dom";
import Register from './Components/Register.js';
import Login from './Components/Login.js';
import Home from './Components/Home.js';
 
function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Login />}></Route>
                <Route path='/register' element={<Register />}></Route>
            </Routes>
        </Router>
    );
}
 
export default App;