// Navbar.js
import React from 'react';
// import './navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

 const Navbar=()=>  {

  let location = useLocation();
  let navigation = useNavigate();

  const handleLogout=()=> {
    localStorage.removeItem('token');
    navigation('/login');
  };
 
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">iBlog</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==='/'? "active":""}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==='/about'? "active":""}`} to="/about">About</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/">Action</Link></li>
                  <li><Link className="dropdown-item" to="/about">About</Link></li>
                  <li><hr className="dropdown-divider"/></li>
                  <li><Link className="dropdown-item" to="/">Something else here</Link></li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link disabled" aria-disabled="true">Disabled</Link>
              </li>
            </ul>
            {!localStorage.getItem('token')?<form className="d-flex" role="search">
            <Link to="/login" className="btn btn-primary mx-1" tabIndex="-1" role="button" aria-disabled="true">Login</Link>
            <Link to="/signup" className="btn btn-primary mx-1" tabIndex="-1" role="button" aria-disabled="true">Signup</Link>
            </form>: <button onClick={handleLogout} className='btn btn-primary mx-1'>Logout</button>}
          </div>
        </div>
      </nav>
    );
  }
  export default Navbar

