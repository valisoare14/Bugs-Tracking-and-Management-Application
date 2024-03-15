import { useState } from 'react';
import {Link} from 'react-router-dom'


function Navbar(props) {
    const { loggedIn, setLoggedIn } = props;
    const [addBugClicked,setAddBugClicked]=useState(false)

    const logoutUser=()=>{
        localStorage.removeItem('token')
        setLoggedIn(false)
    }

    return loggedIn ? (
      <div className="loggedInTrueNavbarWrapper">
        <Link to='/bug/status'>Change bug status</Link>
        <Link to='/project/modify'>Modifiy Project</Link>
        <Link to='/bug/solve'>Solve Bug</Link>
        <Link to='/project/add'>Add project</Link>
        <Link to='/homepage'>Homepage</Link>
        <Link to='/' onClick={()=>logoutUser()}>Logout</Link>
      </div>
    ) : (
      <div className="loggedInFalseNavbarWrapper">
        {addBugClicked ? <Link to='/' onClick={()=>setAddBugClicked(false)}>Login</Link> : <Link to='/bug/add' onClick={()=>setAddBugClicked(true)}>Add bug</Link>}
        
      </div>
    );
  }
  
  export default Navbar;