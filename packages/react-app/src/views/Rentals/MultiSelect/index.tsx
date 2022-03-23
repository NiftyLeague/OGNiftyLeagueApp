/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useCallback, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, InputLabel, TextField, List } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import FilterItem from './FilterItem';
import { useStyles } from './styles';

interface MultiSelectProps {
  searchable?: boolean;
  label: string;
  selectedOptions: string[];
  setSelectedOptions: (value: string[]) => void;
  options: { [key: string]: string };
}

const MultiSelect = ({
  searchable,
  label,
  selectedOptions,
  setSelectedOptions,
  options,
}: MultiSelectProps): JSX.Element => {
  const classes: any = useStyles();
  const [searchText, setSeachText] = useState<string>('');
  const handleToggle = useCallback(
    id => {
      const currentIndex = selectedOptions.indexOf(id);
      const newChecked = [...selectedOptions];

      if (currentIndex === -1) {
        newChecked.push(id);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setSelectedOptions(newChecked);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedOptions.length],
  );

  return (
    <Accordion style={{ margin: 0 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <InputLabel className={classes.label}>{label}</InputLabel>
      </AccordionSummary>
      <AccordionDetails>
        {searchable && (
          <TextField
            fullWidth
            label="Search"
            margin="dense"
            onChange={({ target: { value } }) => {
              setSeachText(value);
            }}
            value={searchText}
          />
        )}
        <List
          sx={{
            width: '100%',
            maxWidth: 360,
            maxHeight: 400,
            overflow: 'auto',
            overflowX: 'hidden',
            bgcolor: 'background.paper',
          }}
        >
          {Object.entries(options)
            .filter(([, value]) => value.toLowerCase().includes(searchText.toLowerCase()))
            .map(([id, value]) => (
              <FilterItem id={id} value={value} checked={selectedOptions.indexOf(id) !== -1} onToggle={handleToggle} />
            ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

MultiSelect.defaultProps = {
  searchable: true,
};

export default MultiSelect;
