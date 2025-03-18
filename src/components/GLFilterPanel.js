import React, { useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  Checkbox,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Radio,
  RadioGroup,
  FormControlLabel,
  styled,
  useTheme,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Styled Components for Accordion Header
const AccordionHeader = styled(AccordionSummary)(({ theme }) => ({
  backgroundColor: theme.palette.action.hover, // Light background on hover
  padding: '2px 8px', // Further reduced padding to reduce height
  height: '42px', // Set a minimum height (adjust as needed)
  overflow:"hidden",
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(180deg)',
  },
  '& .MuiAccordionSummary-content': {
    margin: '4px 0', // Reduced content margin
  },
  '& .MuiTypography-root': {
    fontSize: '0.875rem', // Reduced font size
  },
  '&.Mui-expanded': {
    minHeight: '42px',
  },
}));

// Styled Components for Accordion Details
const AccordionContent = styled(AccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2), overflow:"hidden"
}));

// Styled Component for Accordion
const StyledAccordion = styled(Accordion)(({ theme }) => ({
  boxShadow: 'none', // Remove paper shadow
  backgroundColor: theme.palette.background.paper, // Apply background color from theme
  color: theme.palette.text.primary, // Apply text color from theme
  overflow:"hidden"
}));

const GLFilterPanel = () => {
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [showMoreManufacturers, setShowMoreManufacturers] = useState(false);
  const [showMoreStockIndicators, setShowMoreStockIndicators] = useState(false);
  const [sortBy, setSortBy] = useState('Most Relevant');
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const categories = [
    { label: '(41) Builders Products', count: 41 },
    { label: '(348) Conduit & Raceways', count: 348 },
    { label: '(1317) Conduit Fittings & Accessories', count: 1317 },
    { label: '(261) Controls', count: 261 },
    { label: '(1136) Distribution Equipment', count: 1136 },
    { label: '(2055) Fuses & Batteries', count: 2055 },
    { label: '(1643) Lighting', count: 1643 },
    { label: '(29) Line Construction', count: 29 },
    { label: '(1907) Miscellaneous Material', count: 1907 },
  ];

  const manufacturers = [
    { label: 'GREENLEC TEKTRON', count: 45 },
    { label: 'COOPER BUSSMANN', count: 84 },
    { label: 'SIEMENS', count: 1317 },
    { label: 'SCHNEIDER ELECTRIC', count: 241 },
    { label: 'SW ELECTRICAL', count: 1136 },
    { label: '3M ELECTRICAL', count: 1058 },
    { label: 'ABB/LOW VOLTAGE PROD & SYS', count: 11 },
    { label: 'ACME ELECTRIC CORP', count: 1 },
    { label: 'ADVANCED LAMP COATINGS', count: 5 },
    { label: 'ALLIED MOULDED PRODUCTS', count: 13 },
  ];

  const stockIndicators = [
    { label: 'Stock', count: 8808 },
    { label: 'Non-Stock', count: 2266335 },
  ];

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const toggleShowMoreCategories = () => {
    setShowMoreCategories(!showMoreCategories);
  };

  const toggleShowMoreManufacturers = () => {
    setShowMoreManufacturers(!showMoreManufacturers);
  };

  const toggleShowMoreStockIndicators = () => {
    setShowMoreStockIndicators(!showMoreStockIndicators);
  };

  return (
    <Box
      sx={{
      
        border: `1px solid ${theme.palette.divider}`, // Use theme divider color
        padding: '0px',
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden', // Add this line
        backgroundColor: theme.palette.background.default, // Apply background color from theme
        color: theme.palette.text.primary, // Apply text color from theme
        overflow:"hidden"
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ backgroundColor: theme.palette.action.selected, padding: '8px' }}>
        Filters
      </Typography>

      {/* Sort By */}
      <StyledAccordion defaultExpanded>
        <AccordionHeader expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1">Sort By</Typography>
        </AccordionHeader>
        <AccordionContent>
          <RadioGroup value={sortBy} onChange={handleSortByChange}>
            <FormControlLabel value="Most Relevant" control={<Radio />} label="Most Relevant" />
            <FormControlLabel value="Most Popular" control={<Radio />} label="Most Popular" />
          </RadioGroup>
        </AccordionContent>
      </StyledAccordion>

      {/* Categories */}
      <StyledAccordion defaultExpanded>
        <AccordionHeader expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1">Categories</Typography>
        </AccordionHeader>
        <AccordionContent>
          <List>
            {categories.slice(0, showMoreCategories ? categories.length : 5).map((category, index) => (
              <ListItem key={index} disablePadding>
                <Checkbox />
                <Typography variant="body2">{category.label}</Typography>
              </ListItem>
            ))}
          </List>
          {categories.length > 5 && (
            <Button onClick={toggleShowMoreCategories} startIcon={showMoreCategories ? <RemoveIcon /> : <AddIcon />}>
              {showMoreCategories ? 'Show Less' : 'Show More'}
            </Button>
          )}
        </AccordionContent>
      </StyledAccordion>

      {/* Manufacturer */}
      <StyledAccordion defaultExpanded>
        <AccordionHeader expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1">Manufacturer</Typography>
        </AccordionHeader>
        <AccordionContent>
          <TextField size="small" label="Search manufacturers" variant="outlined" sx={{ mb: 1 }} />
          <List>
            {manufacturers.slice(0, showMoreManufacturers ? manufacturers.length : 5).map((manufacturer, index) => (
              <ListItem key={index} disablePadding>
                <Checkbox />
                <Typography variant="body2">
                  {manufacturer.label} {manufacturer.count !== undefined ? `(${manufacturer.count})` : ''}
                </Typography>
              </ListItem>
            ))}
          </List>
          {manufacturers.length > 5 && (
            <Button onClick={toggleShowMoreManufacturers} startIcon={showMoreManufacturers ? <RemoveIcon /> : <AddIcon />}>
              {showMoreManufacturers ? 'Show Less' : 'Show More'}
            </Button>
          )}
        </AccordionContent>
      </StyledAccordion>

      {/* Stock Indicator */}
      <StyledAccordion defaultExpanded>
        <AccordionHeader expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1">Stock Indicator</Typography>
        </AccordionHeader>
        <AccordionContent>
          <List>
            {stockIndicators.slice(0, showMoreStockIndicators ? stockIndicators.length : 5).map((stockIndicator, index) => (
              <ListItem key={index} disablePadding>
                <Checkbox />
                <Typography variant="body2">{stockIndicator.label} ({stockIndicator.count})</Typography>
              </ListItem>
            ))}
          </List>
          {stockIndicators.length > 5 && (
            <Button onClick={toggleShowMoreStockIndicators} startIcon={showMoreStockIndicators ? <RemoveIcon /> : <AddIcon />}>
              {showMoreStockIndicators ? 'Show Less' : 'Show More'}
            </Button>
          )}
        </AccordionContent>
      </StyledAccordion>
    </Box>
  );
};

export default GLFilterPanel