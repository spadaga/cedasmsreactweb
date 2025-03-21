import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  TextField,
  InputAdornment,
  IconButton,
  Grid,
  Divider,
  FormControl,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Description, ReceiptLong } from "@mui/icons-material";

const GLMemoTopComponent = ({ onChange }) => {
  const [allowMiscellaneousBill, setAllowMiscellaneousBill] = useState(false);
  const [linkBillWithPO, setLinkBillWithPO] = useState(false);
  const [autoReceivePO, setAutoReceivePO] = useState(false);
  const [substituteOption, setSubstituteOption] = useState("original");
  const [partNameReference, setPartNameReference] = useState("");
  const [defaultInventoryLocation, setDefaultInventoryLocation] = useState("");
  const [allowMiscellaneousCredit, setAllowMiscellaneousCredit] = useState(false);
  const [linkCreditWithBill, setLinkCreditWithBill] = useState(false);

  const sectionStyle = {
    width: "48%",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    padding: 3,
  };

  const handleChange = () => {
    if (onChange) {
      onChange();
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", padding: 3 }}>
      <Box sx={sectionStyle}>
        <Box
          sx={{
            mb: 2,
            backgroundColor: "#ededed",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: 1,
          }}
        >
          <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
            <Description sx={{ marginRight: 1, color: "#3f51b5" }} />
            <Typography variant="h6">Bill Settings</Typography>
          </Box>
          <Divider />
        </Box>

        <FormControlLabel
          control={
            <Checkbox
              checked={allowMiscellaneousBill}
              onChange={(e) => {
                setAllowMiscellaneousBill(e.target.checked);
                handleChange();
              }}
            />
          }
          label="Allow Miscellaneous"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={linkBillWithPO}
              onChange={(e) => {
                setLinkBillWithPO(e.target.checked);
                handleChange();
              }}
            />
          }
          label="Link Bill with PO"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={autoReceivePO}
              onChange={(e) => {
                setAutoReceivePO(e.target.checked);
                handleChange();
              }}
            />
          }
          label="Auto Receive PO"
        />

        <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
          For Substitutes
        </Typography>
        <RadioGroup
          value={substituteOption}
          onChange={(e) => {
            setSubstituteOption(e.target.value);
            handleChange();
          }}
        >
          <FormControlLabel
            value="original"
            control={<Radio />}
            label="Use the original item name from PO"
          />
          <FormControlLabel
            value="actual"
            control={<Radio />}
            label="Use the actual item name from CED Invoice"
          />
        </RadioGroup>

        <TextField
          label="Part Name Reference"
          value={partNameReference}
          onChange={(e) => setPartNameReference(e.target.value)}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mt: 2 }}
        />

        <TextField
          label="Default Inventory Location"
          value={defaultInventoryLocation}
          onChange={(e) => setDefaultInventoryLocation(e.target.value)}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <LocationOnIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mt: 2 }}
        />
      </Box>

      <Divider orientation="vertical" flexItem />

      <Box sx={sectionStyle}>
        <Box
          sx={{
            mb: 2,
            backgroundColor: "#ededed",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: 1,
          }}
        >
          <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
            <ReceiptLong sx={{ marginRight: 1, color: "#3f51b5" }} />
            <Typography variant="h6">Credit Memo Settings</Typography>
          </Box>
          <Divider />
        </Box>

        <FormControl component="fieldset">
          <FormControlLabel
            control={
              <Checkbox
                checked={allowMiscellaneousCredit}
                onChange={(e) => {
                  setAllowMiscellaneousCredit(e.target.checked);
                  handleChange();
                }}
              />
            }
            label="Allow Miscellaneous"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={linkCreditWithBill}
                onChange={(e) => {
                  setLinkCreditWithBill(e.target.checked);
                  handleChange();
                }}
              />
            }
            label="Link Credit with Bill"
          />
        </FormControl>
      </Box>
    </Box>
  );
};

export default GLMemoTopComponent;