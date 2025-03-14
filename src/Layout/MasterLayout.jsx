import React from 'react';
import Header from '../controls/Header';
import Footer from '../controls/Footer';
import { Box, Container } from '@mui/material';

const MasterLayout = ({ children, title }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header title={title} />
      <Container sx={{ flex: 1, paddingBottom: '60px', marginTop: '16px' }}>
        {children}
      </Container>
      <Footer />
    </Box>
  );
};

export default MasterLayout;