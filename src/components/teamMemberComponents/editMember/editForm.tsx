import { Alert, Box, Button, TextField } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { makeStyles } from "tss-react/mui";
import { useDispatch } from "react-redux";
import { setMemberProfile } from "../../../../slices/memberProfileSlice";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { format } from "path";
import {
  formatPhoneNumberForApi,
  formatPhoneNumberForDisplay,
} from "../../../../functions/phoneNumber";

type MemberId = {
  memberId: number;
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
  console.log(memberId);
  const dispatch = useDispatch();

  const emailRegEx = new RegExp(
    "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
  );
  const { classes } = useStyles();
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const response = await fetch(`/api/member/${memberId}`);
        if (!response.ok) throw new Error("Member data fetch failed");

        const data = await response.json();

        setPhoneNumber(
          formatPhoneNumberForDisplay(
            data.country_code,
            data.state_code,
            data.phone_number
          )
        );

        setFirstName(data.first_name);
        setLastName(data.last_name);
        setEmail(data.email);
      } catch (error) {
        console.error(error);
        setError("Failed to load member data.");
      }
    };
    if (memberId) {
      fetchMemberData();
    }
  }, [memberId]);

  const clearMemberSelection = () => {
    dispatch(
      setMemberProfile({
        firstName
      })
    );
  }

  const handleSubmit = async () => {
    if (email != "" && !emailRegEx.test(email)) {
      return setError("Enter a valid email.");
    }

    const phoneParts = formatPhoneNumberForApi(phoneNumber);

    const res = await fetch("/api/member/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: memberId,
        first_name: firstName,
        last_name: lastName,
        email: email,
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

    clearMemberSelection();
    router.push("/admin/teamMembers");
  };

  const handleRemoveMember = async () => {
    try {
      const res = await fetch(`/api/member/delete?id=${memberId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        clearMemberSelection();
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
        variant="outlined"
        value={firstName}
        InputLabelProps={{ style: { color: "#6A172E" } }}
        sx={{ width: "30vh", bgcolor: "white", color: "text.primary" }}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <TextField
        className={classes.spaceBtwnCol}
        id="lastName"
        label="Last Name"
        variant="outlined"
        value={lastName}
        InputLabelProps={{ style: { color: "#6A172E" } }}
        sx={{ width: "30vh", bgcolor: "white", color: "text.primary" }}
        onChange={(e) => setLastName(e.target.value)}
      />

      <TextField
        className={classes.spaceBtwnCol}
        id="email"
        label="Email"
        variant="outlined"
        value={email}
        InputLabelProps={{ style: { color: "#6A172E" } }}
        sx={{ width: "30vh", bgcolor: "white", color: "text.primary" }}
        onChange={(e) => setEmail(e.target.value)}
      />

      <MuiTelInput
        className={classes.spaceBtwnCol}
        id="phoneNumber"
        variant="outlined"
        label="Phone Number"
        onlyCountries={["US", "MX", "CA"]}
        inputProps={{ maxLength: 15 }}
        value={phoneNumber}
        InputLabelProps={{ style: { color: "#6A172E" } }}
        sx={{ width: "30vh", bgcolor: "white", color: "text.primary" }}
        onChange={(e) => setPhoneNumber(e)}
      />

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
        Save Changes
      </Button>

      <Button
        className={classes.spaceBtwnCol}
        variant="contained"
        sx={{
          border: 3,
          borderColor: "secondary.main",
          color: "secondary.main",
          bgcolor: "white",
          "&:hover": {
            border: 3,
            borderColor: "secondary.main",
            color: "white",
            bgcolor: "secondary.main",
          },
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