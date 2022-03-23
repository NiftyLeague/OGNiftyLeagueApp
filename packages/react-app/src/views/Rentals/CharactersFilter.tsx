/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from 'react';

import { INITIAL_FILTER_STATE, FILTER_STATE_MAPPING } from './constants';
import MultiSelect from './MultiSelect';
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
      <MultiSelect
        label="Tribes"
        selectedOptions={filterState.tribes}
        setSelectedOptions={values => handleFilterStateUpdate('tribes', values)}
        options={FILTER_STATE_MAPPING.tribes}
        searchable={false}
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
    </form>
  );
};

export default CharactersFilter;
