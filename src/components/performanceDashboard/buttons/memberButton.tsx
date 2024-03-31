import { Button } from "@mui/material";

const MemberButton = ({ member, onClick }) => {
  return (
    <Button
      variant="outlined"
      onClick={() => onClick(member)}
      sx={{
        backgroundColor: "white",
        width: "min(20vw, 275px)",
        height: "min(10vh, 200px)",
        fontWeight: "bold",
        fontSize: "clamp(10px, calc(2vw + 10px), 40px)",
        textTransform: "none",
        lineHeight: "1", 
        borderRadius: "10px",
        border: "2px solid",
        borderColor: "primary",
        marginBottom: "10px",
        "&:hover": {
          backgroundColor: "primary.main", 
          border: "solid",
          borderColor: "primary.main",
          color: "white",
        },
      }}
    >
      {`${member.first_name} ${member.last_name}`}
    </Button>
  );
};

export default MemberButton;
