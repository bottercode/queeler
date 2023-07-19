import React from "react";
import Layout from "../components/Layout";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  Link as CLink,
  Button,
  Heading,
  useColorModeValue,
  useToast,
  FormErrorMessage,
  FormControl,
} from "@chakra-ui/react";
import { gql, useMutation } from "@apollo/client";
import { Formik } from "formik";

const Signup: React.FC = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  interface FormValues {
    email: string;
    password: string;
  }

  return (
    <div>
      <Layout>
        <Heading>Signup</Heading>
        <Formik
          initialValues={initialValues}
          validate={(values) => {
            const errors: Partial<FormValues> = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        ></Formik>
      </Layout>
    </div>
  );
};

export default Signup;
