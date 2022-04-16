import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Typography, Box } from '@mui/material';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { INITIAL_FILTER_STATE, FILTER_STATE_MAPPING, FILTER_LABEL_MAPPING } from '../../views/Rentals/constants';
import Section from '../../views/Rentals/Section';
import { RangeContinuous, RangeDiscrete } from '../../views/Rentals/Range';
import { SelectSearchable, SelectTwoColumns } from '../../views/Rentals/Select';
import zIndex from '@mui/material/styles/zIndex';
import { auto } from '@popperjs/core';

type FilterState = typeof INITIAL_FILTER_STATE;

const useStyles = makeStyles(() => ({
  sidebar: {
    height: 'calc( 100vh - 66px )',
    minHeight: 'calc( 100vh - 66px )',
    position: 'fixed',
    left: '360px',
    zIndex: 2,
    paddingTop: '20px',
  },
  toggle: {
    position: 'absolute',
    top: 5,
    width: 20,
    height: 20,
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: '100%',
    backgroundColor: '#313131',
    padding: 5,
  },
  title: {
    fontSize: '1.2rem',
    padding: '0.3rem',
    borderBottom: '1px #555 solid',
  },
}));

const RentalSearchSidebar = ({
  isOpen,
  toggleSidebar,
  filterState,
  setFilterState,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
}): JSX.Element => {
  const classes = useStyles();

  const handleFilterOptionsUpdate = (key: string, values: string[]) => {
    setFilterState((prevState: FilterState) => ({ ...prevState, [key]: values }));
  };

  const handleFilterRangeUpdate = (key: string, values: { low: number; high: number }) => {
    setFilterState((prevState: FilterState) => ({ ...prevState, [key]: values }));
  };

  return (
    <Box
      className={classes.sidebar}
      sx={{
        minWidth: isOpen ? '360px' : '0px',
        overflowY: isOpen ? 'auto' : 'none',
        width: isOpen ? '360px' : '0px',
        border: isOpen ? 'black 1px solid' : 'none',
        backgroundColor: isOpen ? '#121212' : 'none',
      }}
    >
      <Box
        sx={{
          display: isOpen ? 'block' : 'none',
        }}
      >
        <Typography className={classes.title}>Filter Rentals</Typography>
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
        {isOpen ? <ArrowBackIosNew className={classes.icon} /> : <ArrowForwardIos className={classes.icon} />}
      </Box>
    </Box>
  );
};
export default RentalSearchSidebar;
