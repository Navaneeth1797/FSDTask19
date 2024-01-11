import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import AxiosService2 from "../utilis/Authorapi/";
import { useFormik } from "formik";
import * as Yup from "yup";

// Component for editing an existing author
function Authorslistedit() {

  // Get URL parameters using 'useParams' hook from 'react-router-dom'
  let params = useParams();

  // State to hold the initial values of the author
  let [initialValues, setinitialValues] = useState({
    image: "",
    authorname: "",
    dateofbirth: "",
    biography: "",
  });

  // Function to fetch existing author data from the API
  let getData1 = async () => {
    let { id } = params;
    try {
      let res2 = await AxiosService2.get(`/authorDatabase/${id}`);
      if (res2.status === 200) {
        // Set the initial values of the author in the state
        setinitialValues({
          image: res2.data.image,
          authorname: res2.data.authorname,
          dateofbirth: res2.data.dateofbirth,
          biography: res2.data.biography,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Formik hook for form management
  let formik = useFormik({

    // Set initial values from the state
    initialValues: initialValues,

    // Validation schema using Yup
    validationSchema: Yup.object({
      image: Yup.string().url(),
      authorname: Yup.string()
        .required("Name is required")
        .max(20, "Name can not exceed 20 characters")
        .min(3, "Name can not be shorter than 3 leters"),
      dateofbirth: Yup.string().required("Dob is required"),
      biography: Yup.string()
        .required("Bio is required")
        .min(10, "Bio cannot be shorter than 10 characters"),
    }),

    // Enable reinitialization when initial values change
    enableReinitialize: true,

    // Form submission function
    onSubmit: async (values) => {
      let { id } = params;
      values.id = id;
      try {
        let res2 = await AxiosService2.put(`/authorDatabase/${id}`, values);
        if (res2.status === 200) navigate("/authors-list");
      } catch (error) {
        console.log(error);
      }
    },
  });

  // Use the 'useNavigate' hook from 'react-router-dom' for programmatic navigation
  let navigate = useNavigate();

  // Fetch data when the component mounts
  useEffect(() => {
    getData1();
  }, []);

  // Render the component
  return (

    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <div
          className="container-fluid"
          style={{
            backgroundImage:
              'url("https://cdn.pixabay.com/photo/2017/08/17/22/50/typewriter-2653187_640.jpg")',
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          
          {/* Form for editing an existing author */}
          <Form onSubmit={formik.handleSubmit}>
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
              <Form.Label style={{ color: "whitesmoke" }}>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                id="authorname"
                name="authorname"
                onChange={formik.handleChange}
                value={formik.values.authorname}
                onBlur={formik.handleBlur}
              />
              {formik.touched.authorname && formik.errors.authorname ? (
                <div style={{ color: "red" }}>{formik.errors.authorname}</div>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "whitesmoke" }}>dob</Form.Label>
              <Form.Control
                type="date"
                placeholder="Dob"
                id="dateofbirth"
                name="dateofbirth"
                onChange={formik.handleChange}
                value={formik.values.dateofbirth}
                onBlur={formik.handleBlur}
              />
              {formik.touched.dateofbirth && formik.errors.dateofbirth ? (
                <div style={{ color: "red" }}>{formik.errors.dateofbirth}</div>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "whitesmoke" }}>bio</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="bio"
                id="biography"
                name="biography"
                onChange={formik.handleChange}
                value={formik.values.biography}
                onBlur={formik.handleBlur}
              />
              {formik.touched.biography && formik.errors.biography ? (
                <div style={{ color: "red" }}>{formik.errors.biography}</div>
              ) : null}
            </Form.Group>

            {/* Button to submit the form and update the author */}
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </div>
      </div>
    </div>

  );
  
}

export default Authorslistedit;
