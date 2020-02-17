import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../FrontEndAssets/logo.svg';
import profile from '../FrontEndAssets/profile.svg';

const Navbar = () => {
    return(
        <nav
            className="navbar navbar-expand-lg navbar-light bg-light"
            style={{
                "-webkit-box-shadow": "0px 4px 35px 0px rgba(217,217,217,1)",
                "-moz-box-shadow": "0px 4px 35px 0px rgba(217,217,217,1)",
                "box-shadow": "0px 4px 35px 0px rgba(217,217,217,1)",
            }}
         >
          <NavLink to="/" className="navbar-brand">
              <img 
                   src= {logo} 
                   width="40"
                   height="40"
                   className="d-inline-block align-top"
                   alt="logo"
               /> Intugine
          </NavLink>
          <button className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                 aria-label="Toggle navigation">
             <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink to="/Home" className="nav-link">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/Brand" className="nav-link">Brand</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/Transport"className="nav-link">Transporters 
                </NavLink>
              </li>
              <li className="mt-2">
                    <span className="profile-img"
                         style={{
                            "margin": "0 0.5em",
                            "padding": "10px 10px",
                            "background-color" : "#bbb",
                            "border-radius": "50%",
                         }}
                     >
                         <img src= {profile} 
                              width="20"
                              height="20"
                              alt="profile"
                         />
                    </span>
                        <i className="fas fa-angle-down"></i>
             </li>
            </ul>
          </div>
        </nav>
    )
};

export default Navbar;
