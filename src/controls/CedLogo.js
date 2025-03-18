import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material'; // Import useMediaQuery and useTheme

const LogoContainer = styled.div`
  position: relative;
  width: auto; // Adjust as needed
  height: 80px; // Adjust as needed
  background-color: transparent;
  display: flex;
  
  align-items: center;
  margin-top: -16px;
  cursor: pointer;
`;

const LetterD = styled.div`
  font-size: 40px; // Adjust as needed
  font-weight: bold;
  font-family: sans-serif; // Adjust as needed
  color: transparent;
  -webkit-text-stroke: 2px #ffffff; // Gold stroke
  background: linear-gradient(to bottom, #FFCF70, white); // Gold gradient
  -webkit-background-clip: text;
 
`;


const LetterE = styled.span`
  font-size: 50px; // Increased font size for 'E'
  font-weight: bold;
  font-family: sans-serif;
  color: transparent;
  -webkit-text-stroke: 2px #ffffff;
  background: linear-gradient(to bottom, #FFCF70, white);
  -webkit-background-clip: text;
`;

const TextKMSBCS = styled.div`
  font-size: 12px; // Adjust as needed
  font-family: sans-serif; // Adjust as needed
  color: #DDE9F5; // Gold color
  letter-spacing: 5px; // Adjust as needed
  // margin-top: -16px; // Adjust as needed
  white-space: 'nowrap';
  margin-left:8px
`;

const CedLogo = () => {
  const navigate = useNavigate();
  const mqTheme = useTheme();
  const isSmallScreen = useMediaQuery(mqTheme.breakpoints.down('sm'));

  const handleLogoClick = () => {
    navigate('/'); // Redirect to the home page
  };

  return (
    <LogoContainer onClick={handleLogoClick}>
    <LetterD>D</LetterD>
    <LetterE>E</LetterE>
    <LetterD>C</LetterD>
    {!isSmallScreen && <TextKMSBCS>KNOWLEDGE MANAGEMENT</TextKMSBCS>}
  </LogoContainer>
  );
};

export default CedLogo;