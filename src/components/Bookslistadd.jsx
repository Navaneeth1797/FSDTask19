import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import AxiosService1 from "../utilis/Authorapi/";
import { useFormik } from "formik";
import * as Yup from "yup";

// Component for adding a new book to the list
function Bookslistadd() {

  // Use the 'useNavigate' hook from 'react-router-dom' for programmatic navigation
  let navigate = useNavigate();

  // Formik hook for form handling and validation
  let formik = useFormik({
    initialValues: {
      image: "",
      title: "",
      author: "",
      Isbn: "",
      publicationdate: "",
    },

    // Validation schema using Yup
    validationSchema: Yup.object({
      image: Yup.string().url(),

      title: Yup.string()
        .required("Name is required")
        .max(20, "Name can not exceed 20 characters")
        .min(3, "Name can not be shorter than 3 leters"),
      author: Yup.string()
        .required("Name is required")
        .max(20, "Name can not exceed 20 characters")
        .min(3, "Name can not be shorter than 3 leters"),
      Isbn: Yup.string()
        .matches(/^\d{13}$/, " Enter a valid 13 digit ISBN Number")
        .required("ISBN Number is required"),
      publicationdate: Yup.string().required("Published date is required"),
    }),

    // Submission logic
    onSubmit: async (values) => {

      try {
        // Make a POST request to add a new book
        let res1 = await AxiosService1.post("/bookDatabase", values);
        if (res1.status === 201) {
          // If successful, navigate to the 'books-list' page
          navigate("/books-list");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <div
          className="container-fluid"
          style={{
            backgroundImage:
              'url("https://img.freepik.com/premium-photo/opened-book-with-flying-pages-butterflies-dark-backgroundgenerative-ai_391052-12859.jpg")',
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
          }}
        >
          <Form onSubmit={formik.handleSubmit}>
            
            {/* Form fields for adding a new book */}
            <Form.Group className="mb-3">
              <Form.Label style={{ color: "whitesmoke" }}>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="image"
                name="image"
                value={formik.values.image}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />

              {formik.touched.image && formik.errors.image ? (
                <p style={{ color: "red" }}>{formik.errors.image}</p>
              ) : (
                ""
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "whitesmoke" }}>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                id="title"
                name="title"
                onChange={formik.handleChange}
                value={formik.values.title}
                onBlur={formik.handleBlur}
              />
              {formik.touched.title && formik.errors.title ? (
                <div style={{ color: "red" }}>{formik.errors.title}</div>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "whitesmoke" }}>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Author"
                id="author"
                name="author"
                onChange={formik.handleChange}
                value={formik.values.author}
                onBlur={formik.handleBlur}
              />
              {formik.touched.author && formik.errors.author ? (
                <div style={{ color: "red" }}>{formik.errors.author}</div>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "whitesmoke" }}>Isbn no</Form.Label>
              <Form.Control
                type="text"
                placeholder="Isbn numb"
                id="Isbn"
                name="Isbn"
                onChange={formik.handleChange}
                value={formik.values.Isbn}
                onBlur={formik.handleBlur}
              />
              {formik.touched.Isbn && formik.errors.Isbn ? (
                <div style={{ color: "red" }}>{formik.errors.Isbn}</div>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "whitesmoke" }}>
                Publication Date
              </Form.Label>
              <Form.Control
                type="date"
                placeholder="year"
                id="publicationdate"
                name="publicationdate"
                onChange={formik.handleChange}
                value={formik.values.publicationdate}
                onBlur={formik.handleBlur}
              />
              {formik.touched.publicationdate &&
              formik.errors.publicationdate ? (
                <div style={{ color: "red" }}>
                  {formik.errors.publicationdate}
                </div>
              ) : null}
            </Form.Group>

            <Button variant="primary" type="submit">
              Add
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Bookslistadd;
