import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Grid,
  Tooltip,
  styled,
  Autocomplete,
  ListItemText,
  Divider,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InfoIcon from "@mui/icons-material/Info";
import MasterLayout from "../Layout/MasterLayout";
import { useNavigate } from "react-router-dom";

import poNumbers from "../data/pcs.json";
import customerData from "../data/customers.json";
import accountData from "../data/accounts.json";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "../utils/toastUtils";

const GlNewcustomer = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const StyledTextField = styled(TextField)({
    width: "100%",
    "& .MuiOutlinedInput-root": {
      height: "56px",
    },
  });

  const StyledAutocomplete = styled(Autocomplete)({
    width: "100%",
    "& .MuiAutocomplete-listbox": {
      fontSize: "0.6rem",
    },
  });

  const StyledLegend = styled("legend")(({ theme }) => ({
    padding: "10px 20px",
    backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#c5d9e8",
    borderRadius: "5px",
    border: `1px solid ${theme.palette.divider}`,
    display: "inline-block",
    marginBottom: "20px",
    marginTop: "-30px",
    position: "relative",
  }));

  const handleSave = () => {
    showToast("success", "Data saved successfully");
    setTimeout(() => {
      navigate("/glmanagecustomer");
    }, 2500);
  };

  return (
    <MasterLayout title={"NEW GL CUSTOMER"}>
       <Box sx={{ padding: '20px', border: `1px solid ${theme.palette.divider}`, borderRadius: '5px', backgroundColor: theme.palette.background.paper }}> {/* Use theme divider and background */}
      <Box sx={{ padding: "20px 40px" }}>
        <Grid container spacing={2} alignItems="center" sx={{ marginBottom: "20px" }}>
          <Grid item xs={12} sm={3}>
            <Typography variant="subtitle1" component="label" htmlFor="customerName">
              CUSTOMER NAME <span style={{ color: "red" }}>*</span>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={9}>
            <StyledTextField
              fullWidth
              id="customerName"
              variant="outlined"
              placeholder="Enter customer name"
            />
          </Grid>
        </Grid>

        <fieldset style={{
          border: `1px solid ${theme.palette.divider}`,
          padding: "20px",
          borderRadius: "5px",
          marginBottom: "20px",
          backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[800] : "#F8FAFC"
        }}>
          <StyledLegend>
            <Typography variant="subtitle1">PRIMARY ACCOUNT <Tooltip title="Primary Account"><InfoIcon sx={{ fontSize: 'medium', ml: 1, verticalAlign: 'middle' }} /></Tooltip></Typography>
          </StyledLegend>

          <Grid container spacing={2} alignItems="center" sx={{ marginBottom: "20px" }}>
            <Grid item xs={12} sm={3}>
              <Typography variant="body2">PO#</Typography>
            </Grid>
            <Grid item xs={12} sm={9}>
              <StyledAutocomplete
                id="po-number-autocomplete"
                options={poNumbers}
                getOptionLabel={(option) => option.PCNAME}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Min 3 chars required"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <InputAdornment position="end">
                           <IconButton sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}>
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
                renderOption={(props, option, { selected, inputValue }) => (
                  <li {...props}>
                    <ListItemText primary={option.PCNAME} />
                    <Divider />
                  </li>
                )}
                ListboxProps={{
                  style: { fontSize: "0.8rem" },
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} alignItems="center" sx={{ marginBottom: "20px" }}>
            <Grid item xs={12} sm={3}>
              <Typography variant="body2">CEDNET CUSTOMER <span style={{ color: "red" }}>*</span></Typography>
            </Grid>
            <Grid item xs={12} sm={9}>
              <StyledAutocomplete
                id="customer-autocomplete"
                options={customerData}
                getOptionLabel={(option) => option.customername}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Min 3 chars required"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}>
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
                renderOption={(props, option, { selected, inputValue }) => (
                  <li {...props}>
                    <ListItemText primary={option.customername} />
                    <Divider />
                  </li>
                )}
                ListboxProps={{
                  style: { fontSize: "0.8rem" },
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} alignItems="center" sx={{ marginBottom: "20px" }}>
            <Grid item xs={12} sm={3}>
              <Typography variant="body2">CEDNET ACCOUNT <span style={{ color: "red" }}>*</span></Typography>
            </Grid>
            <Grid item xs={12} sm={9}>
              <StyledAutocomplete
                id="account-autocomplete"
                options={accountData}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Min 3 chars required"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <InputAdornment position="end">
                           <IconButton sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}>
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
                renderOption={(props, option, { selected, inputValue }) => (
                  <li {...props}>
                    <ListItemText primary={option.name} />
                    <Divider />
                  </li>
                )}
                ListboxProps={{
                  style: { fontSize: "0.8rem" },
                }}
              />
              <Tooltip title="This account is used for GL product catalog price refresh.">
                <Box sx={{ display: "flex", alignItems: "center", marginTop: "5px", padding: "5px", borderRadius: "4px", border: `1px solid ${theme.palette.divider}`, backgroundColor: theme.palette.background.paper }}>
                  <InfoIcon sx={{ color: "#d32f2f", marginRight: "5px" }} />
                  <Typography variant="body2" sx={{ color: "#d32f2f", fontSize: "0.8rem" }}>
                    This account is used for GL product catalog price refresh.
                  </Typography>
                </Box>
              </Tooltip>
            </Grid>
          </Grid>
        </fieldset>

        <Divider sx={{ margin: "20px 0" }} />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="outlined" sx={{ marginRight: "10px" }}>
            CANCEL
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            SAVE
          </Button>
        </Box>
      </Box>
      <ToastContainer />
      </Box>
    </MasterLayout>
  );
};

export default GlNewcustomer;