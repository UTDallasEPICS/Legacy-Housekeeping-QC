import { Button } from "@mui/material";

const MemberButton = ({ member, onClick }) => {
  return (
    <Button
      variant="outlined"
      onClick={() => onClick(member)}
      sx={{
        fontWeight: "bold",
        fontSize: "clamp(10px, calc(2vw + 10px), 50px)",
        backgroundColor: "#FFFFFF",
        width: "min(20vw, 275px)",
        height: "min(20vh, 200px)",
        //min(20vw, 400px) //400px
       
        borderRadius: "10px",
        border: "solid",
        borderColor: "#141c3b",
        marginBottom: "5px",
        marginTop: "0px",
        
      }}
    >
      {member}
    </Button>
  );
};

export default MemberButton;
