import React from "react";
import { Box, Typography, Grid, styled, Paper } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import LinkIcon from "@mui/icons-material/Link";
import SettingsIcon from "@mui/icons-material/Settings";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import SearchIcon from "@mui/icons-material/Search";
import ReceiptIcon from "@mui/icons-material/Receipt";
import HistoryIcon from "@mui/icons-material/History";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const StyledFieldSet = styled("fieldset")(({ theme }) => ({
  border: "1px solid #ccc",
  borderRadius: "4px",
  padding: theme.spacing(2),
  margin: "10px",
  width: "100%",
}));

const StyledLegend = styled("legend")(({ theme }) => ({
  backgroundColor: "#a9c2d3",
  padding: theme.spacing(0.5, 2),
  borderRadius: "4px",
  color: "white",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "left",
  color: theme.palette.text.secondary,
  height: "100%",
  flexGrow: 1,
}));

const GLSettingsContent = () => {
  const Section = styled(Box)(({ theme }) => ({
    padding: theme.spacing(1, 0),
    "&:not(:last-child)": {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  }));

  const StyledTypography = styled(Typography)(({ theme }) => ({
    paddingLeft: theme.spacing(1),
    fontWeight: "bold",
    fontSize: "0.75rem",
  }));

  const StyledSecondaryTypography = styled(Typography)(({ theme }) => ({
    paddingLeft: theme.spacing(1),
    marginTop: theme.spacing(0.5),
  }));

  const StyledSectionBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    height: "100%",
  }));

  const StyledIconBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  }));

  return (
    <Grid container spacing={0} sx={{ marginTop: "20px", height: "100%" }}>
      <Grid item xs={12} sm={4} md={4} lg={4} xl={4} sx={{ display: "flex" }}>
        <StyledFieldSet>
          <StyledLegend>SETTINGS</StyledLegend>
          <StyledPaper>
            <Section>
              <Grid container alignItems="center">
                <Grid item xs={2}>
                  <StyledIconBox>
                    <PeopleIcon sx={{ alignSelf: "center" }} />
                  </StyledIconBox>
                </Grid>
                <Grid item xs={10}>
                  <StyledTypography variant="subtitle2">
                    CEDNET CUSTOMERS
                  </StyledTypography>
                  <StyledSecondaryTypography variant="body2">
                    8 Accounts
                  </StyledSecondaryTypography>
                </Grid>
              </Grid>
            </Section>
            <Section>
              <Grid container alignItems="center">
                <Grid item xs={2}>
                  <StyledIconBox>
                    <LinkIcon sx={{ alignSelf: "center" }} />
                  </StyledIconBox>
                </Grid>
                <Grid item xs={10}>
                  <StyledTypography variant="subtitle2">
                    CONNECTIONS
                  </StyledTypography>
                  <StyledSecondaryTypography variant="body2">
                    NetSuite
                  </StyledSecondaryTypography>
                  <StyledSecondaryTypography variant="body2">
                    1 Connection
                  </StyledSecondaryTypography>
                </Grid>
              </Grid>
            </Section>
            <Section>
              <Grid container alignItems="center">
                <Grid item xs={2}>
                  <StyledIconBox>
                    <SettingsIcon sx={{ alignSelf: "center" }} />
                  </StyledIconBox>
                </Grid>
                <Grid item xs={10}>
                  <StyledTypography variant="subtitle2">
                    BILL/CREDIT MEMO SETTINGS
                  </StyledTypography>
                  <StyledSecondaryTypography variant="body2">
                    Automatic
                  </StyledSecondaryTypography>
                  <StyledSecondaryTypography variant="body2">
                    Item Level
                  </StyledSecondaryTypography>
                </Grid>
              </Grid>
            </Section>
            <Section>
              <Grid container alignItems="center">
                <Grid item xs={2}>
                  <StyledIconBox>
                    <SettingsIcon sx={{ alignSelf: "center" }} />
                  </StyledIconBox>
                </Grid>
                <Grid item xs={10}>
                  <StyledTypography variant="subtitle2">
                    ACCOUNTS PAYABLE(A/P) SETTINGS
                  </StyledTypography>
                  <StyledSecondaryTypography variant="body2">
                    9 Settings
                  </StyledSecondaryTypography>
                </Grid>
              </Grid>
            </Section>
            <Section>
              <Grid container alignItems="center">
                <Grid item xs={2}>
                  <StyledIconBox>
                    <SettingsIcon sx={{ alignSelf: "center" }} />
                  </StyledIconBox>
                </Grid>
                <Grid item xs={10}>
                  <StyledTypography variant="subtitle2">
                    ACCOUNTS PAYABLE(A/P) SETTINGS
                  </StyledTypography>
                  <StyledSecondaryTypography variant="body2">
                    9 Settings
                  </StyledSecondaryTypography>
                  <StyledSecondaryTypography variant="body2" color="error">
                    ⚠️ Add a connection to enable this setting
                  </StyledSecondaryTypography>
                </Grid>
              </Grid>
            </Section>
            <Section>
              <Grid container alignItems="center">
                <Grid item xs={2}>
                  <StyledIconBox>
                    <SettingsIcon sx={{ alignSelf: "center" }} />
                  </StyledIconBox>
                </Grid>
                <Grid item xs={10}>
                  <StyledTypography variant="subtitle2">
                    NOTIFICATION SETTINGS
                  </StyledTypography>
                  <StyledSecondaryTypography variant="body2">
                    4 Settings
                  </StyledSecondaryTypography>
                </Grid>
              </Grid>
            </Section>
          </StyledPaper>
        </StyledFieldSet>
      </Grid>

      <Grid item xs={12} sm={4} md={4} lg={4} xl={4} sx={{ display: "flex" }}>
        <StyledFieldSet>
          <StyledLegend>PRODUCTS</StyledLegend>
          <StyledPaper>
            <Section>
              <Grid container alignItems="center">
                <Grid item xs={2}>
                  <StyledIconBox>
                    <UploadFileIcon sx={{ alignSelf: "center" }} />
                  </StyledIconBox>
                </Grid>
                <Grid item xs={10}>
                  <StyledTypography variant="subtitle2">
                    UPLOAD PRODUCTS EXCEL
                  </StyledTypography>
                  <StyledSecondaryTypography variant="body2">
                    16 Uploads
                  </StyledSecondaryTypography>
                </Grid>
              </Grid>
            </Section>
            <Section>
              <Grid container alignItems="center">
                <Grid item xs={2}>
                  <StyledIconBox>
                    <SearchIcon sx={{ alignSelf: "center" }} />
                  </StyledIconBox>
                </Grid>
                <Grid item xs={10}>
                  <StyledTypography variant="subtitle2">
                    SEARCH AND ADD PRODUCT TO CATALOG
                  </StyledTypography>
                </Grid>
              </Grid>
            </Section>
            <Section>
              <Grid container alignItems="center">
                <Grid item xs={2}>
                  <StyledIconBox>
                    <AccessTimeIcon sx={{ alignSelf: "center" }} />
                  </StyledIconBox>
                </Grid>
                <Grid item xs={10}>
                  <StyledTypography variant="subtitle2">
                    TRANSMIT HISTORY
                  </StyledTypography>
                  <StyledSecondaryTypography variant="body2">
                    100 Records
                  </StyledSecondaryTypography>
                  <StyledSecondaryTypography variant="body2">
                    Last Transmitted on 12/20/2021
                  </StyledSecondaryTypography>
                </Grid>
              </Grid>
            </Section>
          </StyledPaper>
        </StyledFieldSet>
      </Grid>

      <Grid item xs={12} sm={4} md={4} lg={4} xl={4} sx={{ display: "flex" }}>
        <StyledFieldSet>
          <StyledLegend>TRANSACTIONS</StyledLegend>
          <StyledPaper>
            <Section>
              <Grid container alignItems="center">
                <Grid item xs={2}>
                  <StyledIconBox>
                    <ReceiptIcon sx={{ alignSelf: "center" }} />
                  </StyledIconBox>
                </Grid>
                <Grid item xs={10}>
                  <StyledTypography variant="subtitle2">
                    CUSTOMER BILLS
                  </StyledTypography>
                  <StyledSecondaryTypography variant="body2">
                    100 Records
                  </StyledSecondaryTypography>
                  <StyledSecondaryTypography variant="body2">
                    Last Transmitted on 12/20/2021
                  </StyledSecondaryTypography>
                </Grid>
              </Grid>
            </Section>
            <Section>
              <Grid container alignItems="center">
                <Grid item xs={2}>
                  <StyledIconBox>
                    <CreditScoreIcon sx={{ alignSelf: "center" }} />
                  </StyledIconBox>
                </Grid>
                <Grid item xs={10}>
                  <StyledTypography variant="subtitle2">
                    CUSTOMER CREDITS
                  </StyledTypography>
                  <StyledSecondaryTypography variant="body2">
                    100 Records
                  </StyledSecondaryTypography>
                  <StyledSecondaryTypography variant="body2">
                    Last Transmitted on 12/20/2021
                  </StyledSecondaryTypography>
                </Grid>
              </Grid>
            </Section>
            <Section>
              <Grid container alignItems="center">
                <Grid item xs={2}>
                  <StyledIconBox>
                    <ReceiptIcon sx={{ alignSelf: "center" }} />
                  </StyledIconBox>
                </Grid>
                <Grid item xs={10}>
                  <StyledTypography variant="subtitle2">
                    PURCHASE ORDERS
                  </StyledTypography>
                  <StyledSecondaryTypography variant="body2">
                    166 Orders
                  </StyledSecondaryTypography>
                  <StyledSecondaryTypography variant="body2">
                    Last Received on 01/01/2004
                  </StyledSecondaryTypography>
                </Grid>
              </Grid>
            </Section>
          </StyledPaper>
        </StyledFieldSet>
      </Grid>
    </Grid>
  );
};

export default GLSettingsContent;
