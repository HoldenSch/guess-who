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
                <Route path='/' element={<Login />}/>
                <Route path='/home' element={<Home />}/>
                <Route path='/register' element={<Register />}/>
                <Route path='/play' element={<Play />}/>
                <Route path='/room' element={<Room />}/>
                <Route path='/board' element={<Board />}/>
            </Routes>
        </Router>
    );
}
 
export default App;