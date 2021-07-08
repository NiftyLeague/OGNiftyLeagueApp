import React, { useState } from "react";
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
} from "@material-ui/core";
import { Tooltip } from "antd";
import SearchIcon from "@material-ui/icons/Search";
import FilterListIcon from "@material-ui/icons/FilterList";
import { INITIAL_FILTER_STATE, MenuProps, FILTER_STATE_MAPPING } from "./constants";
import { useStyles, getMenuItemStyles } from "./styles";
import "./characters.css";

const MultiSelect = ({ label, selectedOptions, setSelectedOptions, options }) => {
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
      <InputLabel className={classes.label}>{label}</InputLabel>
      <Select
        classes={{ select: classes.select }}
        input={<Input />}
        MenuProps={MenuProps}
        multiple
        onChange={({ target: { value } }) => setSelectedOptions(value)}
        value={selectedOptions}
        renderValue={selected => (
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

const CustomSearchInput = ({ clearFilters, expandFilters, filterActive, search, setSearch }) => {
  const classes = useStyles();
  const stopClick = e => e.stopPropagation();
  return (
    <Paper className={classes.paper} onClick={stopClick}>
      <InputBase
        className={classes.input}
        placeholder="NFT Name or ID"
        inputProps={{ "aria-label": "NFT Name or ID" }}
        value={search}
        onChange={({ target: { value } }) => setSearch(value)}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <Tooltip title={filterActive ? "Clear filters" : "Filter results"} placement="bottomRight">
        <IconButton
          classes={{ root: classes.iconButton, colorPrimary: classes.iconPrimary }}
          aria-label="filter"
          color={filterActive ? "primary" : "default"}
          onClick={filterActive ? clearFilters : expandFilters}
        >
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Paper>
  );
};

const CharactersFilter = ({ filterActive, filterState, search, setFilterState, setSearch }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleFilterStateUpdate = (key, values) => {
    setFilterState(prevState => ({ ...prevState, [key]: values }));
  };

  const handleSubmit = e => e.preventDefault();

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
            label="Tribe"
            selectedOptions={filterState.tribes}
            setSelectedOptions={values => handleFilterStateUpdate("tribes", values)}
            options={FILTER_STATE_MAPPING.tribes}
          />
          <MultiSelect
            label="Skin Color"
            selectedOptions={filterState.skinColors}
            setSelectedOptions={values => handleFilterStateUpdate("skinColors", values)}
            options={FILTER_STATE_MAPPING.skinColors}
          />
          <MultiSelect
            label="Fur Color"
            selectedOptions={filterState.furColors}
            setSelectedOptions={values => handleFilterStateUpdate("furColors", values)}
            options={FILTER_STATE_MAPPING.furColors}
          />
          <MultiSelect
            label="Eye Color"
            selectedOptions={filterState.eyeColors}
            setSelectedOptions={values => handleFilterStateUpdate("eyeColors", values)}
            options={FILTER_STATE_MAPPING.eyeColors}
          />
          <MultiSelect
            label="Pupil Color"
            selectedOptions={filterState.pupilColors}
            setSelectedOptions={values => handleFilterStateUpdate("pupilColors", values)}
            options={FILTER_STATE_MAPPING.pupilColors}
          />
          <MultiSelect
            label="Hair"
            selectedOptions={filterState.hair}
            setSelectedOptions={values => handleFilterStateUpdate("hair", values)}
            options={FILTER_STATE_MAPPING.hair}
          />
          <MultiSelect
            label="Mouth"
            selectedOptions={filterState.mouths}
            setSelectedOptions={values => handleFilterStateUpdate("mouths", values)}
            options={FILTER_STATE_MAPPING.mouths}
          />
          <MultiSelect
            label="Beard"
            selectedOptions={filterState.beards}
            setSelectedOptions={values => handleFilterStateUpdate("beards", values)}
            options={FILTER_STATE_MAPPING.beards}
          />
          <MultiSelect
            label="Facemark"
            selectedOptions={filterState.facemarks}
            setSelectedOptions={values => handleFilterStateUpdate("facemarks", values)}
            options={FILTER_STATE_MAPPING.facemarks}
          />
          <MultiSelect
            label="Misc."
            selectedOptions={filterState.misc}
            setSelectedOptions={values => handleFilterStateUpdate("misc", values)}
            options={FILTER_STATE_MAPPING.misc}
          />
          <MultiSelect
            label="Top"
            selectedOptions={filterState.tops}
            setSelectedOptions={values => handleFilterStateUpdate("tops", values)}
            options={FILTER_STATE_MAPPING.tops}
          />
          <MultiSelect
            label="Outerwear"
            selectedOptions={filterState.outerwear}
            setSelectedOptions={values => handleFilterStateUpdate("outerwear", values)}
            options={FILTER_STATE_MAPPING.outerwear}
          />
          <MultiSelect
            label="Top Print"
            selectedOptions={filterState.prints}
            setSelectedOptions={values => handleFilterStateUpdate("prints", values)}
            options={FILTER_STATE_MAPPING.prints}
          />
          <MultiSelect
            label="Bottom"
            selectedOptions={filterState.bottoms}
            setSelectedOptions={values => handleFilterStateUpdate("bottoms", values)}
            options={FILTER_STATE_MAPPING.bottoms}
          />
          <MultiSelect
            label="Footwear"
            selectedOptions={filterState.footwear}
            setSelectedOptions={values => handleFilterStateUpdate("footwear", values)}
            options={FILTER_STATE_MAPPING.footwear}
          />
          <MultiSelect
            label="Belt"
            selectedOptions={filterState.belts}
            setSelectedOptions={values => handleFilterStateUpdate("belts", values)}
            options={FILTER_STATE_MAPPING.belts}
          />
          <MultiSelect
            label="Hat"
            selectedOptions={filterState.hats}
            setSelectedOptions={values => handleFilterStateUpdate("hats", values)}
            options={FILTER_STATE_MAPPING.hats}
          />
          <MultiSelect
            label="Eyewear"
            selectedOptions={filterState.eyewear}
            setSelectedOptions={values => handleFilterStateUpdate("eyewear", values)}
            options={FILTER_STATE_MAPPING.eyewear}
          />
          <MultiSelect
            label="Piercings"
            selectedOptions={filterState.piercings}
            setSelectedOptions={values => handleFilterStateUpdate("piercings", values)}
            options={FILTER_STATE_MAPPING.piercings}
          />
          <MultiSelect
            label="Wrists"
            selectedOptions={filterState.wrists}
            setSelectedOptions={values => handleFilterStateUpdate("wrists", values)}
            options={FILTER_STATE_MAPPING.wrists}
          />
          <MultiSelect
            label="Hands"
            selectedOptions={filterState.hands}
            setSelectedOptions={values => handleFilterStateUpdate("hands", values)}
            options={FILTER_STATE_MAPPING.hands}
          />
          <MultiSelect
            label="Neckwear"
            selectedOptions={filterState.neckwear}
            setSelectedOptions={values => handleFilterStateUpdate("neckwear", values)}
            options={FILTER_STATE_MAPPING.neckwear}
          />
          <MultiSelect
            label="Left Item"
            selectedOptions={filterState.leftItems}
            setSelectedOptions={values => handleFilterStateUpdate("leftItems", values)}
            options={FILTER_STATE_MAPPING.leftItems}
          />
          <MultiSelect
            label="Right Item"
            selectedOptions={filterState.rightItems}
            setSelectedOptions={values => handleFilterStateUpdate("rightItems", values)}
            options={FILTER_STATE_MAPPING.rightItems}
          />
        </AccordionDetails>
      </Accordion>
    </form>
  );
};

export default CharactersFilter;
