import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { SORT_KEYS } from 'constants/index';

interface CustomSearchInputProps {
  sort: string;
  setSort: (search: string) => void;
}

const CustomSort = ({ sort, setSort }: CustomSearchInputProps): JSX.Element => {
  const handleMuiSelectOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSort(event.target.value);
  };
  return (
    <Select value={sort} onChange={handleMuiSelectOnChange} sx={{ backgroundColor: 'white', color: 'black' }}>
      {SORT_KEYS.map(ele => (
        <MenuItem value={ele.key}>{ele.display}</MenuItem>
      ))}
    </Select>
  );
};

export default CustomSort;
