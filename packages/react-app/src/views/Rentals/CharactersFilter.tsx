/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Divider, IconButton, InputBase, Paper } from '@mui/material';

import { INITIAL_FILTER_STATE, FILTER_STATE_MAPPING, FILTER_LABEL_MAPPING } from './constants';
import { SelectSearchable, SelectTwoColumns } from './Select';
import { RangeContinuous, RangeDiscrete } from './Range';
import Section from './Section';
import Tooltip from 'components/Tooltip';

import './characters.css';

type FilterState = typeof INITIAL_FILTER_STATE;

interface CharactersFilterProps {
  filterActive: boolean;
  filterState: FilterState;
  search: string;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  setSearch: (search: string) => void;
}

const CharactersFilter = ({ filterState, setFilterState }: CharactersFilterProps): JSX.Element => {
  const [expanded, setExpanded] = useState(false);

  const handleFilterOptionsUpdate = (key: string, values: string[]) => {
    setFilterState((prevState: FilterState) => ({ ...prevState, [key]: values }));
  };

  const handleFilterRangeUpdate = (key: string, values: { low: number; high: number }) => {
    setFilterState((prevState: FilterState) => ({ ...prevState, [key]: values }));
  };

  const handleSubmit = (e: React.SyntheticEvent) => e.preventDefault();

  return (
    <form className="rentals-search-wrapper" noValidate autoComplete="off" onSubmit={handleSubmit}>
      <SelectTwoColumns
        label="Tribes"
        selectedOptions={filterState.tribes}
        setSelectedOptions={values => handleFilterOptionsUpdate('tribes', values)}
        options={FILTER_STATE_MAPPING.tribes}
      />
      <Section label="Overview">
        <RangeContinuous
          label="Price"
          low={1}
          high={99}
          setRange={(low, high) => handleFilterRangeUpdate('price', { low, high })}
        />
        <RangeDiscrete
          label="Total Multipliers"
          min={1}
          max={99}
          low={filterState.totalMultiplier.low}
          high={filterState.totalMultiplier.high}
          setRange={(low, high) => handleFilterRangeUpdate('totalMultiplier', { low, high })}
        />
        <RangeDiscrete
          label="Total Rentals"
          min={1}
          max={200}
          low={filterState.numOfRentals.low}
          high={filterState.numOfRentals.high}
          setRange={(low, high) => handleFilterRangeUpdate('numOfRentals', { low, high })}
        />
      </Section>
      {Object.keys(FILTER_LABEL_MAPPING).map(key => (
        <SelectSearchable
          label={FILTER_LABEL_MAPPING[key]}
          selectedOptions={filterState[key]}
          setSelectedOptions={values => handleFilterOptionsUpdate(key, values)}
          options={FILTER_STATE_MAPPING[key]}
        />
      ))}
    </form>
  );
};

export default CharactersFilter;
