import Button from "@mui/material/Button";
import Link from "next/link";

interface navbarButtonProps {
  linkTo: string;
  text: string;
}

/*
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
*/

const navbarButton = (props: navbarButtonProps) => {
  return (
    <Link href={props.linkTo}>
      <Button sx={{ color: "primary.contrastText", mx: 1 }}>
        {props.text}
      </Button>
    </Link>
  );
};

export default navbarButton;
