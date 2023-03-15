import { Box, Button } from "@mui/material";

const DashboardCardButton = ({ text }) => {
    return (
        <Box sx={{ p: 1 }}>
            <Button variant="text" sx={{ color: "secondary.main", width: 1 }}>{text}</Button>
        </Box>
    );
};

export default DashboardCardButton;