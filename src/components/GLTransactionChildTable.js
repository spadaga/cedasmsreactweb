import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";
import { useThemeContext } from "../context/ThemeContext";

function GLTransactionChildTable({ details }) {
  const { darkMode } = useThemeContext();

  const ParentTableHeader = styled(TableHead)(({ theme }) => ({
    backgroundColor: darkMode ? "#333" : "#e0e0e0",
    "& .MuiTableCell-head": {
      fontWeight: "bold",
      padding: theme.spacing(1.5),
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    backgroundColor: darkMode ? "#222" : "#fff", // Darker background for rows in dark mode
    "&:nth-of-type(odd)": {
      backgroundColor: darkMode ? "#282828" : "#f9f9f9", // Slightly different shade for odd rows
    },
  }));

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    color: darkMode ? "#fff" : "#000", // White text in dark mode, black in light mode
  }));

  return (
    <Table size="small" aria-label="product details">
      <ParentTableHeader>
        <TableRow>
          <StyledTableCell>PC/ACCOUNT</StyledTableCell>
          <StyledTableCell>VENDOR CODE</StyledTableCell>
          <StyledTableCell>PRICE</StyledTableCell>
          <StyledTableCell>VENDOR NAME</StyledTableCell>
        </TableRow>
      </ParentTableHeader>
      <TableBody>
        {details.map((detail) => (
          <StyledTableRow key={detail.PC_ACCOUNT}>
            <StyledTableCell component="th" scope="row">
              {detail.PC_ACCOUNT}
            </StyledTableCell>
            <StyledTableCell>{detail.VENDOR_CODE}</StyledTableCell>
            <StyledTableCell>{detail.PRICE}</StyledTableCell>
            <StyledTableCell>{detail.VENDOR_NAME}</StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default GLTransactionChildTable;