import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Button, Typography, Box } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';

import { INITIAL_FILTER_STATE, FILTER_STATE_MAPPING, FILTER_LABEL_MAPPING } from '../../views/Rentals/constants';
import Section from '../../views/Rentals/Section';
import { RangeContinuous, RangeDiscrete } from '../../views/Rentals/Range';
import { SelectSearchable, SelectTwoColumns } from '../../views/Rentals/Select';
import { useThemeSwitcher } from 'react-css-theme-switcher';

type FilterState = typeof INITIAL_FILTER_STATE;

const useStyles = makeStyles(() => ({
  sidebar: {
    height: 'calc( 100vh - 66px )',
    minHeight: 'calc( 100vh - 66px )',
    position: 'sticky',
    top: '64px',
    zIndex: 2,
    paddingTop: '20px',
  },
  toggle: {
    position: 'absolute',
    top: 29,
    width: 20,
    height: 20,
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: '100%',
    padding: 5,
    cursor: 'pointer',
  },
  title: {
    fontSize: '1.2rem',
    padding: '0.3rem',
    borderBottom: '1px #555 solid',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  resetButton: {
    verticalAlign: 'top',
    borderColor: '#6f6c6c',
    padding: '0 16px',
    borderRadius: '25px',
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
  const { currentTheme } = useThemeSwitcher();
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
        backgroundColor: isOpen && currentTheme === 'dark' ? '#fff' : '#121212',
      }}
    >
      <Box
        sx={{
          display: isOpen ? 'block' : 'none',
        }}
      >
        <Box className={classes.title}>
          <Typography sx={{ color: currentTheme === 'dark' ? '#121212' : '#fff' }}>Filter Rentals</Typography>
          <Button
            size="large"
            onClick={initFilter}
            sx={{
              color: `${currentTheme === 'dark' ? '#5e72eb' : '#fff'}`,
              background: `${currentTheme === 'light' && '-webkit-linear-gradient(89deg, #620edf 0%, #5e72eb 100%)'}`,
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
            sx={{
              color: isOpen
                ? currentTheme === 'dark'
                  ? '#fff'
                  : '#313131'
                : currentTheme === 'dark'
                ? '#313131'
                : '#fff',
              backgroundColor: isOpen
                ? currentTheme === 'dark'
                  ? '#313131'
                  : '#fff'
                : currentTheme === 'dark'
                ? '#fff'
                : '#313131',
            }}
            className={classes.icon}
          />
        ) : (
          <ArrowForwardIos
            sx={{
              color: isOpen
                ? currentTheme === 'dark'
                  ? '#fff'
                  : '#313131'
                : currentTheme === 'dark'
                ? '#313131'
                : '#fff',
              backgroundColor: isOpen
                ? currentTheme === 'dark'
                  ? '#313131'
                  : '#fff'
                : currentTheme === 'dark'
                ? '#fff'
                : '#313131',
            }}
            className={classes.icon}
          />
        )}
      </Box>
    </Box>
  );
};
export default RentalSearchSidebar;
