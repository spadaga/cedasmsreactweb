import React from 'react';
import { Box, Typography, Button, Tooltip, useTheme , useMediaQuery } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { LoremIpsum } from 'react-lorem-ipsum';
import { useRef, useEffect, useState } from 'react';

function GLDynamicHeader({
  title,
  showBackButton = false,
  backButtonHandler,
  showAddButton = false,
  addButtonText = '+ Add Customer',
  addButtonHandler,
  showDescription = true, // Added prop to control description visibility
  descriptionContent = <LoremIpsum p={2} />, // Added prop for custom description content
}) {
  const theme = useTheme();
  const loremRef = useRef(null);
  const [fullText, setFullText] = useState("");

  
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if(loremRef.current && showDescription){
      setFullText(loremRef.current.textContent);
    }
  }, [showDescription]);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
            flexDirection: isSmallScreen ? "column" : "row", // Stack on small screens
            justifyContent: "space-between",
            alignItems: isSmallScreen ? "flex-start" : "center", // Align left on small screens
            mb: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            fontSize: '1.5rem',
            color: theme.palette.text.primary,
            mb: isSmallScreen ? 1 : 0, // Add margin bottom on small screens
          }}
        >
          {title}
        </Typography>
       <Box display="flex" sx={{ mt: isSmallScreen ? 1 : 0 }}>
          {showBackButton && (
            <Button
              variant="outlined"
              sx={{ mr: 1, textTransform: 'none', fontWeight: 600 }}
              onClick={backButtonHandler}
              startIcon={<ArrowBack />}
            >
              Back
            </Button>
          )}
          {showAddButton && (
            <Button
              variant="contained"
              color="primary"
              sx={{ textTransform: 'none', fontWeight: 600 }}
              onClick={addButtonHandler}
            >
              {addButtonText}
            </Button>
          )}
        </Box>
      </Box>

      {showDescription && (
        <Tooltip title={fullText}>
          <Typography
            variant="body2"
            sx={{
              mb: 4,
              fontSize: '0.875rem',
              color: theme.palette.text.secondary,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              maxWidth: 'auto',
            }}
          >
            <div ref={loremRef}>{descriptionContent}</div>
          </Typography>
        </Tooltip>
      )}
    </Box>
  );
}

export default GLDynamicHeader;