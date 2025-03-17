import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
const LogoContainer = styled.div`
  position: relative;
  width: auto; // Adjust as needed
  height: 80px; // Adjust as needed
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top:-16px;
  cursor:pointer
`;

const LetterD = styled.div`
  font-size: 40px; // Adjust as needed
  font-weight: bold;
  font-family: sans-serif; // Adjust as needed
  color: transparent;
  -webkit-text-stroke: 2px #ffffff; // Gold stroke
  background: linear-gradient(to bottom, #FFCF70,ffffff); // Gold gradient
  -webkit-background-clip: text;
`;

const TextKMSBCS = styled.div`
  font-size: 12px; // Adjust as needed
  font-family: sans-serif; // Adjust as needed
  color: #DDE9F5; // Gold color
  letter-spacing: 5px; // Adjust as needed
  margin-top: -16px; // Adjust as needed
  white-space:'nowrap'
`;


const CedLogo = () => {

    const navigate = useNavigate();
    
const handleLogoClick = () => {
    navigate('/'); // Redirect to the home page
  };

  return (
    <LogoContainer onClick={handleLogoClick}>
      <LetterD>DEC</LetterD>
      <TextKMSBCS>K M S A C S</TextKMSBCS>
    </LogoContainer>
  );
};

export default CedLogo;