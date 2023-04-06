import { Button, Typography, Container, Box } from "@mui/material";
import { setBuilding } from "../../../../slices/buildingSelectSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";

//This will produce buttons for the user to select

const buildingCards = () => {
  const dispatch = useDispatch();

  //When we click a button, we call a reducer to change the state of the building we select
  const handleClick = (building: string) => {
    dispatch(setBuilding(building));
  };

  return (
    <>
      <Box>
        <Button
          onClick={(e) => {
            e.preventDefault();
            handleClick("A");
          }}
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
          onClick={() => handleClick("B")}
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
          onClick={() => handleClick("C")}
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
          onClick={() => handleClick("D")}
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

export default buildingCards;
