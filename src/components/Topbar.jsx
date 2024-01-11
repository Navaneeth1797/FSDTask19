import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";

// Topbar component for navigation
function Topbar() {

  // Use the 'useNavigate' hook from 'react-router-dom' for programmatic navigation
  const navigate = useNavigate();

  return (
    <>
      {/* Navbar with dark theme */}
      <Navbar className="bg-body-secondary" bg="dark" data-bs-theme="dark">
        <div className="container-fluid">
          
          {/* Toggle button for responsive design */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/* Navbar content */}
          <Navbar.Collapse id="basic-navbar-nav">
            
            <div
              className="collapse navbar-collapse justify-content-center"
              id="navbarCenteredExample"
              style={{ fontSize: "5rem", cursor: "pointer" }}
            >
              
              {/* Navigation links */}

              <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item">
                  <Nav className="me-auto">
                    
                    {/* Home link with a click event to navigate to the home page */}
                    <Nav.Link onClick={() => navigate("/")}> Home</Nav.Link>
                  </Nav>
                </li>
              </ul>
            </div>

          </Navbar.Collapse>

        </div>

      </Navbar>
      
    </>
  );
}

export default Topbar;
