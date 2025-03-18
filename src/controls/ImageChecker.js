import React, { useState } from 'react';
import noImageFound from '../images/noimagef.png'; // Import the image from your local path
import { Box } from '@mui/material';

function ImageChecker({ imageUrl }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoaded(false);
    setImageError(true);
  };

  return (
    <Box sx={{justifyContent:"center",alignItems:"center",display:"flex"}}>
      {imageError ? (
        <img  height="140" width="140" src={noImageFound} alt="Image not found" />
      ) : (
        <img
          src={imageUrl}
          height="140"
          alt="Checked Image"
          width="100%"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}
    </Box>
  );
}

export default ImageChecker;