import React from "react";
import { Checkbox } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCheckbox = styled(Checkbox)({
    width: "24px",
    height: "24px",
    borderRadius: "4px",
  
    // Default Unchecked State
    "&.MuiButtonBase-root": {
      border: "2px solid gray", // Gray border when unchecked
      backgroundColor: "white",
    },
  
    // Checked State
    "&.Mui-checked": {
      backgroundColor: "green !important", // Green background when checked
      border: "2px solid green",
      color: "white !important", // White tick when checked
    },
  
    // Focus State
    "&.Mui-focusVisible, &:focus-within": {
      outline: "2px solid green !important", // Green outline when focused
    },
  
    // Icon Size
    "& .MuiSvgIcon-root": {
      fontSize: "20px", // Adjust icon size
      borderRadius: "4px",
    },
});

const CustomCheckbox = ({ item, selectedItems, handleCheckboxChange }) => {
  const isChecked = selectedItems.includes(item._id);

  return (
    <StyledCheckbox
    checked={isChecked}
    onChange={(event) => handleCheckboxChange(event, item._id)}

    sx={{
        '&.Mui-checked': {
            color: 'red',
        },
    }}
  />
  );
};

export default CustomCheckbox;
