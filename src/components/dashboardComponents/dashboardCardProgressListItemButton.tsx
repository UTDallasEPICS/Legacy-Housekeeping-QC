import { ListItemButton, ListItemText } from "@mui/material";

interface DCPListItemButtonProps {
  memberName: string;
  scoreChange: number;
}

const dashboardCardProgressListItemButton = (props: DCPListItemButtonProps) => {
  let scoreChangeColor;

  if (props.scoreChange > 0) {
    scoreChangeColor = "success.main";
  } else {
    scoreChangeColor = "grey.500";
  }

  return (
    <ListItemButton sx={{ px: 4 }}>
      <ListItemText primary={props.memberName} />
      <ListItemText
        disableTypography
        primary={props.scoreChange}
        sx={{
          textAlign: "right",
          fontWeight: "bold",
          color: scoreChangeColor,
        }}
      />
    </ListItemButton>
  );
};

export default dashboardCardProgressListItemButton;
