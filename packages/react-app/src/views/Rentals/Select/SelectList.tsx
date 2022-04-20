/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { List } from '@mui/material';
import React from 'react';

import FilterItem from './FilterItem';
import { useToggleSelect } from './hooks';
import { useThemeSwitcher } from 'react-css-theme-switcher';

interface SelectListProps {
  className: string;
  selectedOptions: string[];
  setSelectedOptions: (value: string[]) => void;
  entries: [string, string][];
}

const SelectList = ({ className, selectedOptions, setSelectedOptions, entries }: SelectListProps): JSX.Element => {
  const handleToggle = useToggleSelect(selectedOptions, setSelectedOptions);
  const { currentTheme } = useThemeSwitcher();

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        maxHeight: 400,
        overflow: 'auto',
        overflowX: 'hidden',
        bgcolor: currentTheme === 'dark' ? '#fff' : '#121212',
        color: currentTheme === 'dark' ? '#fff' : '#121212',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',

        '&::-webkit-scrollbar': {
          display: 'none',
        },
        '& > li': {
          minWidth: '50%',
          maxWidth: '50%',
          flex: 1,
        },
      }}
    >
      {entries.map(([id, value]) => (
        <FilterItem id={id} value={value} checked={selectedOptions.indexOf(id) !== -1} onToggle={handleToggle} />
      ))}
    </List>
  );
};

export default SelectList;
