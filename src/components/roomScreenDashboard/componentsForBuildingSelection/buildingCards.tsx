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

  //Each button represents a certain building
  return (
    <>
      <Box>
        <Link href="/admin/roomPages/roomView?building=A" passHref>
          <Button
            onClick={() => handleClick("A")}
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
        </Link>

        <Link href="/admin/roomPages/roomView?building=B" passHref>
          <Button
            onClick={() => handleClick("B")}
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
        </Link>

        <Link href="/admin/roomPages/roomView?building=C" passHref>
          <Button
            onClick={() => handleClick("C")}
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
        </Link>
        <Link href="/admin/roomPages/roomView?building=D" passHref>
          <Button
            onClick={() => handleClick("D")}
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
        </Link>
      </Box>
    </>
  );
};

export default buildingCards;

/*
            onClick={(e) => {
              e.preventDefault();
              handleClick("A");
            }}
*/
