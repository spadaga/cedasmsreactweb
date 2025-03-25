import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useThemeContext } from "../context/ThemeContext"; 
import { styled,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, TablePagination, InputAdornment, Alert, Collapse } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import GLTransactionChildTable from './GLTransactionChildTable';


function GLTransactionProductModal({ open, onClose, transactionId, transactionStatus }) {
  const { darkMode } = useThemeContext();
  const [products, setProducts] = useState([]); // Replace with actual product data
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('PRODUCT_NAME');
  const [order, setOrder] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRows, setExpandedRows] = useState([]);

  // Styled Components for Table Headers
  const ParentTableHeader = styled(TableHead)(({ theme }) => ({
      backgroundColor: '#e0e0e0', // Light gray background for parent header
      '& .MuiTableCell-head': {
        fontWeight: 'bold', // Bold font for header cells
        padding: theme.spacing(1.5), // Add padding
      },
    }));
    
    const ChildTableContainer = styled(Box)(({ theme }) => ({
      backgroundColor: darkMode ? '#333' :'#f5f5f5', // Lighter gray background for child table
      padding: theme.spacing(2),
      margin: theme.spacing(1),
    }));
  

  // Replace with actual product fetching logic based on transactionId
  useEffect(() => {
    // Fetch products based on transactionId and set to products state
    // Example:
    const mockProducts = [
        {
          PRODUCT_NAME: 'COND EMT/3/4',
          PRODUCT_DESCRIPTION: '3/4 EMT',
          UPC: '98001002002',
          CATEGORY: 'BOS',
          details: [
            {
              PC_ACCOUNT: '0007 - Yale West Chester / 1372-10-814 FORD LAP',
              VENDOR_CODE: '782274',
              PRICE: '$110.01',
              VENDOR_NAME: 'HUBWD HBL15988428',
            },
            {
              PC_ACCOUNT: '0008 - Yale Wyomissing / 1373-10-862 HARLEY - DAVIDSON',
              VENDOR_CODE: '781180',
              PRICE: '$111.02',
              VENDOR_NAME: 'HUBWD HBL16920212',
            },
            {
              PC_ACCOUNT: '0009 - Yale Willow Grove / 1359 - ACCENT CONTROLS INC',
              VENDOR_CODE: '662074',
              PRICE: '$112.03',
              VENDOR_NAME: 'HUBWD HBL10939459',
            },
          ],
        },
        {
          PRODUCT_NAME: 'COND EMT1',
          PRODUCT_DESCRIPTION: '1/IN/EMT',
          UPC: '98001002003',
          CATEGORY: 'BOS',
          details: [
            {
              PC_ACCOUNT: '0010 - Yale Newark / 1361 - GCCL 11-910 GM - COOLING T',
              VENDOR_CODE: '662074',
              PRICE: '$113.04',
              VENDOR_NAME: 'HUBWD HBL78894964',
            },
            {
              PC_ACCOUNT: '0011 - Acq Location : 0011 / 1365-11-911 GM FAIRFAX HEM SE',
              VENDOR_CODE: '19813',
              PRICE: '$114.05',
              VENDOR_NAME: 'HUBWD HBL57072865',
            },
            {
              PC_ACCOUNT: "0012 - Acq Location : 0012 / 1368-11-918 CITY OF LEE'S SUM",
              VENDOR_CODE: '784231',
              PRICE: '$115.06',
              VENDOR_NAME: 'HUBWD HBL98046786',
            },
          ],
        },
        {
          PRODUCT_NAME: 'COND EMT1/1/4',
          PRODUCT_DESCRIPTION: '1/1/4/EMT',
          UPC: '98001002004',
          CATEGORY: 'BOS',
          details: [
            {
              PC_ACCOUNT: '0013 Aeq Location : 0013 / 1366-11-925 CHRYSLER BELVIDER',
              VENDOR_CODE: '780321',
              PRICE: '$116.07',
              VENDOR_NAME: 'HUBWD HBL21587465',
            },
            {
              PC_ACCOUNT: '0014 - Acq Location : 0014 / 1387-11-932 INTERCON',
              VENDOR_CODE: '662468',
              PRICE: '$117.08',
              VENDOR_NAME: 'HUBWD HBL76899683',
            },
            {
              PC_ACCOUNT: '0015 - Acq Location : 0015 / 1388-11-933 SFA COMPANIES MER',
              VENDOR_CODE: '612598',
              PRICE: '$118.09',
              VENDOR_NAME: 'HUBWD HBL49886297',
            },
          ],
        },
        {
          PRODUCT_NAME: 'DOT TEKHW10112',
          PRODUCT_DESCRIPTION: 'HEX HEAD',
          UPC: '78100217545',
          CATEGORY: 'BOS',
          details: [
            {
              PC_ACCOUNT: '0050 - Kansas City Omaha CED / 1397-10-815 FORD HERMOSSI',
              VENDOR_CODE: '662468',
              PRICE: '$119.1',
              VENDOR_NAME: 'HUBWD HBL8995568',
            },
            {
              PC_ACCOUNT: '0051 - Austin / 1398-10-816 FORD HERMOSSI',
              VENDOR_CODE: '662469',
              PRICE: '$120.2',
              VENDOR_NAME: 'HUBWD HBL8995569',
            },
            {
              PC_ACCOUNT: '0052 - Dallas / 1399-10-817 FORD HERMOSSI',
              VENDOR_CODE: '662470',
              PRICE: '$121.3',
              VENDOR_NAME: 'HUBWD HBL8995570',
            },
          ],
        },
        {
          PRODUCT_NAME: 'EATON BR220',
          PRODUCT_DESCRIPTION: '2P/120/240V/20',
          UPC: '78667636285',
          CATEGORY: 'BOS',
          details: [
            {
              PC_ACCOUNT: '0053 - Houston / 1400-10-818 FORD HERMOSSI',
              VENDOR_CODE: '662471',
              PRICE: '$122.4',
              VENDOR_NAME: 'HUBWD HBL8995571',
            },
            {
              PC_ACCOUNT: '0054 - San Antonio / 1401-10-819 FORD HERMOSSI',
              VENDOR_CODE: '662472',
              PRICE: '$123.5',
              VENDOR_NAME: 'HUBWD HBL8995572',
            },
            {
              PC_ACCOUNT: '0055 - El Paso / 1402-10-820 FORD HERMOSSI',
              VENDOR_CODE: '662473',
              PRICE: '$124.6',
              VENDOR_NAME: 'HUBWD HBL8995573',
            },
          ],
        },
        {
          PRODUCT_NAME: 'EATON BR225',
          PRODUCT_DESCRIPTION: '2P/120/240V/25',
          UPC: '78667636290',
          CATEGORY: 'BOS',
          details: [
            {
              PC_ACCOUNT: '0056 - Oklahoma City / 1403-10-821 FORD HERMOSSI',
              VENDOR_CODE: '662474',
              PRICE: '$125.7',
              VENDOR_NAME: 'HUBWD HBL8995574',
            },
            {
              PC_ACCOUNT: '0057 - Tulsa / 1404-10-822 FORD HERMOSSI',
              VENDOR_CODE: '662475',
              PRICE: '$126.8',
              VENDOR_NAME: 'HUBWD HBL8995575',
            },
            {
              PC_ACCOUNT: '0058 - Wichita / 1405-10-823 FORD HERMOSSI',
              VENDOR_CODE: '662476',
              PRICE: '$127.9',
              VENDOR_NAME: 'HUBWD HBL8995576',
            },
          ],
        },
        {
          PRODUCT_NAME: 'EATON BR240',
          PRODUCT_DESCRIPTION: '2P/120/240V/40',
          UPC: '78667636300',
          CATEGORY: 'BOS',
          details: [
            {
                PC_ACCOUNT: '0059 - Colorado Springs / 1406-10-824 FORD HERMOSSI',
                VENDOR_CODE: '662477',
                PRICE: '$129.1',
                VENDOR_NAME: 'HUBWD HBL8995577',
              },
              {
                PC_ACCOUNT: '0060 - Denver / 1407-10-825 FORD HERMOSSI',
                VENDOR_CODE: '662478',
                PRICE: '$130.2',
                VENDOR_NAME: 'HUBWD HBL8995578',
              },
              {
                PC_ACCOUNT: '0061 - Aurora / 1408-10-826 FORD HERMOSSI',
                VENDOR_CODE: '662479',
                PRICE: '$131.3',
                VENDOR_NAME: 'HUBWD HBL8995579',
              },
            ],
          },
          {
            PRODUCT_NAME: 'EATON BR250',
            PRODUCT_DESCRIPTION: '2P/120/240V/50',
            UPC: '78667636305',
            CATEGORY: 'BOS',
            details: [
              {
                PC_ACCOUNT: '0062 - Fort Collins / 1409-10-827 FORD HERMOSSI',
                VENDOR_CODE: '662480',
                PRICE: '$132.4',
                VENDOR_NAME: 'HUBWD HBL8995580',
              },
              {
                PC_ACCOUNT: '0063 - Lakewood / 1410-10-828 FORD HERMOSSI',
                VENDOR_CODE: '662481',
                PRICE: '$133.5',
                VENDOR_NAME: 'HUBWD HBL8995581',
              },
              {
                PC_ACCOUNT: '0064 - Thornton / 1411-10-829 FORD HERMOSSI',
                VENDOR_CODE: '662482',
                PRICE: '$134.6',
                VENDOR_NAME: 'HUBWD HBL8995582',
              },
            ],
          },
          {
            PRODUCT_NAME: 'EATON CH260',
            PRODUCT_DESCRIPTION: '2P 60A PLUG/0',
            UPC: '78211310187',
            CATEGORY: 'BOS',
            details: [
              {
                PC_ACCOUNT: '0065 - Arvada / 1412-10-830 FORD HERMOSSI',
                VENDOR_CODE: '662483',
                PRICE: '$135.7',
                VENDOR_NAME: 'HUBWD HBL8995583',
              },
              {
                PC_ACCOUNT: '0066 - Westminster / 1413-10-831 FORD HERMOSSI',
                VENDOR_CODE: '662484',
                PRICE: '$136.8',
                VENDOR_NAME: 'HUBWD HBL8995584',
              },
              {
                PC_ACCOUNT: '0067 - Centennial / 1414-10-832 FORD HERMOSSI',
                VENDOR_CODE: '662485',
                PRICE: '$137.9',
                VENDOR_NAME: 'HUBWD HBL8995585',
              },
            ],
          },
          // ... more products
        ];
    setProducts(mockProducts);
  }, [transactionId]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(0); // Reset to first page when searching
  };

  const sortedProducts = React.useMemo(() => {
    return products.slice().sort((a, b) => {
      const isAsc = order === 'asc';
      if (b[orderBy] < a[orderBy]) {
        return isAsc ? 1 : -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return isAsc ? -1 : 1;
      }
      return 0;
    });
  }, [products, order, orderBy]);

  const filteredProducts = React.useMemo(() => {
    return sortedProducts.filter(product => {
      return Object.values(product).some(value => {
        return String(value).toLowerCase().includes(searchQuery.toLowerCase());
      });
    });
  }, [sortedProducts, searchQuery]);

  const paginatedProducts = React.useMemo(() => {
    return filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [filteredProducts, page, rowsPerPage]);

  const handleExpandRow = (rowId) => {
    if (expandedRows.includes(rowId)) {
      setExpandedRows(expandedRows.filter(id => id !== rowId));
    } else {
      setExpandedRows([...expandedRows, rowId]);
    }
  };

  const style = {
    position: "absolute",
    top: "5%",
    left: "50%",
    transform: "translateX(-50%)",
    width: "90%",
    maxHeight: "80vh",
    overflowY: "auto",
    backgroundColor: darkMode ? "#444" : "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    color: darkMode ? "white" : "black",
    marginTop: "20px",
    marginBottom: "20px",
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: darkMode ? "#222" : "#f0f0f0",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: darkMode ? "#666" : "#ccc",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: darkMode ? "#888" : "#aaa",
    },
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="product-details-modal"
      aria-describedby="product-details-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography id="product-details-modal" variant="h6" component="h2">
            Products for Transaction ID: {transactionId}
          </Typography>
          <IconButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Alert severity="error" sx={{ mb: 2 }}>
          <Typography variant="body2">
            Note: This table displays the current inventory of electrical components. You can search products using the search bar below, and click the '+' icon next to each product to view additional details including manufacturer information, stock levels, and last update date.
          </Typography>
        </Alert>
        <TextField
          fullWidth
          placeholder="Search Products..."
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
          sx={{ mb: 2 }}
        />
        <TableContainer component={Paper}>
          <Table>
          <ParentTableHeader> {/* Use styled ParentTableHeader */}
              <TableRow style={{ backgroundColor: darkMode ? '#333' : '#f5f5f5' }}>
                <TableCell />
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'PRODUCT_NAME'}
                    direction={orderBy === 'PRODUCT_NAME' ? order : 'asc'}
                    onClick={() => handleRequestSort('PRODUCT_NAME')}
                  >
                    PRODUCT NAME
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'PRODUCT_DESCRIPTION'}
                    direction={orderBy === 'PRODUCT_DESCRIPTION' ? order : 'asc'}
                    onClick={() => handleRequestSort('PRODUCT_DESCRIPTION')}
                  >
                    PRODUCT DESCRIPTION
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'UPC'}
                    direction={orderBy === 'UPC' ? order : 'asc'}
                    onClick={() => handleRequestSort('UPC')}
                  >
                    UPC
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'CATEGORY'}
                    direction={orderBy === 'CATEGORY' ? order : 'asc'}
                    onClick={() => handleRequestSort('CATEGORY')}
                  >
                    CATEGORY
                  </TableSortLabel>
                </TableCell>
              </TableRow>
              </ParentTableHeader> {/* Use styled ParentTableHeader */}
            <TableBody>
              {paginatedProducts.map((product) => (
                <React.Fragment key={product.UPC}>
                  <TableRow>
                    <TableCell>
                      <IconButton size="small" onClick={() => handleExpandRow(product.UPC)}>
                        {expandedRows.includes(product.UPC) ? <RemoveIcon /> : <AddIcon />}
                      </IconButton>
                      
                    </TableCell>
                    <TableCell>{product.PRODUCT_NAME}</TableCell>
                    <TableCell>{product.PRODUCT_DESCRIPTION}</TableCell>
                    <TableCell>{product.UPC}</TableCell>
                    <TableCell>{product.CATEGORY}</TableCell>
                  </TableRow>
                  <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0, borderBottom: 0 }} colSpan={6}>
                  <Collapse in={expandedRows.includes(product.UPC)} timeout="auto" unmountOnExit>
                  <ChildTableContainer> {/* Use styled ChildTableContainer */}
                      <Typography variant="h6" gutterBottom component="div">
                        Product Details
                      </Typography>
                      <GLTransactionChildTable details={product.details} />
                    </ChildTableContainer>
                  </Collapse>
                </TableCell>
              </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredProducts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Modal>
  );
}

export default GLTransactionProductModal;