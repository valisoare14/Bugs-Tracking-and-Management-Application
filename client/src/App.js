import logo from './logo.svg';
import './App.css';
import Login from './Login'
import Navbar from './Navbar';
import {useState} from 'react'
import {BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom'
import HomePage from './HomePage';
import AddProject from './AddProject';
import AddBug from './AddBug';
import SolveBug from './SolveBug';
import ModifyProject from './ModifyProject'
import ChangeBugStatus from './ChangeBugStatus'
import useCheck from './useCheck';


function App() {
  const [loggedIn , setLoggedIn]=useState(false)
  useCheck(setLoggedIn)

  return (
    <Router>
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      <Routes>
        <Route path='/' element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}/>
        <Route path='/homepage' element={<HomePage/>}/>
        <Route path='/project/add' element={<AddProject/>}/>
        <Route path='/bug/add' element={<AddBug/>}/>
        <Route path='/bug/solve' element={<SolveBug/>}/>
        <Route path='/project/modify' element={<ModifyProject/>}/>
        <Route path='/bug/status' element={<ChangeBugStatus/>}/>
      </Routes>
    </Router>
  );
}

export default App;
