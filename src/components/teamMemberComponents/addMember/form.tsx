import { Alert, Box, Button, TextField } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { makeStyles } from "tss-react/mui";
import formValidation from "./formValidation";
import { useState } from "react";

const useStyles = makeStyles()(() => {
  return {
    spaceBtwnCol: {
      marginTop: "1rem",
      marginBottom: "1rem",
      width: "25rem",
    },
  };
});

const form = () => {
  const emailRegEx = new RegExp(
    "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
  );
  const { classes } = useStyles();
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");

  const handleSubmit = async () => {
    const phoneParts = phoneNumber.split(" ");
    const resCheck = formValidation(
      email,
      emailRegEx,
      firstName,
      lastName,
      addressLine,
      city,
      state,
      zipcode,
      phoneNumber
    );

    if (resCheck) {
      setError(resCheck);
      return;
    }

    const res = await fetch("/api/member/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email,
        country_code: phoneParts[0],
        state_code: phoneParts[1],
        phone_number: phoneParts[2] + phoneParts[3],
        address_line: addressLine,
        zipcode,
        city,
        state,
      }),
    });

    if (!res.ok) {
      const r = await res.json();
      setError(r.error);
      return;
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setAddressLine("");
    setCity("");
    setState("");
    setZipcode("");
    setPhoneNumber("");
  };

  return (
    <Box
      component="form"
      autoComplete="off"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <TextField
        className={classes.spaceBtwnCol}
        id="firstName"
        label="First Name"
        variant="standard"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <TextField
        className={classes.spaceBtwnCol}
        id="lastName"
        label="Last Name"
        variant="standard"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      <TextField
        className={classes.spaceBtwnCol}
        id="email"
        label="Email"
        variant="standard"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        className={classes.spaceBtwnCol}
        id="addressLine"
        label="Address"
        variant="standard"
        value={addressLine}
        onChange={(e) => setAddressLine(e.target.value)}
      />

      <TextField
        className={classes.spaceBtwnCol}
        id="city"
        label="City"
        variant="standard"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <TextField
        className={classes.spaceBtwnCol}
        id="state"
        label="State"
        variant="standard"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />

      <TextField
        className={classes.spaceBtwnCol}
        id="zipcode"
        label="ZIP Code"
        variant="standard"
        inputProps={{ maxLength: 5 }}
        value={zipcode}
        onChange={(e) => setZipcode(e.target.value)}
      />

      <MuiTelInput
        className={classes.spaceBtwnCol}
        id="phoneNumber"
        variant="standard"
        label="Phone Number"
        onlyCountries={["US", "MX", "CA"]}
        inputProps={{ maxLength: 15 }}
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e)}
      />

      <Button
        className={classes.spaceBtwnCol}
        variant="contained"
        sx={{
          color: "white",
          backgroundColor: "primary.main",
        }}
        onClick={() => handleSubmit()}
      >
        Submit
      </Button>

      {error && (
        <Alert className={classes.spaceBtwnCol} severity="error">
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default form;
