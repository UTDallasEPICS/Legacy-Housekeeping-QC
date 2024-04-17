import { CardMedia, Stack } from "@mui/material";
import theme from "../../../pages/theme";

const Loading = () => {
  return (
    <Stack
      direction="row"
      sx={{
        height: "100vh",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: theme.palette.background.default,
      }}
    >
      <CardMedia
        component="img"
        alt="Loading..."
        image="../../../loading.svg"
        sx={{
          height: { sm: "15rem", md: "15rem" },
          width: { sm: "30rem", md: "30rem" },
        }}
      />
    </Stack>
  );
};

export default Loading;
