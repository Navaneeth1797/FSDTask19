import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import AxiosService1 from "../utilis/Authorapi/";
import { useFormik } from "formik";
import * as Yup from "yup";
import Container from "react-bootstrap/Container";

// Component for editing book details
function Bookslistedit() {
  // Use the 'useNavigate' hook from 'react-router-dom' for programmatic navigation
  let navigate = useNavigate();

  // Retrieve dynamic parameter 'id' from the URL
  let params = useParams();

  // State variable to store initial form values
  let [initialValues, setinitialValues] = useState({
    image: "",
    title: "",
    author: "",
    Isbn: "",
    publicationdate: "",
  });

  // Function to fetch book data based on the 'id' parameter
  let getData2 = async () => {
    let { id } = params;
    try {
      let res1 = await AxiosService1.get(`/bookDatabase/${id}`);
      if (res1.status === 200) {
        setinitialValues({
          image: res1.data.image,
          title: res1.data.title,
          author: res1.data.author,
          Isbn: res1.data.Isbn,
          publicationdate: res1.data.publicationdate,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Formik hook for form handling and validation
  let formik = useFormik({
    initialValues: initialValues,

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
    enableReinitialize: true,
    onSubmit: async (values) => {
      let { id } = params;
      values.id = id;
      try {
        let res1 = await AxiosService1.put(`/bookDatabase/${id}`, values);
        if (res1.status === 200) navigate("/books-list");
      } catch (error) {
        console.log(error);
      }
    },
  });

  // Use the useEffect hook to fetch data on component mount
  useEffect(() => {
    getData2();
  }, []);

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
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Form onSubmit={formik.handleSubmit}>
            {/* Form fields for editing book details */}
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

            {/* Button to submit the form and update book details */}
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </div>
      </div>
    </Container>
  );
}

export default Bookslistedit;
