import { ListItemButton, ListItemText } from "@mui/material";

const DashboardCardProgressListItemButton = ({ teamMemberName, teamMemberId, scoreChange, type }) => {
    let scoreChangeColor;

    if (type === "onTheRise") {
        scoreChangeColor = "success.main";
    }
    else if (type === "declining") {
        scoreChangeColor = "grey.500";
    }

    return (
        <ListItemButton sx={{ px: 4 }}>
            <ListItemText
                primary={teamMemberName} secondary={"#" + teamMemberId}
            />
            <ListItemText disableTypography primary={scoreChange} sx={{ textAlign: "right", fontWeight: "bold", color: scoreChangeColor }}
            />
        </ListItemButton>
    );
};

export default DashboardCardProgressListItemButton;