/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';

import MultiSelectProps from './MSProps';
import MultiSelectContainer from './MSContainer';
import MultiSelectList from './MSList';

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

    '& > li': {
      minWidth: '50%',
      maxWidth: '50%',
      flex: 1,
    },
  },
}));

const MultiSelectTwoColumns = ({
  label,
  selectedOptions,
  setSelectedOptions,
  options,
}: MultiSelectProps): JSX.Element => {
  const classes: any = useStyles();
  return (
    <MultiSelectContainer label={label}>
      <MultiSelectList
        className={classes.list}
        entries={Object.entries(options)}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
    </MultiSelectContainer>
  );
};

export default MultiSelectTwoColumns;
