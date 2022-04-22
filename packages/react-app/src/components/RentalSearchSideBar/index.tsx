import React, { useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Button, Typography, Box } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';

import { useThemeSwitcher } from 'react-css-theme-switcher';
import { INITIAL_FILTER_STATE, FILTER_STATE_MAPPING, FILTER_LABEL_MAPPING } from '../../views/Rentals/constants';
import Section from '../../views/Rentals/Section';
import { RangeContinuous, RangeDiscrete } from '../../views/Rentals/Range';
import { SelectSearchable, SelectTwoColumns } from '../../views/Rentals/Select';

type FilterState = typeof INITIAL_FILTER_STATE;

const useStyles = makeStyles(() => ({
  sidebar: {
    height: 'calc( 100vh - 66px )',
    minHeight: 'calc( 100vh - 66px )',
    position: 'sticky',
    top: '64px',
    zIndex: 2,
    backgroundColor: '#fff',
    color: '#000',
  },
  toggle: {
    position: 'absolute',
    top: 13,
    width: 20,
    height: 20,
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: '100%',
    padding: 5,
    cursor: 'pointer',
    color: '#fff',
    backgroundColor: '#313131',
  },
  title: {
    padding: '10px 36px 10px 10px',
    borderBottom: '1px #555 solid',
    display: 'flex',
    justifyContent: 'space-around',
  },
  titleText: {
    fontSize: '1.4rem',
    fontWeight: '600',
  },
  resetButton: {
    verticalAlign: 'top',
    borderColor: '#6f6c6c',
    padding: '0 16px',
    borderRadius: '25px',
    color: '#fff',
    background: '-webkit-linear-gradient(89deg, #620edf 0%, #5e72eb 100%)',
  },
}));

export const RentalSearchSidebar = ({
  isOpen,
  toggleSidebar,
  filterState,
  setFilterState,
  initFilter,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  initFilter: () => void;
}): JSX.Element => {
  const classes = useStyles();

  const handleFilterOptionsUpdate = (key: string, values: string[]) => {
    setFilterState((prevState: FilterState) => ({ ...prevState, [key]: values }));
  };

  const handleFilterRangeUpdate = (key: string, values: { low: number; high: number }) => {
    setFilterState((prevState: FilterState) => ({ ...prevState, [key]: values }));
  };
  const [init, setInit] = useState(false);
  return (
    <Box
      className={classes.sidebar}
      sx={{
        minWidth: isOpen ? '360px' : '0px',
        overflowY: isOpen ? 'auto' : 'none',
        width: isOpen ? '360px' : '0px',
        border: isOpen ? 'black 1px solid' : 'none',
      }}
    >
      <Box
        sx={{
          display: isOpen ? 'block' : 'none',
        }}
      >
        <Box className={classes.title}>
          <Typography className={classes.titleText}>Filter Rentals</Typography>
          <Button
            size="large"
            onClick={() => {
              initFilter();
              setInit(!init);
            }}
            className={classes.resetButton}
            variant="outlined"
          >
            Reset
          </Button>
        </Box>
        <Section label="Overview">
          <RangeContinuous
            label="Price"
            low={filterState.price.low}
            high={filterState.price.high}
            setRange={(low, high) => handleFilterRangeUpdate('price', { low, high })}
            init={init}
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
        <SelectTwoColumns
          label="Tribes"
          selectedOptions={filterState.tribes}
          setSelectedOptions={values => handleFilterOptionsUpdate('tribes', values)}
          options={FILTER_STATE_MAPPING.tribes}
        />
        {Object.keys(FILTER_LABEL_MAPPING).map(key => (
          <SelectSearchable
            label={FILTER_LABEL_MAPPING[key]}
            selectedOptions={filterState[key]}
            setSelectedOptions={values => handleFilterOptionsUpdate(key, values)}
            options={FILTER_STATE_MAPPING[key]}
          />
        ))}
      </Box>

      <Box
        onClick={toggleSidebar}
        className={classes.toggle}
        sx={{
          right: isOpen ? 15 : -30,
        }}
      >
        {isOpen ? (
          <ArrowBackIosNew
            className={classes.icon}
          />
        ) : (
          <ArrowForwardIos
            className={classes.icon}
          />
        )}
      </Box>
    </Box>
  );
};
export default RentalSearchSidebar;
