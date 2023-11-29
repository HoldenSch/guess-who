import React from "react";
import { BrowserRouter as Router, Routes, Route,} from "react-router-dom";
import Register from './Components/Register.js';
import Login from './Components/Login.js';
import Play from './Components/Play.js';
import Home from './Components/Play.js';
import Room from './Components/Room.js';
import Board from './Components/Board.js';
 
 
function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Login />}></Route>
                <Route path='/register' element={<Register />}></Route>
                <Route path='/play' element={<Play />}></Route>
                <Route path='/home' element={<Home />}></Route>
                <Route path='/room' element={<Room />}></Route>
                <Route path='/board' element={<Board />}></Route>
            </Routes>
        </Router>
    );
}
 
export default App;