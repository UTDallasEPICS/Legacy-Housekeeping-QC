import { Typography, Box, Button, TextField } from "@mui/material";
import { InspectionCheckBox } from "../src/components";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { pbkdf2 } from "crypto";

const report = () => {
  const router = useRouter();
  const report = router.query;
  const [comments, setComment] = useState("");
  let comment = "";
  const commentRef = useRef();

  const readCommentVal = () => {
    comment = commentRef.current;
    console.log(comment);
  };

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handle = async () => {
    const res = await fetch("/api/roomReport/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        team_member_id: report.team_member_id,
        room_id: report.room_id,
        cleaned: true,
        comments: comments,
        score: 90,
      }),
    });

    setComment("");

    router.push("/inspections");
  };

  //create conditional return for report, add comment and submission button funcitonlity with api, have reports move
  const Condition = ({
    isClean,
    remainingReport,
    completeReport,
  }: {
    isClean: any;
    remainingReport: any;
    completeReport: any;
  }) => {
    if (isClean == "true") return <>{completeReport}</>;
    return <>{remainingReport}</>;
  };

  return (
    <Condition
      isClean={report.cleaned}
      remainingReport={
        <>
          <Box
            sx={{ pt: 3, m: 1 }}
            display={"inline-flex"}
            justifyContent="flex-start"
            alignItems="flex-start"
            flexDirection="column"
          >
            <Typography>Room: {report.room_number} </Typography>
            <Typography>Building Number: {report.building_number} </Typography>
            <Typography> Time: {report.date} </Typography>
            <Typography>
              {" "}
              House Keeper: {report.first_name + " " + report.last_name}{" "}
            </Typography>

            <InspectionCheckBox />
          </Box>

          <Box
            display="inline-flex"
            justifyContent="flex-start"
            alignItems="flex-start"
            flexDirection="column"
            sx={{ ml: 2 }}
          >
            <Typography>Comments:</Typography>
            <TextField
              id="comments"
              label="Comments"
              variant="outlined"
              sx={{ pb: 2}}
              //value={comments} **********************************************************************************************************************
              //onChange={handleChange}
            />
            <Button
              onClick={handle}
              href="/admin/inspections" //Check why this is so slow to go back to the inspections page
              sx={{ display: "flex", justifyContent: "flex-start" }}
              variant="contained"
            >
              Submit
            </Button>
          </Box>
        </>
      }
      completeReport={
        <>
          <Box
            sx={{ pt: 3, m: 1 }}
            display={"inline-flex"}
            justifyContent="flex-start"
            alignItems="flex-start"
            flexDirection="column"
          >
            <Typography>Room: {report.room_number} </Typography>
            <Typography>Building Number: {report.building_number} </Typography>
            <Typography> Time: {report.date} </Typography>
            <Typography>
              {" "}
              House Keeper: {report.first_name + " " + report.last_name}{" "}
            </Typography>

            <InspectionCheckBox />
          </Box>

          <Box
            display="inline-flex"
            justifyContent="flex-start"
            alignItems="flex-start"
            flexDirection="column"
            sx={{ ml: 2 }}
          >
            <Typography>Comments:</Typography>
            <Typography>{report.comments}</Typography>

            <Button
              onClick={handle}
              href="/admin/inspections" //Check why this is so slow to go back to the inspections page
              sx={{ display: "flex", justifyContent: "flex-start" }}
              variant="contained"
            >
              Back
            </Button>
          </Box>
        </>
      }
    ></Condition>
  );
};

export default report;
