/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useCallback, useMemo } from 'react';
import { Divider, IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import makeStyles from '@mui/styles/makeStyles';
import './characters.css';

const useStyles = makeStyles(() => ({
  paper: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: 3,
    flex: 1,
    fontSize: 16,
  },
  iconButton: {
    padding: 10,
    ' & svg': {
      fontSize: 18,
    },
  },
}));

interface CustomSearchInputProps {
  search: string;
  setSearch: (search: string) => void;
}

const CustomSearchInput = ({ search, setSearch }: CustomSearchInputProps): JSX.Element => {
  const classes: any = useStyles();
  const stopClick = (e: React.SyntheticEvent | React.MouseEvent) => e.stopPropagation();

  return (
    <Paper className={classes.paper} onClick={stopClick}>
      <InputBase
        className={classes.input}
        placeholder="NFT Name or ID"
        inputProps={{ 'aria-label': 'NFT Name or ID' }}
        value={search}
        onChange={event => {
          setSearch(event?.target?.value);
        }}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search" size="large">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default CustomSearchInput;
