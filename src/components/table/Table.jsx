import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {rows} from "../../homepagedata.js"

const List = () => {
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Serial No.</TableCell>
            <TableCell className="tableCell">Current (A)</TableCell>
            <TableCell className="tableCell">Voltage (V)</TableCell>
            <TableCell className="tableCell">Power (W)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.serialNo}</TableCell>
              <TableCell className="tableCell">{row.current}</TableCell>
              <TableCell className="tableCell">{row.voltage}</TableCell>
              <TableCell className="tableCell">{row.power}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
