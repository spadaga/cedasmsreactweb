// GLProductUpload.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
  useTheme,
  Autocomplete,
  InputAdornment,
  Chip,
  IconButton,
  Divider,
  styled,
  ListItemText,
} from "@mui/material";
import MasterLayout from "../Layout/MasterLayout";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SearchIcon from "@mui/icons-material/Search";
import pcData from "../data/pcs.json";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import ArrowBackIcon
import GLDynamicHeader from "../controls/GLDynamicHeader";
import LoremIpsum from "react-lorem-ipsum";
import DynamicAutocomplete from "../controls/DynamicAutocomplete";

const GLProductUpload = () => {
  const theme = useTheme();
  const [pcSearchValue, setPcSearchValue] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const getStatusChip = (status) => {
    if (status === "Success") {
      return (
        <Chip label="Success" color="success" size="small" variant="outlined" />
      );
    } else if (status === "Failed") {
      return (
        <Chip label="Failed" color="error" size="small" variant="outlined" />
      );
    } else {
      return <Chip label="Unknown" size="small" variant="outlined" />;
    }
  };

  const handleGoBack = () => {
    navigate(-1, { state: { fromUpload: true } });
  };

  const labelKey = 'PCNAME'; // Or 'ID', or any other key from your JSON

  return (
    <MasterLayout title="Product Upload">
      <Box
        sx={{
          padding: "20px",
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: "5px",
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.background.paper
              : "#F8F9FC",
        }}
      >
        <Box sx={{  minHeight: "100vh" }}>
          {/* Back Button */}

          
              <GLDynamicHeader
                title="Product Upload "
                descriptionContent={
                  <p>
                    <LoremIpsum p={2} />
                  </p>
                }
                showBackButton={true}
                backButtonHandler={handleGoBack}
              />

              <Box sx={{ width: "100%" }}>
              <Box
              sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
            >
                <DynamicAutocomplete
                  options={pcData}
                 
                  getOptionLabel={(option) => option[labelKey]}
                />
                </Box>
              
          
            <Box
              sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
            >
              <TextField
                label="Upload Product excel"
                variant="outlined"
                size="small"
                sx={{ flexGrow: 1, marginRight: 1 }}
              />
              <Button variant="contained" startIcon={<UploadFileIcon />}>
                UPLOAD
              </Button>
            </Box>
            <Link
              href="#"
              variant="body2"
              sx={{ marginBottom: 2, display: "block" }}
            >
              <FileDownloadIcon
                sx={{ marginRight: 0.5, fontSize: "inherit" }}
              />{" "}
              Product catalog Template.xls
            </Link>{" "}
          </Box>
       
          <TableContainer component={Paper}>
            <Table aria-label="product upload table">
              <TableHead sx={{ backgroundColor: theme.palette.action.hover }}>
                {" "}
                {/* Add background color */}
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>FILE NAME</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>PC</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>CREATED ON</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>STATUS</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>ACTION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>products-04752.xlsx</TableCell>
                  <TableCell>0007 - Yale - West Chester</TableCell>
                  <TableCell>08/01/2021 10:08am</TableCell>
                  <TableCell>{getStatusChip("Failed")}</TableCell>
                  <TableCell>
                    <Link href="#" variant="body2">
                      <UploadFileIcon sx={{ fontSize: "24px" }} />{" "}
                      {/* Increased icon size */}
                    </Link>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>products-dallas.xlsx</TableCell>
                  <TableCell>0050 - kansas city-omaha ced</TableCell>
                  <TableCell>08/01/2021 08:08pm</TableCell>
                  <TableCell>{getStatusChip("Failed")}</TableCell>
                  <TableCell>
                    <Link href="#" variant="body2">
                      <UploadFileIcon sx={{ fontSize: "24px" }} />{" "}
                      {/* Increased icon size */}
                    </Link>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>products-denver-ced.xlsx</TableCell>
                  <TableCell>1872 COD BRYAN MCCORMICK</TableCell>
                  <TableCell>09/30/2021 11:08am</TableCell>
                  <TableCell>{getStatusChip("Success")}</TableCell>
                  <TableCell>
                    <Link href="#" variant="body2">
                      <UploadFileIcon sx={{ fontSize: "24px" }} />{" "}
                      {/* Increased icon size */}
                    </Link>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>products-denver.xlsx</TableCell>
                  <TableCell>0148-Albuquerque-CED Greentech</TableCell>
                  <TableCell>07/11/2021 06:08am</TableCell>
                  <TableCell>{getStatusChip("Success")}</TableCell>
                  <TableCell>
                    <Link href="#" variant="body2">
                      <UploadFileIcon sx={{ fontSize: "24px" }} />{" "}
                      {/* Increased icon size */}
                    </Link>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>products-kensas.xlsx</TableCell>
                  <TableCell>1872-COD CRAIG GALLOGLY</TableCell>
                  <TableCell>11/12/2021 07:45pm</TableCell>
                  <TableCell>{getStatusChip("Success")}</TableCell>
                  <TableCell>
                    <Link href="#" variant="body2">
                      <UploadFileIcon sx={{ fontSize: "24px" }} />{" "}
                      {/* Increased icon size */}
                    </Link>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          </Box></Box>
    </MasterLayout>
  );
};

export default GLProductUpload;
