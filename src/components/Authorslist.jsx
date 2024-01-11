import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import AxiosService2 from "../utilis/Authorapi/";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";

// Component for displaying a list of authors
function Authorslist() {

  // State to hold the list of authors
  let [authors, setauthors] = useState([]);

  // Use the 'useNavigate' hook from 'react-router-dom' for programmatic navigation
  let navigate = useNavigate();

  // State for hover effect
  let [isHover1, setIsHover1] = useState(false);

  // Function to fetch data from the API
  let getData1 = async () => {
    try {
      let res2 = await AxiosService2.get("/authorDatabase");
      if (res2.status === 200) {
        // Set the list of authors in the state
        setauthors(res2.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle deletion of an author
  let handeldelete = async (id) => {
    try {
      let res2 = await AxiosService2.delete(`/authorDatabase/${id}`);

      if (res2.status === 200) {
        // If deletion is successful, fetch the updated data
        getData1();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    getData1();
  }, []);

  // Render the component
  return (

    <Container
      
      fluid={true}
      style={{
        backgroundImage:
          'url("https://cdn.pixabay.com/photo/2017/08/17/22/50/typewriter-2653187_640.jpg")',
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="d-flex flex-wrap justify-content-center">
        {authors.map((e, i) => (
          <Card
            className="card1"
            style={{
              width: "18rem",
              margin: "10px",
              maxHeight: "550px",
              overflow: "hidden",
              marginTop: "9%",
            }}
            key={i}
          >
            {/* Display author details */}
            <Card.Img className="img-fluid" variant="top" src={e.image} />
            <Card.Title>Name: {e.authorname}</Card.Title>
            <Card.Text>DOB: {e.dateofbirth}</Card.Text>
            <Card.Text>Bio: {e.biography}</Card.Text>

            {/* Buttons for editing and deleting the author */}
            <div className="d-flex justify-content-around p-3">
              <Button
                style={{
                  width: "7rem",
                  backgroundColor: "#32CD32",
                  borderColor: "#32CD32",
                }}
                variant="primary"
                onClick={() => navigate(`/edit-authors/${e.id}`)}
              >
                Edit
              </Button>
              &nbsp;
              <Button
                style={{
                  width: "7rem",
                  backgroundColor: "red",
                  borderColor: "salmon",
                }}
                variant="primary"
                onClick={() => handeldelete(e.id)}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Buttons for adding a new author and navigating back */}
      <div className="d-flex justify-content-around p-3">
        <Button
          style={{ width: "7rem" }}
          className={`mt-3 ${isHover1 ? "dancing" : ""}`}
          onMouseEnter={() => setIsHover1(true)}
          onMouseLeave={() => setIsHover1(false)}
          variant="primary"
          onClick={() => navigate(`/authors-list-add`)}
          id="add"
        >
          Add
        </Button>
        <Button
          id="back"
          style={{ width: "7rem" }}
          variant="dark"
          className={`mt-3 ${isHover1 ? "dancing" : ""}`}
          onMouseEnter={() => setIsHover1(true)}
          onMouseLeave={() => setIsHover1(false)}
          onClick={() => navigate("/home")}
        >
          Back
        </Button>
      </div>
    </Container>
  );
}

export default Authorslist;
