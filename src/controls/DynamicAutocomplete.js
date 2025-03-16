import React from 'react';
import {
  Autocomplete,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledAutocomplete = styled(Autocomplete)({
  width: '100%',
  '& .MuiAutocomplete-listbox': {
    fontSize: '0.6rem',
  },
});

function DynamicAutocomplete({ options, getOptionLabel }) {
  return (
    <StyledAutocomplete
      id="po-number-autocomplete"
      options={options}
      getOptionLabel={getOptionLabel}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          placeholder="Min 3 chars required"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  sx={{
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
      ListboxProps={{
        style: { fontSize: '0.8rem' },
      }}
    />
  );
}

export default DynamicAutocomplete;