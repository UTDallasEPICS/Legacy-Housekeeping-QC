import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const DashboardCardHeading = ({ title }) => {
    return (
        <Box sx={
            {
                bgcolor: "primary.main",
                p: 2
            }
        }>
            <Typography variant="h5" sx={
                {
                    color: "primary.contrastText",
                    fontWeight: "bold",
                }
            }>
                {title}
            </Typography>
        </Box>
    );
};

export default DashboardCardHeading;