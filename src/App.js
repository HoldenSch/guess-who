import React from "react";
<<<<<<< HEAD
//import Navbar from "./Components/Navbar/Navbar.js";
=======
>>>>>>> abb9061cf5650b5ce2f1d1661c3edc8f999f1e41
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
<<<<<<< HEAD
                <Route path='/play' element={<Play />}></Route>
=======
                <Route path='/home' element={<Home />}></Route>
>>>>>>> abb9061cf5650b5ce2f1d1661c3edc8f999f1e41
            </Routes>
        </Router>
    );
}
 
export default App;