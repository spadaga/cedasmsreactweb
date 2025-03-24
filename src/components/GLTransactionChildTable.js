import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow,styled } from '@mui/material';




function GLTransactionChildTable({ details }) {

    const ParentTableHeader = styled(TableHead)(({ theme }) => ({
        backgroundColor: '#e0e0e0', // Light gray background for parent header
        '& .MuiTableCell-head': {
          fontWeight: 'bold', // Bold font for header cells
          padding: theme.spacing(1.5), // Add padding
        },
      }));
  return (
    <Table size="small" aria-label="product details">
      <ParentTableHeader>
        <TableRow>
          <TableCell>PC/ACCOUNT</TableCell>
          <TableCell>VENDOR CODE</TableCell>
          <TableCell>PRICE</TableCell>
          <TableCell>VENDOR NAME</TableCell>
        </TableRow>
      </ParentTableHeader>
      <TableBody>
        {details.map((detail) => (
          <TableRow key={detail.PC_ACCOUNT}>
            <TableCell component="th" scope="row">
              {detail.PC_ACCOUNT}
            </TableCell>
            <TableCell>{detail.VENDOR_CODE}</TableCell>
            <TableCell>{detail.PRICE}</TableCell>
            <TableCell>{detail.VENDOR_NAME}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default GLTransactionChildTable;