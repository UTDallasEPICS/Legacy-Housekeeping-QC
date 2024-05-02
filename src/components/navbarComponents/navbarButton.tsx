import Button from "@mui/material/Button";
import Link from "next/link";

import { montserrat } from "../../theme";

interface navbarButtonProps {
  linkTo: string;
  text: string;
}

const navbarButton = (props: navbarButtonProps) => {
  return (
    <Link href={props.linkTo}>
      <Button sx={{ color: "primary", mx: 1, fontFamily: montserrat.style.fontFamily }}>
        {props.text}
      </Button>
    </Link>
  );
};

export default navbarButton;
