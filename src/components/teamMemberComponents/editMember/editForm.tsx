import Box from "@mui/material/Box";
import { makeStyles } from "tss-react/mui";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import { Button } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { useRouter } from "next/router";
import { useState } from "react";

const useStyles = makeStyles()(() => {
  return {
    spaceBtwnCol: {
      marginTop: "3rem",
      width: "20rem",
    },
  };
});

const editForm = ({ memberId }) => {
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
  const router = useRouter();

  const handleSubmit = async () => {
    if (email != "" && !emailRegEx.test(email)) {
      return setError("Enter valid email");
    }

    const phoneParts = phoneNumber.split(" ");

    const res = await fetch("/api/member/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        member_id: memberId,
        first_name: firstName,
        last_name: lastName,
        email: email,
        country_code: phoneParts[0],
        state_code: phoneParts[1],
        phone_number: phoneParts[2] + phoneParts[3],
        address_line: addressLine,
        zipcode: zipcode,
        city: city,
        state: state,
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

    router.push("/teamMembers");
  };

  return (
    <>
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
          label="Address Line"
          variant="standard"
          placeholder="Address"
          value={addressLine}
          onChange={(e) => setAddressLine(e.target.value)}
        />
        <TextField
          className={classes.spaceBtwnCol}
          id="city"
          label="City"
          variant="standard"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <TextField
          className={classes.spaceBtwnCol}
          id="state"
          label="State"
          variant="standard"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />

        <TextField
          className={classes.spaceBtwnCol}
          id="zipcode"
          label="ZIP"
          variant="standard"
          placeholder="ZIP"
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
            backgroundColor: "#141c3b",
            "&:hover": {
              backgroundColor: "#253880",
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
    </>
  );
};

export default editForm;
