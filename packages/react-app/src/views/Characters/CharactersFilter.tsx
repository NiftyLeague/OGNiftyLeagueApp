/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Divider,
  FormControl,
  IconButton,
  Input,
  InputBase,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

import Tooltip from 'components/Tooltip';
import { INITIAL_FILTER_STATE, MenuProps, FILTER_STATE_MAPPING } from './constants';
import { useStyles, getMenuItemStyles } from './styles';
import './characters.css';

interface MultiSelectProps {
  label: string;
  selectedOptions: string[];
  setSelectedOptions: (value: string[]) => void;
  options: { [key: string]: string };
}

const MultiSelect = ({ label, selectedOptions, setSelectedOptions, options }: MultiSelectProps): JSX.Element => {
  const classes: any = useStyles();
  return (
    <FormControl className={classes.formControl}>
      <InputLabel className={classes.label}>{label}</InputLabel>
      <Select
        classes={{ select: classes.select }}
        input={<Input />}
        MenuProps={MenuProps}
        multiple
        onChange={({ target: { value } }) => setSelectedOptions(value as string[])}
        value={selectedOptions}
        renderValue={(selected: string[]) => (
          <div className={classes.chips}>
            {selected.map(value => (
              <Chip key={value} label={value} className={classes.chip} />
            ))}
          </div>
        )}
      >
        {Object.entries(options).map(([key, value]) => (
          <MenuItem key={key} value={key} style={getMenuItemStyles(key, selectedOptions)}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

interface CustomSearchInputProps {
  clearFilters: (event: React.SyntheticEvent | React.MouseEvent) => void;
  expandFilters: (event: React.SyntheticEvent | React.MouseEvent) => void;
  filterActive: boolean;
  search: string;
  setSearch: (search: string) => void;
}

const CustomSearchInput = ({
  clearFilters,
  expandFilters,
  filterActive,
  search,
  setSearch,
}: CustomSearchInputProps): JSX.Element => {
  const classes: any = useStyles();
  const stopClick = (e: React.SyntheticEvent | React.MouseEvent) => e.stopPropagation();
  return (
    <Paper className={classes.paper} onClick={stopClick}>
      <InputBase
        className={classes.input}
        placeholder="NFT Name or ID"
        inputProps={{ 'aria-label': 'NFT Name or ID' }}
        value={search}
        onChange={({ target: { value } }) => setSearch(value)}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search" size="large">
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <Tooltip text={filterActive ? 'Clear filters' : 'Filter results'}>
        <IconButton
          classes={{ root: classes.iconButton, colorPrimary: classes.iconPrimary }}
          aria-label="filter"
          color={filterActive ? 'primary' : 'default'}
          onClick={filterActive ? clearFilters : expandFilters}
          size="large"
        >
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Paper>
  );
};

type FilterState = typeof INITIAL_FILTER_STATE;

interface CharactersFilterProps {
  filterActive: boolean;
  filterState: FilterState;
  search: string;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  setSearch: (search: string) => void;
}

const CharactersFilter = ({
  filterActive,
  filterState,
  search,
  setFilterState,
  setSearch,
}: CharactersFilterProps): JSX.Element => {
  const classes: any = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleFilterStateUpdate = (key: string, values: string[]) => {
    setFilterState((prevState: FilterState) => ({ ...prevState, [key]: values }));
  };

  const handleSubmit = (e: React.SyntheticEvent) => e.preventDefault();

  const handleClearFilters = () => {
    setExpanded(false);
    setFilterState(INITIAL_FILTER_STATE);
  };

  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <form className="games-search-wrapper" noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Accordion className={classes.accRoot} expanded={expanded} onChange={toggleExpanded}>
        <AccordionSummary>
          <Typography className={classes.accHeader}>FILTER BY:</Typography>
          <CustomSearchInput
            clearFilters={handleClearFilters}
            expandFilters={toggleExpanded}
            filterActive={filterActive}
            search={search}
            setSearch={setSearch}
          />
        </AccordionSummary>
        <AccordionDetails className={classes.accDetails}>
          <MultiSelect
            label="Tribes"
            selectedOptions={filterState.tribes}
            setSelectedOptions={values => handleFilterStateUpdate('tribes', values)}
            options={FILTER_STATE_MAPPING.tribes}
          />
          <MultiSelect
            label="Skin Colors"
            selectedOptions={filterState.skinColors}
            setSelectedOptions={values => handleFilterStateUpdate('skinColors', values)}
            options={FILTER_STATE_MAPPING.skinColors}
          />
          <MultiSelect
            label="Fur Colors"
            selectedOptions={filterState.furColors}
            setSelectedOptions={values => handleFilterStateUpdate('furColors', values)}
            options={FILTER_STATE_MAPPING.furColors}
          />
          <MultiSelect
            label="Eye Colors"
            selectedOptions={filterState.eyeColors}
            setSelectedOptions={values => handleFilterStateUpdate('eyeColors', values)}
            options={FILTER_STATE_MAPPING.eyeColors}
          />
          <MultiSelect
            label="Pupil Colors"
            selectedOptions={filterState.pupilColors}
            setSelectedOptions={values => handleFilterStateUpdate('pupilColors', values)}
            options={FILTER_STATE_MAPPING.pupilColors}
          />
          <MultiSelect
            label="Hair"
            selectedOptions={filterState.hair}
            setSelectedOptions={values => handleFilterStateUpdate('hair', values)}
            options={FILTER_STATE_MAPPING.hair}
          />
          <MultiSelect
            label="Mouths"
            selectedOptions={filterState.mouths}
            setSelectedOptions={values => handleFilterStateUpdate('mouths', values)}
            options={FILTER_STATE_MAPPING.mouths}
          />
          <MultiSelect
            label="Beards"
            selectedOptions={filterState.beards}
            setSelectedOptions={values => handleFilterStateUpdate('beards', values)}
            options={FILTER_STATE_MAPPING.beards}
          />
          <MultiSelect
            label="Tops"
            selectedOptions={filterState.tops}
            setSelectedOptions={values => handleFilterStateUpdate('tops', values)}
            options={FILTER_STATE_MAPPING.tops}
          />
          <MultiSelect
            label="Outerwear"
            selectedOptions={filterState.outerwear}
            setSelectedOptions={values => handleFilterStateUpdate('outerwear', values)}
            options={FILTER_STATE_MAPPING.outerwear}
          />
          <MultiSelect
            label="Prints"
            selectedOptions={filterState.prints}
            setSelectedOptions={values => handleFilterStateUpdate('prints', values)}
            options={FILTER_STATE_MAPPING.prints}
          />
          <MultiSelect
            label="Bottoms"
            selectedOptions={filterState.bottoms}
            setSelectedOptions={values => handleFilterStateUpdate('bottoms', values)}
            options={FILTER_STATE_MAPPING.bottoms}
          />
          <MultiSelect
            label="Footwear"
            selectedOptions={filterState.footwear}
            setSelectedOptions={values => handleFilterStateUpdate('footwear', values)}
            options={FILTER_STATE_MAPPING.footwear}
          />
          <MultiSelect
            label="Belts"
            selectedOptions={filterState.belts}
            setSelectedOptions={values => handleFilterStateUpdate('belts', values)}
            options={FILTER_STATE_MAPPING.belts}
          />
          <MultiSelect
            label="Hats"
            selectedOptions={filterState.hats}
            setSelectedOptions={values => handleFilterStateUpdate('hats', values)}
            options={FILTER_STATE_MAPPING.hats}
          />
          <MultiSelect
            label="Eyewear"
            selectedOptions={filterState.eyewear}
            setSelectedOptions={values => handleFilterStateUpdate('eyewear', values)}
            options={FILTER_STATE_MAPPING.eyewear}
          />
          <MultiSelect
            label="Piercings"
            selectedOptions={filterState.piercings}
            setSelectedOptions={values => handleFilterStateUpdate('piercings', values)}
            options={FILTER_STATE_MAPPING.piercings}
          />
          <MultiSelect
            label="Wrists"
            selectedOptions={filterState.wrists}
            setSelectedOptions={values => handleFilterStateUpdate('wrists', values)}
            options={FILTER_STATE_MAPPING.wrists}
          />
          <MultiSelect
            label="Hands"
            selectedOptions={filterState.hands}
            setSelectedOptions={values => handleFilterStateUpdate('hands', values)}
            options={FILTER_STATE_MAPPING.hands}
          />
          <MultiSelect
            label="Neckwear"
            selectedOptions={filterState.neckwear}
            setSelectedOptions={values => handleFilterStateUpdate('neckwear', values)}
            options={FILTER_STATE_MAPPING.neckwear}
          />
          <MultiSelect
            label="Left Items"
            selectedOptions={filterState.leftItems}
            setSelectedOptions={values => handleFilterStateUpdate('leftItems', values)}
            options={FILTER_STATE_MAPPING.leftItems}
          />
          <MultiSelect
            label="Right Items"
            selectedOptions={filterState.rightItems}
            setSelectedOptions={values => handleFilterStateUpdate('rightItems', values)}
            options={FILTER_STATE_MAPPING.rightItems}
          />
        </AccordionDetails>
      </Accordion>
    </form>
  );
};

export default CharactersFilter;
