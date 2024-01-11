import React, { useEffect, useState } from "react";
import AxiosService1 from "../utilis/Booksapi/";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";

// Component for displaying a list of books
function Bookslist() {

  // State to hold the list of books
  let [bookDatabase, setbookDatabase] = useState([]);

  // Use the 'useNavigate' hook from 'react-router-dom' for programmatic navigation
  let navigate = useNavigate();

  // State for hover effect
  let [isHover1, setIsHover1] = useState(false);

  // Function to fetch data from the API
  let getData2 = async () => {
    try {
      let res1 = await AxiosService1.get("/bookDatabase");

      if (res1.status === 200) {
        // Set the list of books in the state
        setbookDatabase(res1.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle deletion of a book
  let handeldelete = async (id) => {
    try {
      let res1 = await AxiosService1.delete(`/bookDatabase/${id}`);

      if (res1.status === 200) {
        // If deletion is successful, fetch the updated data
        getData2();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    getData2();
  }, []);

  // Render the component
  return (
    
    <Container
      fluid={true}
      style={{
        backgroundImage:
          'url("https://img.freepik.com/premium-photo/opened-book-with-flying-pages-butterflies-dark-backgroundgenerative-ai_391052-12859.jpg")',
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
      }}
    >
      <div className="d-flex flex-wrap justify-content-center">
        {bookDatabase.map((e, i) => (
          <Card
            className="card2"
            style={{
              width: "18rem",
              margin: "10px",
              maxHeight: "750px",
              overflow: "hidden",
              marginTop: "9%",
            }}
            key={i}
          >
            {/* Display book details */}
            <Card.Img variant="top" className="img-fluid" src={e.image} />
            <Card.Body>
              <Card.Title> Title:{e.title}</Card.Title>
              <Card.Text>Author:{e.author}</Card.Text>
              <Card.Text>ISBN No:{e.Isbn}</Card.Text>
              <Card.Text>Publication Date:{e.publicationdate}</Card.Text>
            </Card.Body>
            {/* Buttons for editing and deleting the book */}
            <div className="d-flex justify-content-around p-3">
              <Button
                style={{
                  width: "7rem",
                  backgroundColor: "#32CD32",
                  borderColor: "#32CD32",
                }}
                variant="primary"
                onClick={() => navigate(`/edit-books/${e.id}`)}
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
      {/* Buttons for adding a new book and navigating back */}
      <div className="d-flex justify-content-around p-3">
        <Button
          style={{ width: "7rem" }}
          className={`mt-3 ${isHover1 ? "dancing" : ""}`}
          onMouseEnter={() => setIsHover1(true)}
          onMouseLeave={() => setIsHover1(false)}
          variant="primary"
          onClick={() => navigate(`/books-list-add`)}
          id="add"
        >
          Add
        </Button>
        &nbsp;
        <Button
          variant="dark"
          style={{ width: "7rem" }}
          className={`mt-3 ${isHover1 ? "dancing" : ""}`}
          onMouseEnter={() => setIsHover1(true)}
          onMouseLeave={() => setIsHover1(false)}
          onClick={() => navigate("/home")}
          id="back"
        >
          Back
        </Button>
      </div>
    </Container>
  );
}

export default Bookslist;
