import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState } from "react";
import axios from 'axios'

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [convictNo, setConvictNo] = useState('');
  const [cellNo, setCellNo] = useState('');
  const [message, setMessage] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios.post('../../../data/db.json', { firstName, lastName, convictNo, cellNo, message })
      .then(response => {
        setMessage('Convict registered');
        setFirstName('');
        setLastName('');
        setCellNo('');
        setConvictNo('');
        
      })
      .catch(error => {
        console.error('Convict not registered', error);
      });
  };

  return (
    <Box m="20px">
      <Header title="CONVICT FORM" subtitle="Convict profile form" />

      <Formik
        onSubmit={handleFormSubmit}
       
      >
        {() => (
          <form onSubmit={handleFormSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onChange={e => setFirstName(e.target.value)}
                value={firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onChange={e =>setLastName(e.target.value)}
                value={lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Convict ID"
                onChange={e =>setConvictNo(e.target.value)}
                value={convictNo}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Cell BLOCK"
                onChange={e =>setCellNo(e.target.value)}
                value={cellNo}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained" onClick={handleFormSubmit}>
                Submit
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
};

export default Form;