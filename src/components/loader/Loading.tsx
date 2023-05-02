import { CardMedia, Stack } from "@mui/material";

const Loading = () => {
  return (
    <Stack
      direction="row"
      sx={{
        height: "100vh",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CardMedia
        component="img"
        alt="Loading..."
        image="../../../loading.svg"
        sx={{
          height: { sm: "15rem", md: "20rem" },
          width: { sm: "15rem", md: "20rem" },
        }}
      />
    </Stack>
  );
};

export default Loading;
