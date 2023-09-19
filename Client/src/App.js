import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Alert from './components/Alert';
import NoteState from './context/notes/NoteState';
import Signup from './components/Signup';
import Login from './components/Login';
import { useState } from 'react';

function App() {
  const [alert, setalert] = useState({
    message:"Welcome to iBlog",
    type: "success"
  })

    let showalert=(message, type)=>{
      
      setalert({
        message:message,
        type:type
      })
      
      setTimeout(() => {
        setalert(null)
      }, 2000);
}
  return (
    <>
    <div className='container'>
      <NoteState>
      <Router>
      <Navbar/>
      <Alert alert={alert}/>
        <Routes>  
            <Route exact path="/"   element={<Home showalert={showalert}/>}/>
            <Route exact path="/about"  element={<About/>} />
            <Route exact path="/login" element={<Login showalert={showalert}/>} />
            <Route exact path="/signup" element={<Signup showalert={showalert}/>}  />
            <Route exact path='/' />
          </Routes>
        </Router>
      </NoteState>
    </div>
    </>
  );
}

export default App;
