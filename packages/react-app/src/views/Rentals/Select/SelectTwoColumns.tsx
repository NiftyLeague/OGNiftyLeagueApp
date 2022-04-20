/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';

import SelectProps from './SelectProps';
import Section from '../Section';
import SelectList from './SelectList';

const useStyles = makeStyles(() => ({
  list: {
    width: '100%',
    maxWidth: 360,
    maxHeight: 400,
    overflow: 'auto',
    overflowX: 'hidden',
    bgcolor: 'background.paper',
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
  },
}));

const SelectTwoColumns = ({ label, selectedOptions, setSelectedOptions, options }: SelectProps): JSX.Element => {
  const classes: any = useStyles();
  return (
    <Section label={label}>
      <SelectList
        className={classes.list}
        entries={Object.entries(options)}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
    </Section>
  );
};

export default SelectTwoColumns;
