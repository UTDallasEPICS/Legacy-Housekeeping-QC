import { Box, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";

interface DCButtonProps {
  linkTo: string;
  text: string;
}

const dashboardCardButton = (props: DCButtonProps) => {
  return (
    <Box sx={{ p: 1 }}>
      <Link href={props.linkTo}>
        <Button
          variant="text"
          endIcon={<ArrowForwardIcon />}
          sx={{ color: "secondary.main", width: 1 }}
        >
          {props.text}
        </Button>
      </Link>
    </Box>
  );
};

export default dashboardCardButton;
