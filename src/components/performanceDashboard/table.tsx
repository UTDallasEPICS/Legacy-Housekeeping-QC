import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

function createData(member: string, score: number) {
  return { member, score };
}

const rows = [
  createData("Floors", 100),
  createData("Restock", 100),
  createData("Couch", 62),
  createData("Bed", 33),
];

//maxHeight: { xs: "200px", sm: "200px", md: "45vh", lg: "50vh"},
//maxHeight: { xs: "10px", sm: "15px", md: "30px", lg: "30px"},
//maxWidth: { xs: "150px", sm: "100px", md: "150px", lg: "200px" }
//maxWidth: { xs: "150px", sm: "150px", md: "150px", lg: "200px" }, height: { xs: "150px", sm: "20vh", md: "30vh", lg: "35vh"},

const MemberTable = () => {
  return (
    <Paper>
    <TableContainer sx={{overflowX: "auto"}}>
      <Table sx={{ minWidth: { xs: "150px", sm: "150px", md: "150px", lg: "200px" }, height: { xs: "150px", sm: "20vh", md: "30vh", lg: "35vh"}}}>
        <TableHead sx={{backgroundColor: "#141c3b"}}>
          <TableRow>
            <TableCell sx={{color: "#FFFFFF"}}>
              <Typography sx={{fontSize: { xs: 13, sm: 14, md: 16, lg: 18 } }}>
              Trend Data</Typography></TableCell>
            <TableCell sx={{color: "#FFFFFF"}} align="right">
            <Typography sx={{ fontSize: { xs: 13, sm: 14, md: 16, lg: 18 } }}>
              Average Score</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.member}>
              <TableCell component="th" scope="row">
                {row.member}
              </TableCell>
              <TableCell align="right">{row.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
  );
};

export default MemberTable;
