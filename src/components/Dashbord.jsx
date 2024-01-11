import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";

// Dashboard component for the landing page
function Dashbord() {

  // Use the 'useNavigate' hook from 'react-router-dom' for programmatic navigation
  let navigate = useNavigate();

  // State variables to track hover state for buttons
  let [isHover1, setIsHover1] = useState(false);
  let [isHover2, setIsHover2] = useState(false);

  return (
    <>
      
      {/* Container with background image for the dashboard */}
      <Container
        fluid={true}
        style={{
          backgroundImage:
            'url("https://www.shutterstock.com/image-photo/old-books-quill-pen-vintage-600nw-1947616498.jpg")',
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "95vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        
        {/* Content within the container */}
        <div className=" text-center">
          
          {/* Button for navigating to the Bookslist page */}
          <Button
            size="lg"
            onClick={() => navigate("/books-list")}
            className={`Bookslist ${isHover1 ? "dancing" : ""}`}
            onMouseEnter={() => setIsHover1(true)}
            onMouseLeave={() => setIsHover1(false)}
          >
            Bookslist
          </Button>{" "}

          {/* Button for navigating to the Authorslist page */}
          <Button
            size="lg"
            onClick={() => navigate("/authors-list")}
            className={`Authorslist ${isHover2 ? "dancing" : ""}`}
            onMouseEnter={() => setIsHover2(true)}
            onMouseLeave={() => setIsHover2(false)}
          >
            Authorslist
          </Button>
        </div>

      </Container>

    </>
    
  );
}

export default Dashbord;
