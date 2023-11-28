import React from "react";
//import Navbar from "./Components/Navbar/Navbar.js";
import { BrowserRouter as Router, Routes, Route,} from "react-router-dom";
import Register from './Components/Register.js';
import Login from './Components/Login.js';
import Play from './Components/Play.js';
 
function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Login />}></Route>
                <Route path='/register' element={<Register />}></Route>
                <Route path='/play' element={<Play />}></Route>
            </Routes>
        </Router>
    );
}
 
export default App;