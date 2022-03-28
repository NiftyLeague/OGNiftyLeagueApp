/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from 'react';
import { TextField, List, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import makeStyles from '@mui/styles/makeStyles';

import MultiSelectProps from './MSProps';
import MultiSelectContainer from './MSContainer';
import MultiSelectList from './MSList';

const useStyles = makeStyles(() => ({
  searchField: {
    padding: '20px 16px 8px',
    margin: 0,
    '& legend': {
      display: 'none',
    },
    '& input': {
      paddingTop: '8px',
      paddingBottom: '11px',
    },
  },
  list: {
    width: '100%',
    maxWidth: 360,
    maxHeight: 400,
    overflow: 'auto',
    overflowX: 'hidden',
    bgcolor: 'background.paper',

    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
}));

const MultiSelectSearchable = ({
  label,
  selectedOptions,
  setSelectedOptions,
  options,
}: MultiSelectProps): JSX.Element => {
  const classes: any = useStyles();
  const [searchText, setSeachText] = useState<string>('');

  return (
    <MultiSelectContainer label={label}>
      <TextField
        className={classes.searchField}
        fullWidth
        placeholder="Search"
        onChange={({ target: { value } }) => {
          setSeachText(value);
        }}
        value={searchText}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="outlined"
      />
      <MultiSelectList
        className={classes.list}
        entries={Object.entries(options).filter(([, value]) => value.toLowerCase().includes(searchText.toLowerCase()))}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
    </MultiSelectContainer>
  );
};

export default MultiSelectSearchable;
