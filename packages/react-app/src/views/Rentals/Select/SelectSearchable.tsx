/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from 'react';
import { TextField, List, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import makeStyles from '@mui/styles/makeStyles';

import SelectProps from './SelectProps';
import Section from '../Section';
import SelectList from './SelectList';
import { useThemeSwitcher } from 'react-css-theme-switcher';

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

const SelectSearchable = ({ label, selectedOptions, setSelectedOptions, options }: SelectProps): JSX.Element => {
  const classes: any = useStyles();
  const [searchText, setSeachText] = useState<string>('');
  const { currentTheme } = useThemeSwitcher();

  return (
    <Section label={label}>
      {Object.keys(options).length > 7 && (
        <TextField
          sx={{
            padding: '20px 16px 8px',
            margin: 0,

            '& legend': {
              display: 'none',
            },
            '& div': {
              '& input': {
                paddingTop: '8px',
                paddingBottom: '11px',
                color: currentTheme === 'dark' ? '#121212' : '#fff',
              },
              '& fieldset': {
                borderColor: currentTheme === 'dark' ? '#121212' : '#fff',
              },
            },
          }}
          fullWidth
          placeholder="Search"
          onChange={({ target: { value } }) => {
            setSeachText(value);
          }}
          value={searchText}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: currentTheme === 'dark' ? '#121212' : '#fff' }} />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
      )}
      <SelectList
        className={classes.list}
        entries={Object.entries(options).filter(([, value]) => value.toLowerCase().includes(searchText.toLowerCase()))}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
    </Section>
  );
};

export default SelectSearchable;
