import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Paper,
} from "@mui/material";
import React from "react";

const TableCollapseCustomComponent = ({ cols, children, loadingTable }) => {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              {cols.map((col) => (
                <TableCell align="center" key={col + "-"}>
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableCollapseCustomComponent;
