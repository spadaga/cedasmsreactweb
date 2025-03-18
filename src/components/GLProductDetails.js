import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import MasterLayout from "../Layout/MasterLayout"; // Adjust the path as needed
import GLProductDetailsTab from "./GLProductDetailsTab";
import GLProductPricingTab from "./GLProductPricingTab";
import GlCommonTab from "../controls/GlCommonTab";
import { useThemeContext } from "../context/ThemeContext";
import { showToast } from "../utils/toastUtils";
import { useNavigate } from "react-router-dom";
import Loading from "../utils/Loading";
import { useTheme, useMediaQuery } from "@mui/material";
import GLDynamicHeader from "../controls/GLDynamicHeader";
import LoremIpsum from "react-lorem-ipsum";
import AddIcon from "@mui/icons-material/Add";
const GLProductDetails = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [GlCustomers, setGlCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useThemeContext();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleBack = () => {
    navigate("/glmanagecustomer"); // Navigate to /glnewcustomers
  };

  return (
    <MasterLayout title="MANAGE GL CUSTOMER">
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

<Box sx={{ minHeight: "100vh", padding: isSmallScreen ? "0px" : "0" }}>
          <GLDynamicHeader
            title="Product Details "
            descriptionContent={
              <p>
                <LoremIpsum p={2} />
              </p>
            }
            showBackButton={true}
            backButtonHandler={handleBack}
       
           
        
          />
      <GlCommonTab
        value={value}
        handleChange={handleChange}
        theme={theme}
        labels={["Product Details", "Product Pricing"]}
      >
        <GLProductDetailsTab
          value={value}
          index={0}
          theme={theme}
          isSmallScreen={isSmallScreen}
        />
        <GLProductPricingTab value={value} index={1} theme={theme} />
      </GlCommonTab>
      </Box>  </Box>
    </MasterLayout>
  );
};

export default GLProductDetails;
