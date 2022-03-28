/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import makeStyles from '@mui/styles/makeStyles';

import MultiSelectProps from './MSProps';
import MultiSelectContainer from './MSContainer';
import MultiSelectList from './MSList';

const useStyles = makeStyles(() => ({
  list: {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
  },
}));

const MultiSelectTwoSections = ({ label, sections }: { label: string; sections: MultiSelectProps[] }): JSX.Element => {
  const classes: any = useStyles();

  return (
    <MultiSelectContainer label={label}>
      {sections.map(({ label: sectionLabel, selectedOptions, setSelectedOptions, options }: MultiSelectProps) => (
        <>
          <div>{sectionLabel}</div>
          <MultiSelectList
            className={classes.list}
            entries={Object.entries(options)}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          />
        </>
      ))}
    </MultiSelectContainer>
  );
};

export default MultiSelectTwoSections;
