import { Button } from "@mui/material";
import Link from "next/link";

//When you call the button, format the call like this: <BackButton pageToGoBack={"Insert what page you want to go to"}/>
const backButton = ({ pageToGoBack }) => {
  return (
    <>
      {/*When user clicks back button, it brings them to the page its assigned* implement like this <BackButton pageToGoBack={"EnterRoom"}/>/*/}
      <Link href={pageToGoBack}>
        <Button variant="outlined">Back</Button>
      </Link>
    </>
  );
};
export default backButton;
