import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashbord from "./components/Dashbord/";
import Bookslist from "./components/Bookslist/";
import Bookslistedit from "./components/Bookslistedit/";
import Authorslist from "./components/Authorslist/";
import Authorslistedit from "./components/Authorslistedit";
import Topbar from "./components/Topbar";
import Authorslistadd from "./components/Authorslistadd";
import Bookslistadd from "./components/Bookslistadd";

function App() {
  // Render the main App component

  return (
    <>
      {/* Setup the React Router with BrowserRouter */}
      <Router>
        {/* Include the Topbar component for navigation */}
        <Topbar />
        {/* Define the Routes for different components */}
        <Routes>
          {/* Route for the dashboard */}
          <Route path="/home" element={<Dashbord />} />
          {/* Route for the Bookslist component */}
          <Route path="/books-list" element={<Bookslist />} />
          {/* Route for adding a new book */}
          <Route path="/books-list-add" element={<Bookslistadd />} />
          {/* Route for editing a book with dynamic parameter id */}
          <Route path="/edit-books/:id" element={<Bookslistedit />} />
          {/* Route for the Authorslist component */}
          <Route path="/authors-list" element={<Authorslist />} />
          {/* Route for adding a new author */}
          <Route path="/authors-list-add" element={<Authorslistadd />} />
          {/* Route for editing an author with dynamic parameter id */}
          <Route path="/edit-authors/:id" element={<Authorslistedit />} />
          {/* Default route, navigate to /home if no match is found */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
