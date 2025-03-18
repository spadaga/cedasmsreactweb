import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';

import noImageFound from '../images/noimage.png';
function ProductAvatar({ imageurl,title }) {
  const [imageUrl, setImageUrl] = useState(imageurl);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageError(false);
  };

  const handleImageError = () => {
    setImageUrl(noImageFound);
    setImageError(true);
  };

  return (
    <Avatar
      src={imageUrl}
      alt={title}
      sx={{ width: 60, height: 60, padding: 0 }}
      onLoad={handleImageLoad}
      onError={handleImageError}
    />
  );
}

export default ProductAvatar;