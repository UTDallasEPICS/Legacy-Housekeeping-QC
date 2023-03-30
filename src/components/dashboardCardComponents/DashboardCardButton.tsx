import { Box, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const DashboardCardButton = ({ href, text }) => {
    return (
        <Box sx={{ p: 1 }}>
            <Button href={href} variant="text" endIcon={<ArrowForwardIcon />} sx={{ color: "secondary.main", width: 1 }}>{text}</Button>
        </Box>
    );
};

export default DashboardCardButton;