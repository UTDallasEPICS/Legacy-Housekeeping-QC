import { Button, Typography, Container, Box } from "@mui/material";

//This will produce buttons for the user to select

const buildingSelection = () => {
  /*
    const nextPage = () =>{
        <Link>
            href={"/roomPages/buildingChoice"};
        </Link>
    }
*/
  return (
    <>
      <Box>
        <Button
          href="/roomPages/roomView"
          variant="outlined"
          color="primary"
          disableElevation={true}
          sx={{
            width: 280,
            height: 500,
            fontweight: "bold",
            fontSize: 40,
            border: 10,
            marginRight: 2.5,
            marginTop: 2,
          }}
        >
          Building A
        </Button>

        <Button
          href="/roomPages/roomView"
          variant="outlined"
          color="primary"
          disableElevation={true}
          sx={{
            width: 280,
            height: 500,
            fontweight: "bold",
            fontSize: 40,
            border: 10,
            marginRight: 2.5,
            marginTop: 2,
          }}
        >
          Building B
        </Button>

        <Button
          href="/roomPages/roomView"
          variant="outlined"
          color="primary"
          disableElevation={true}
          sx={{
            width: 280,
            height: 500,
            fontweight: "bold",
            fontSize: 40,
            border: 10,
            marginRight: 2.5,
            marginTop: 2,
          }}
        >
          Building C
        </Button>

        <Button
          href="/roomPages/roomView"
          variant="outlined"
          color="primary"
          disableElevation={true}
          sx={{
            width: 280,
            height: 500,
            fontweight: "bold",
            fontSize: 40,
            border: 10,
            marginRight: 2.5,
            marginTop: 2,
          }}
        >
          Building D
        </Button>
      </Box>
    </>
  );
};

export default buildingSelection;
