import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { useThemeContext } from '../context/ThemeContext';

function GLBillMemoLinesComponent() {

  const {darkMode} = useThemeContext()
  const memoLines = [
    {
      seqNo: 1,
      description:
        'Cash discount 4.91 off total due (including sales tax) if paid by the 10th of the month following purchase',
    },
    {
      seqNo: 2,
      description: '01040 - PO445 A - 1 Electric Co of Charlotte',
    },
    {
      seqNo: 3,
      description: 'Net payment is due by the 15th of the month following purchase',
    },
    {
      seqNo: 4,
      description: 'Net payment is due by the 15th of the month following purchase',
    },
    {
      seqNo: 5,
      description:
        'Cash discount 4.91 off total due (including sales tax) if paid by the 10th of the month following purchase',
    },
  ];
  const headerStyle = {
    fontWeight: 'bold', // Make the text bold
    marginBottom: '8px', // Add some spacing below the text
  };

  return (
    <Box sx={{ padding: 1 }}>
        <Box sx={{ backgroundColor: darkMode ? '#333' :'#f0f0f0',p:1 }}>
     <Typography variant="h7" gutterBottom sx={headerStyle}>
        Memo Lines
      </Typography>
      <Typography variant="subtitle2" gutterBottom sx={{fontWeight:400}}>
        Payment Details & Instructions
      </Typography></Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="memo lines table">
          <TableHead sx={{ backgroundColor:  darkMode ? '#333' :  '#f0f0f0' }}>
            <TableRow>
              <TableCell>Seq No</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {memoLines.map((memo,index) => (
                
                <TableRow
                key={memo.seqNo}
                sx={{
                  backgroundColor: index % 2 === 1 ? darkMode ? '#333' :'#f9f9f9' : 'transparent', // Alternate background color
                }}
              >
                <TableCell>{memo.seqNo}</TableCell>
                <TableCell>{memo.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default GLBillMemoLinesComponent;