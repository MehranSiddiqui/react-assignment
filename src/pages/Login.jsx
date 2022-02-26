import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { TextField, Button } from "@mui/material";
import * as Yup from "yup";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Card from "../components/Common/Card/Card";

const Login = () => {
    const navigateTo = useNavigate();
    const formik = useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: Yup.object({
        email: Yup.string()
          .email("Invalid Email address")
          .required("This Field is Required"),
        password: Yup.string().required("This Field is Required"),
      }),
  
      onSubmit: async (values) => {
        try {
          const { email, password } = values;
          const auth = getAuth();
          const userCredentials = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          if(userCredentials.user){
            alert('Success');
            navigateTo('/');
          }
        } catch (error) {
          console.log(error);
        }
      },
    });
  
    return (
      <Card className="data-form">
        <h1>Please Login</h1>
        <form onSubmit={formik.handleSubmit} className="data-form">
          <TextField
            fullWidth
            id="email"
            name="email"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.email}
            label="Email"
            className="text-field"
          />
          {formik.errors.email ? <div>{formik.errors.email}</div> : null}
          <TextField
            fullWidth
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            label="Password"
            className="text-field"
          />
          {formik.errors.password ? <div>{formik.errors.password}</div> : null}
  
          <Button variant="outlined" type="submit" className="button-theme">
            Login
          </Button>
        </form>
      </Card>
    );
  };
  
  export default Login;
  