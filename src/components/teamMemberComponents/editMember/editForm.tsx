import { Alert, Box, Button, TextField } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { makeStyles } from "tss-react/mui";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";


type MemberId = {
  memberId: string;
};

const useStyles = makeStyles()(() => {
  return {
    spaceBtwnCol: {
      marginTop: "1rem",
      marginBottom: "1rem",
      width: "25rem",
    },
  };
});

const editForm = ({ memberId }: MemberId) => {
  const emailRegEx = new RegExp(
    "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
  );
  const { classes } = useStyles();
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const response = await fetch(`/api/member/${memberId}`);
        if (!response.ok) throw new Error('Member data fetch failed');
        
        const data = await response.json();
        
        const phoneParts = data.phone_number.split(" ");
        if (phoneParts.length >= 3) {
          setCountryCode(phoneParts[0]);
          setStateCode(phoneParts[1]);
          setPhoneNumber(phoneParts.slice(2).join(" "));
        }

        setFirstName(data.first_name);
        setLastName(data.last_name);
        setEmail(data.email);
        setPhoneNumber(data.phone_number);
        setAddressLine(data.address_line);
        setCity(data.city);
        setState(data.state);
        setZipcode(data.zipcode);
      } catch (error) {
        console.error(error);
        setError('Failed to load member data.');
      }
    };
    if (memberId) {
      fetchMemberData();
    }
  }, [memberId]);


  const handleSubmit = async () => {
    if (email != "" && !emailRegEx.test(email)) {
      return setError("Enter a valid email.");
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
        phone_number:phoneParts[2] + phoneParts[3],
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
    


    router.push("/admin/teamMembers");
  };
  const handleRemoveMember = async () => {
    try {
      const res = await fetch(`/api/member/delete?memberId=${memberId}`, {
        method: "DELETE",
      });
      
      if (res.ok) {
         
        router.push("/admin/teamMembers");
      } else {
        
        const data = await res.json();
        setError(data.error);
      }
    } catch (error) {
      console.error("Error deleting member:", error);
      setError("An error occurred while deleting the member.");
    }
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
        Save Changes
      </Button>

      <Button
        className={classes.spaceBtwnCol}
        variant="contained"
        sx={{
          color: "primary.main",
          backgroundColor: "white",

        }}
  
        onClick={() => handleRemoveMember()}
      >
        Remove Member
      </Button>

      {error && (
        <Alert className={classes.spaceBtwnCol} severity="error">
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default editForm;

