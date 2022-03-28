/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from 'react';

import { INITIAL_FILTER_STATE, FILTER_STATE_MAPPING, FILTER_LABEL_MAPPING } from './constants';
import { MultiSelectSearchable, MultiSelectTwoColumns, MultiSelectTwoSections } from './MultiSelect';
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

  const handleFilterStateUpdate = (key: string, values: string[]) => {
    setFilterState((prevState: FilterState) => ({ ...prevState, [key]: values }));
  };

  const handleSubmit = (e: React.SyntheticEvent) => e.preventDefault();

  return (
    <form className="rentals-search-wrapper" noValidate autoComplete="off" onSubmit={handleSubmit}>
      <MultiSelectTwoColumns
        label="Tribes"
        selectedOptions={filterState.tribes}
        setSelectedOptions={values => handleFilterStateUpdate('tribes', values)}
        options={FILTER_STATE_MAPPING.tribes}
      />
      <MultiSelectTwoSections
        label="Tribes"
        sections={[
          {
            label: 'Background',
            selectedOptions: filterState.backgrounds,
            setSelectedOptions: values => handleFilterStateUpdate('backgrounds', values),
            options: FILTER_STATE_MAPPING.backgrounds,
          },
          {
            label: 'Items',
            selectedOptions: filterState.items,
            setSelectedOptions: values => handleFilterStateUpdate('items', values),
            options: FILTER_STATE_MAPPING.items,
          },
        ]}
      />
      {Object.keys(FILTER_LABEL_MAPPING).map(key => (
        <MultiSelectSearchable
          label={FILTER_LABEL_MAPPING[key]}
          selectedOptions={filterState[key]}
          setSelectedOptions={values => handleFilterStateUpdate(key, values)}
          options={FILTER_STATE_MAPPING[key]}
        />
      ))}
    </form>
  );
};

export default CharactersFilter;
