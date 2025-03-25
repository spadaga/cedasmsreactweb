import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  TablePagination,
  TextField,
  InputAdornment,
  IconButton,
  Modal,
  Box,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import ReactJson from "react-json-view"; // Import the library
import { Tooltip } from "@mui/material";
import { useThemeContext } from '../context/ThemeContext';
import FileDownloadIcon from "@mui/icons-material/FileDownload"; // Import the download icon

// Styled Components for Table Header
const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: "#e0e0e0", // Light gray background for header
  "& .MuiTableCell-head": {
    fontWeight: "bold",
    padding: theme.spacing(1.5),
  },

}));


const styles = {

  jsonPreview: {
    backgroundColor: '#111827', // very dark gray
    color: '#f3f4f6', // light gray text
    padding: '1rem',
    borderRadius: '0.5rem',
    fontFamily: 'monospace',
    fontSize: '0.875rem',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-all',
    overflowX: 'auto',
    border: '1px solid #374151', // dark border
  }
}


function GLPOComponent() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState("PO_NUMBER");
  const [order, setOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const {darkMode} = useThemeContext()
  useEffect(() => {
    // Replace with your actual data fetching logic
    const mockData = [
      {
        PO_NUMBER: "PO-2024-001",
        RECEIVED_DATE: "2024-03-01",
        SUPPLIER_ACCOUNT_NO: "SA-001",
        VENDOR_NAME: "Vendor A",
        DATA: true,
        SENT_TO_PORTAL: "Yes",
        PORTAL_WEB_ID: "WID-001",
        details: {
          WebOrderItems: [
            {
              SupplierPartNo: "PartA1",
              BuyerPartNo: "PartB1",
              Quantity: "10",
              BuyerPartDescription: "DescriptionA",
              ExtendedPrice: "100.00",
              Price: "10.00",
              SequenceNumber: "1",
              PriceUOM: "",
            },
            {
              SupplierPartNo: "PartA2",
              BuyerPartNo: "PartB2",
              Quantity: "5",
              BuyerPartDescription: "DescriptionB",
              ExtendedPrice: "75.00",
              Price: "15.00",
              SequenceNumber: "2",
              PriceUOM: "EA",
            },
          ],
          Type: "Purchase Order",
          PurchaseOrderNo: "PO492",
          Vendor: "PC1020",
          PurchaseOrderDate: "1/16/2023",
          ExternalId: "31617",
          ShippingAddress: {
            AddressLine1: "1920 Westridge",
            AddressLine2: "",
            City: "Austin",
            State: "TX",
            Zip: "78704",
          },
          SupplierAccountNo: "2901040",
          RequiredByDate: "2/16/2023",
          ShipInstructions: "QA - check manual recon",
          WareHouseLocation: "Warehouse 1",
          Total: "175.00",
          ShipMethodCode: "5",
          ShipServiceLevelCode: "7",
          AccountId: "4018573_SB1",
          System: "NetSuite",
          TransactionRefId: "9a8fdd65-4cf2-4a5c-af4f-0050a20db229",
        },
      },
      {
        PO_NUMBER: "PO-2024-002",
        RECEIVED_DATE: "2024-03-02",
        SUPPLIER_ACCOUNT_NO: "SA-002",
        VENDOR_NAME: "Vendor B",
        DATA: false,
        SENT_TO_PORTAL: "No",
        PORTAL_WEB_ID: "-",
        details: {
          WebOrderItems: [
            {
              SupplierPartNo: "PartC1",
              BuyerPartNo: "PartD1",
              Quantity: "20",
              BuyerPartDescription: "DescriptionC",
              ExtendedPrice: "200.00",
              Price: "10.00",
              SequenceNumber: "1",
              PriceUOM: "",
            },
          ],
          Type: "Purchase Order",
          PurchaseOrderNo: "PO493",
          Vendor: "PC1021",
          PurchaseOrderDate: "1/17/2023",
          ExternalId: "31618",
          ShippingAddress: {
            AddressLine1: "200 Oak St",
            AddressLine2: "",
            City: "Dallas",
            State: "TX",
            Zip: "75201",
          },
          SupplierAccountNo: "2901041",
          RequiredByDate: "2/17/2023",
          ShipInstructions: "Handle with care",
          WareHouseLocation: "Warehouse 2",
          Total: "200.00",
          ShipMethodCode: "6",
          ShipServiceLevelCode: "8",
          AccountId: "4018574_SB2",
          System: "Oracle",
          TransactionRefId: "b1234567-4cf2-4a5c-af4f-0050a20db229",
        },
      },
      {
        PO_NUMBER: "PO-2024-003",
        RECEIVED_DATE: "2024-03-03",
        SUPPLIER_ACCOUNT_NO: "SA-003",
        VENDOR_NAME: "Vendor C",
        DATA: true,
        SENT_TO_PORTAL: "Yes",
        PORTAL_WEB_ID: "WID-002",
        details: {
          WebOrderItems: [
            {
              SupplierPartNo: "PartE1",
              BuyerPartNo: "PartF1",
              Quantity: "30",
              BuyerPartDescription: "DescriptionD",
              ExtendedPrice: "300.00",
              Price: "10.00",
              SequenceNumber: "1",
              PriceUOM: "",
            },
            {
              SupplierPartNo: "PartE2",
              BuyerPartNo: "PartF2",
              Quantity: "15",
              BuyerPartDescription: "DescriptionE",
              ExtendedPrice: "225.00",
              Price: "15.00",
              SequenceNumber: "2",
              PriceUOM: "EA",
            },
            {
              SupplierPartNo: "PartE3",
              BuyerPartNo: "PartF3",
              Quantity: "5",
              BuyerPartDescription: "DescriptionF",
              ExtendedPrice: "100.00",
              Price: "20.00",
              SequenceNumber: "3",
              PriceUOM: "EA",
            },
          ],
          Type: "Purchase Order",
          PurchaseOrderNo: "PO494",
          Vendor: "PC1022",
          PurchaseOrderDate: "1/18/2023",
          ExternalId: "31619",
          ShippingAddress: {
            AddressLine1: "300 Pine St",
            AddressLine2: "",
            City: "Houston",
            State: "TX",
            Zip: "77002",
          },
          SupplierAccountNo: "2901042",
          RequiredByDate: "2/18/2023",
          ShipInstructions: "Fragile items",
          WareHouseLocation: "Warehouse 3",
          Total: "625.00",
          ShipMethodCode: "7",
          ShipServiceLevelCode: "9",
          AccountId: "4018575_SB3",
          System: "SAP",
          TransactionRefId: "c7890123-4cf2-4a5c-af4f-0050a20db229",
        },
      },
      {
        PO_NUMBER: "PO-2024-004",
        RECEIVED_DATE: "2024-03-04",
        SUPPLIER_ACCOUNT_NO: "SA-004",
        VENDOR_NAME: "Vendor D",
        DATA: true,
        SENT_TO_PORTAL: "Yes",
        PORTAL_WEB_ID: "WID-003",
        details: {
          WebOrderItems: [
            {
              SupplierPartNo: "PartG1",
              BuyerPartNo: "PartH1",
              Quantity: "40",
              BuyerPartDescription: "DescriptionG",
              ExtendedPrice: "400.00",
              Price: "10.00",
              SequenceNumber: "1",
              PriceUOM: "",
            },
          ],
          Type: "Purchase Order",
          PurchaseOrderNo: "PO495",
          Vendor: "PC1023",
          PurchaseOrderDate: "1/19/2023",
          ExternalId: "31620",
          ShippingAddress: {
            AddressLine1: "400 Maple St",
            AddressLine2: "",
            City: "San Antonio",
            State: "TX",
            Zip: "78205",
          },
          SupplierAccountNo: "2901043",
          RequiredByDate: "2/19/2023",
          ShipInstructions: "Heavy items",
          WareHouseLocation: "Warehouse 4",
          Total: "400.00",
          ShipMethodCode: "8",
          ShipServiceLevelCode: "10",
          AccountId: "4018576_SB4",
          System: "JD Edwards",
          TransactionRefId: "d2345678-4cf2-4a5c-af4f-0050a20db229",
        },
      },
      {
        PO_NUMBER: "PO-2024-005",
        RECEIVED_DATE: "2024-03-05",
        SUPPLIER_ACCOUNT_NO: "SA-005",
        VENDOR_NAME: "Vendor E",
        DATA: false,
        SENT_TO_PORTAL: "No",
        PORTAL_WEB_ID: "-",
        details: {
          WebOrderItems: [
            {
              SupplierPartNo: "PartI1",
              BuyerPartNo: "PartJ1",
              Quantity: "50",
              BuyerPartDescription: "DescriptionI",
              ExtendedPrice: "500.00",
              Price: "10.00",
              SequenceNumber: "1",
              PriceUOM: "",
            },
          ],
          Type: "Purchase Order",
          PurchaseOrderNo: "PO496",
          Vendor: "PC1024",
          PurchaseOrderDate: "1/20/2023",
          ExternalId: "31621",
          ShippingAddress: {
            AddressLine1: "500 Elm St",
            AddressLine2: "",
            City: "El Paso",
            State: "TX",
            Zip: "79901",
          },
          SupplierAccountNo: "2901044",
          RequiredByDate: "2/20/2023",
          ShipInstructions: "Urgent delivery",
          WareHouseLocation: "Warehouse 5",
          Total: "500.00",
          ShipMethodCode: "9",
          ShipServiceLevelCode: "11",
          AccountId: "4018577_SB5",
          System: "Infor",
          TransactionRefId: "e8901234-4cf2-4a5c-af4f-0050a20db229",
        },
      },
      {
        PO_NUMBER: "PO-2024-006",
        RECEIVED_DATE: "2024-03-06",
        SUPPLIER_ACCOUNT_NO: "SA-006",
        VENDOR_NAME: "Vendor F",
        DATA: true,
        SENT_TO_PORTAL: "Yes",
        PORTAL_WEB_ID: "WID-004",
        details: {
          WebOrderItems: [
            {
              SupplierPartNo: "PartK1",
              BuyerPartNo: "PartL1",
              Quantity: "60",
              BuyerPartDescription: "DescriptionK",
              ExtendedPrice: "600.00",
              Price: "10.00",
              SequenceNumber: "1",
              PriceUOM: "",
            },
          ],
          Type: "Purchase Order",
          PurchaseOrderNo: "PO497",
          Vendor: "PC1025",
          PurchaseOrderDate: "1/21/2023",
          ExternalId: "31622",
          ShippingAddress: {
            AddressLine1: "600 Pine Ave",
            AddressLine2: "",
            City: "Oklahoma City",
            State: "OK",
            Zip: "73102",
          },
          SupplierAccountNo: "2901045",
          RequiredByDate: "2/21/2023",
          ShipInstructions: "No specific instructions",
          WareHouseLocation: "Warehouse 6",
          Total: "600.00",
          ShipMethodCode: "10",
          ShipServiceLevelCode: "12",
          AccountId: "4018578_SB6",
          System: "Microsoft Dynamics",
          TransactionRefId: "f3456789-4cf2-4a5c-af4f-0050a20db229",
        },
      },
      {
        PO_NUMBER: "PO-2024-007",
        RECEIVED_DATE: "2024-03-07",
        SUPPLIER_ACCOUNT_NO: "SA-007",
        VENDOR_NAME: "Vendor G",
        DATA: true,
        SENT_TO_PORTAL: "Yes",
        PORTAL_WEB_ID: "WID-005",
        details: {
          WebOrderItems: [
            {
              SupplierPartNo: "PartI1",
              BuyerPartNo: "PartJ1",
              Quantity: "50",
              BuyerPartDescription: "DescriptionI",
              ExtendedPrice: "500.00",
              Price: "10.00",
              SequenceNumber: "1",
              PriceUOM: "",
            },
          ],
          Type: "Purchase Order",
          PurchaseOrderNo: "PO496",
          Vendor: "PC1024",
          PurchaseOrderDate: "1/20/2023",
          ExternalId: "31621",
          ShippingAddress: {
            AddressLine1: "500 Elm St",
            AddressLine2: "",
            City: "El Paso",
            State: "TX",
            Zip: "79901",
          },
          SupplierAccountNo: "2901044",
          RequiredByDate: "2/20/2023",
          ShipInstructions: "Urgent delivery",
          WareHouseLocation: "Warehouse 5",
          Total: "500.00",
          ShipMethodCode: "9",
          ShipServiceLevelCode: "11",
          AccountId: "4018577_SB5",
          System: "Infor",
          TransactionRefId: "e8901234-4cf2-4a5c-af4f-0050a20db229",
        },
      },
      {
        PO_NUMBER: "PO-2024-010",
        RECEIVED_DATE: "2024-03-10",
        SUPPLIER_ACCOUNT_NO: "SA-010",
        VENDOR_NAME: "Vendor J",
        DATA: true,
        SENT_TO_PORTAL: "Yes",
        PORTAL_WEB_ID: "WID-007",
        details: {
          WebOrderItems: [
            {
              SupplierPartNo: "PartS1",
              BuyerPartNo: "PartT1",
              Quantity: "110",
              BuyerPartDescription: "DescriptionS",
              ExtendedPrice: "1100.00",
              Price: "10.00",
              SequenceNumber: "1",
              PriceUOM: "",
            },
          ],
          Type: "Purchase Order",
          PurchaseOrderNo: "PO501",
          Vendor: "PC1029",
          PurchaseOrderDate: "1/25/2023",
          ExternalId: "31626",
          ShippingAddress: {
            AddressLine1: "1000 Oak Ln",
            AddressLine2: "",
            City: "Denver",
            State: "CO",
            Zip: "80202",
          },
          SupplierAccountNo: "2901049",
          RequiredByDate: "2/25/2023",
          ShipInstructions: "Urgent delivery",
          WareHouseLocation: "Warehouse 10",
          Total: "1100.00",
          ShipMethodCode: "14",
          ShipServiceLevelCode: "16",
          AccountId: "4018582_SB10",
          System: "Coupa",
          TransactionRefId: "j5678901-4cf2-4a5c-af4f-0050a20db229",
        },
      },
      {
        PO_NUMBER: "PO-2024-011",
        RECEIVED_DATE: "2024-03-11",
        SUPPLIER_ACCOUNT_NO: "SA-011",
        VENDOR_NAME: "Vendor K",
        DATA: false,
        SENT_TO_PORTAL: "No",
        PORTAL_WEB_ID: "-",
        details: {
          WebOrderItems: [
            {
              SupplierPartNo: "PartT1",
              BuyerPartNo: "PartU1",
              Quantity: "120",
              BuyerPartDescription: "DescriptionT",
              ExtendedPrice: "1200.00",
              Price: "10.00",
              SequenceNumber: "1",
              PriceUOM: "",
            },
          ],
          Type: "Purchase Order",
          PurchaseOrderNo: "PO502",
          Vendor: "PC1030",
          PurchaseOrderDate: "1/26/2023",
          ExternalId: "31627",
          ShippingAddress: {
            AddressLine1: "1100 Pine Ave",
            AddressLine2: "",
            City: "Aurora",
            State: "CO",
            Zip: "80011",
          },
          SupplierAccountNo: "2901050",
          RequiredByDate: "2/26/2023",
          ShipInstructions: "No specific instructions",
          WareHouseLocation: "Warehouse 11",
          Total: "1200.00",
          ShipMethodCode: "15",
          ShipServiceLevelCode: "17",
          AccountId: "4018583_SB11",
          System: "Oracle Fusion",
          TransactionRefId: "k0123456-4cf2-4a5c-af4f-0050a20db229",
        },
      },
      {
        PO_NUMBER: "PO-2024-012",
        RECEIVED_DATE: "2024-03-12",
        SUPPLIER_ACCOUNT_NO: "SA-012",
        VENDOR_NAME: "Vendor L",
        DATA: true,
        SENT_TO_PORTAL: "Yes",
        PORTAL_WEB_ID: "WID-008",
        details: {
          WebOrderItems: [
            {
              SupplierPartNo: "PartU1",
              BuyerPartNo: "PartV1",
              Quantity: "130",
              BuyerPartDescription: "DescriptionU",
              ExtendedPrice: "1300.00",
              Price: "10.00",
              SequenceNumber: "1",
              PriceUOM: "",
            },
          ],
          Type: "Purchase Order",
          PurchaseOrderNo: "PO503",
          Vendor: "PC1031",
          PurchaseOrderDate: "1/27/2023",
          ExternalId: "31628",
          ShippingAddress: {
            AddressLine1: "1200 Oak Ave",
            AddressLine2: "",
            City: "Lakewood",
            State: "CO",
            Zip: "80215",
          },
          SupplierAccountNo: "2901051",
          RequiredByDate: "2/27/2023",
          ShipInstructions: "Handle with care",
          WareHouseLocation: "Warehouse 12",
          Total: "1300.00",
          ShipMethodCode: "16",
          ShipServiceLevelCode: "18",
          AccountId: "4018584_SB12",
          System: "NetSuite",
          TransactionRefId: "l5678901-4cf2-4a5c-af4f-0050a20db229",
        },
      },
    ];
    setData(mockData);
  }, []);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
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
    setPage(0);
  };

  const filteredData = React.useMemo(() => {
    return data.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [data, searchQuery]);

  const sortedData = React.useMemo(() => {
    return filteredData.slice().sort((a, b) => {
      const isAsc = order === "asc";
      if (b[orderBy] < a[orderBy]) {
        return isAsc ? 1 : -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return isAsc ? -1 : 1;
      }
      return 0;
    });
  }, [filteredData, order, orderBy]);

  const paginatedData = React.useMemo(() => {
    return sortedData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [sortedData, page, rowsPerPage]);

  const handleOpenModal = (row) => {
    setSelectedRow(row);
    setOpenModal(true);
    console.log("Selected Row:", row);
    console.log("jsondata", row.details);
    if (!row.details) {
      console.error("Row details are missing:", row);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRow(null);
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600, // Increased width
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    maxHeight: "80vh", // Set max height
    overflowY: "auto", // Enable vertical scroll
  };

  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={2}
      >
        <TextField
          label="Search by PO number, vendor name..."
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ width: "90%" }} // Increase the width here
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Tooltip title="Export Data">
          <IconButton sx={{ color: "primary.main" }}>
            <FileDownloadIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <StyledTableHead>
           <TableRow style={{ backgroundColor: darkMode ? '#333' : '#f5f5f5' }}>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "PO_NUMBER"}
                  direction={orderBy === "PO_NUMBER" ? order : "asc"}
                  onClick={() => handleRequestSort("PO_NUMBER")}
                >
                  PO NUMBER
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "RECEIVED_DATE"}
                  direction={orderBy === "RECEIVED_DATE" ? order : "asc"}
                  onClick={() => handleRequestSort("RECEIVED_DATE")}
                >
                  RECEIVED DATE
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "SUPPLIER_ACCOUNT_NO"}
                  direction={orderBy === "SUPPLIER_ACCOUNT_NO" ? order : "asc"}
                  onClick={() => handleRequestSort("SUPPLIER_ACCOUNT_NO")}
                >
                  SUPPLIER ACCOUNT NO
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "VENDOR_NAME"}
                  direction={orderBy === "VENDOR_NAME" ? order : "asc"}
                  onClick={() => handleRequestSort("VENDOR_NAME")}
                >
                  VENDOR NAME
                </TableSortLabel>
              </TableCell>
              <TableCell>DATA</TableCell>
              <TableCell>SENT TO PORTAL</TableCell>
              <TableCell>PORTAL WEB ID</TableCell>
              <TableCell>ACTIONS</TableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={row.PO_NUMBER}>
                <TableCell>{row.PO_NUMBER}</TableCell>
                <TableCell>{row.RECEIVED_DATE}</TableCell>
                <TableCell>{row.SUPPLIER_ACCOUNT_NO}</TableCell>
                <TableCell>{row.VENDOR_NAME}</TableCell>
                {/* <TableCell>{row.DATA.toString()}</TableCell>
                 */}
                <TableCell>
                  <Tooltip title="View Details">
                    <IconButton
                      onClick={() => handleOpenModal(row)}
                      sx={{ color: "primary.main" }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell>{row.SENT_TO_PORTAL}</TableCell>
                <TableCell>{row.PORTAL_WEB_ID}</TableCell>
                <TableCell>
                  <Tooltip title="View Details">
                    <IconButton
                      onClick={() => handleOpenModal(row)}
                      sx={{ color: "primary.main" }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              backgroundColor: darkMode ? '#333' : '#f5f5f5', // Light gray background
              borderLeft: "4px solid #1976d2", // Blue left border
              padding: "8px 16px", // Add some padding
              marginBottom: "16px", // Add some spacing below
            }}
          >
            PO Details
          </Typography>
          {selectedRow && selectedRow.details && (
            <Box>
              <pre style={styles.jsonPreview}>
                {JSON.stringify(selectedRow.details, null, 2)}
              </pre>
              {/* <ReactJson
                src={selectedRow.details}
                theme="monokai"
                collapsed={2}
                displayDataTypes={false}
              /> */}
            </Box>
          )}
          {/* {selectedRow && selectedRow.details && (
            <Box>
              {Object.entries(selectedRow.details).map(([key, value]) => (
                <Typography key={key} id="modal-modal-description" sx={{ mt: 2 }}>
                  <strong>{key}:</strong> {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                </Typography>
              ))}
            </Box>
          )} */}
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            style={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Modal>
    </div>
  );
}

export default GLPOComponent;
