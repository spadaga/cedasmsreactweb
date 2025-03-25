// Glcustomers.js
import React, { useState, useEffect } from "react";
import MasterLayout from "../Layout/MasterLayout";
import { useTheme, useMediaQuery } from "@mui/material";
import { getglAllCustomers } from "../services/api";
import { useThemeContext } from "../context/ThemeContext";
import { showToast } from "../utils/toastUtils";
import { useNavigate } from "react-router-dom";
import Loading from "../utils/Loading";
import GlCommonTab from "../controls/GlCommonTab";
import GlConnectedTab from "./GlConnectedTab";
import GlPendingConnection from "./GlPendingConnection";
import GLBills from "./GLBills";

const Glcustomers = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [GlCustomers, setGlCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useThemeContext();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    fetchGlCustomers();
  }, []);

  const fetchGlCustomers = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    try {
      const response = await getglAllCustomers();
      setGlCustomers(response.data);
    } catch (error) {
      showToast("error", "Error fetching GlCustomers");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateNewCustomer = () => {
    navigate("/glnewcustomers");
  };

  return (
    <MasterLayout title={"GL CUSTOMERS"}>
      <GlCommonTab value={value} handleChange={handleChange} theme={theme} labels={["CONNECTED/DISCONNECTED", "PRODCUT CATALOG","BILLS"]}>
        <GlConnectedTab
          value={value}
          index={0}
          GlCustomers={GlCustomers}
          handleCreateNewCustomer={handleCreateNewCustomer}
          theme={theme}
          isSmallScreen={isSmallScreen}
        />
        <GlPendingConnection value={value} index={1} theme={theme} />


        <GLBills value={value} index={1} theme={theme} />
      </GlCommonTab>
      <Loading isLoading={isLoading} />
    </MasterLayout>
  );
};
// Provide default labels if none are passed.

export default Glcustomers;