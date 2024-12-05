import { Alert, Box, Button, TextField } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { makeStyles } from "tss-react/mui";
import formValidation from "./formValidation";
import { useState } from "react";
import { useRouter } from "next/router";
import {
  formatPhoneNumberForApi,
  stripPhoneNumber,
} from "../../../../functions/phoneNumber";

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
    /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/
  );
  const { classes } = useStyles();
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    const phoneParts = formatPhoneNumberForApi(phoneNumber);
    const resCheck = formValidation(
      email,
      emailRegEx,
      firstName,
      lastName,
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
        country_code: phoneParts.country_code,
        state_code: phoneParts.state_code,
        phone_number: phoneParts.phone_number,
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
    setPhoneNumber("");

    router.push("/admin/teamMembers");
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
        placeholder="John"
        label="First Name"
        variant="outlined"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        InputLabelProps={{ style: { color: "#6A172E" } }}
        sx={{ width: "30vh", bgcolor: "white", color: "text.primary" }}
      />

      <TextField
        className={classes.spaceBtwnCol}
        id="lastName"
        placeholder="Doe"
        label="Last Name"
        variant="outlined"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        InputLabelProps={{ style: { color: "#6A172E" } }}
        sx={{ width: "30vh", bgcolor: "white", color: "text.primary" }}
      />

      <TextField
        className={classes.spaceBtwnCol}
        id="email"
        placeholder="jdoe@gmail.com"
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        InputLabelProps={{ style: { color: "#6A172E" } }}
        sx={{ width: "30vh", bgcolor: "white", color: "text.primary" }}
      />

      <MuiTelInput
        className={classes.spaceBtwnCol}
        id="phoneNumber"
        placeholder="123 456 7890"
        variant="outlined"
        label="Phone Number"
        onlyCountries={["US", "MX", "CA"]}
        inputProps={{ maxLength: 15 }}
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e)}
        InputLabelProps={{ style: { color: "#6A172E" } }}
        sx={{ width: "30vh", bgcolor: "white", color: "text.primary" }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}      />

      <Button
        className={classes.spaceBtwnCol}
        variant="contained"
        sx={{
          border: 3,
          borderColor: "primary.main",
          color: "primary.main",
          bgcolor: "white",
          "&:hover": {
            border: 3,
            borderColor: "primary.main",
            color: "white",
            bgcolor: "primary.main",
          },
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
