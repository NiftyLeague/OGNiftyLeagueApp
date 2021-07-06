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
  Tooltip,
  Select,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import FilterListIcon from "@material-ui/icons/FilterList";
import {
  INITIAL_FILTER_STATE,
  MenuProps,
  TRIBES,
  SKIN_COLORS,
  FUR_COLORS,
  EYE_COLORS,
  PUPIL_COLORS,
  HAIR,
  MOUTH,
  BEARDS,
  FACEMARK,
  MISC,
  TOPS,
  OUTERWEAR,
  PRINTS,
  BOTTOMS,
  FOOTWEAR,
  BELTS,
  HATS,
  EYEWEAR,
  PIERCINGS,
  WRIST,
  HANDS,
  NECKWEAR,
  LEFT_ITEMS,
  RIGHT_ITEMS,
} from "./constants";
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
      <Tooltip classes={{ tooltip: classes.tooltip }} title={filterActive ? "Clear filters" : "Filter results"}>
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

  const handleSubmit = e => {
    e.preventDefault();
    console.log("handleSubmit", search);
  };

  const handleClearFilters = () => {
    setExpanded(false);
    setFilterState(INITIAL_FILTER_STATE);
  };

  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <form className="games-search-wrapper" noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Accordion className={classes.accRoot} expanded={expanded} onChange={toggleExpanded}>
        <AccordionSummary aria-controls="panel1a-content">
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
            options={TRIBES}
          />
          <MultiSelect
            label="Skin Color"
            selectedOptions={filterState.skinColor}
            setSelectedOptions={values => handleFilterStateUpdate("skinColor", values)}
            options={SKIN_COLORS}
          />
          <MultiSelect
            label="Fur Color"
            selectedOptions={filterState.furColor}
            setSelectedOptions={values => handleFilterStateUpdate("furColor", values)}
            options={FUR_COLORS}
          />
          <MultiSelect
            label="Eye Color"
            selectedOptions={filterState.eyeColor}
            setSelectedOptions={values => handleFilterStateUpdate("eyeColor", values)}
            options={EYE_COLORS}
          />
          <MultiSelect
            label="Pupil Color"
            selectedOptions={filterState.pupilColor}
            setSelectedOptions={values => handleFilterStateUpdate("pupilColor", values)}
            options={PUPIL_COLORS}
          />
          <MultiSelect
            label="Hair"
            selectedOptions={filterState.hair}
            setSelectedOptions={values => handleFilterStateUpdate("hair", values)}
            options={HAIR}
          />
          <MultiSelect
            label="Mouth"
            selectedOptions={filterState.mouth}
            setSelectedOptions={values => handleFilterStateUpdate("mouth", values)}
            options={MOUTH}
          />
          <MultiSelect
            label="Beard"
            selectedOptions={filterState.beard}
            setSelectedOptions={values => handleFilterStateUpdate("beard", values)}
            options={BEARDS}
          />
          <MultiSelect
            label="Facemark"
            selectedOptions={filterState.facemark}
            setSelectedOptions={values => handleFilterStateUpdate("facemark", values)}
            options={FACEMARK}
          />
          <MultiSelect
            label="Misc."
            selectedOptions={filterState.misc}
            setSelectedOptions={values => handleFilterStateUpdate("misc", values)}
            options={MISC}
          />
          <MultiSelect
            label="Top"
            selectedOptions={filterState.top}
            setSelectedOptions={values => handleFilterStateUpdate("top", values)}
            options={TOPS}
          />
          <MultiSelect
            label="Outerwear"
            selectedOptions={filterState.outerwear}
            setSelectedOptions={values => handleFilterStateUpdate("outerwear", values)}
            options={OUTERWEAR}
          />
          <MultiSelect
            label="Top Print"
            selectedOptions={filterState.print}
            setSelectedOptions={values => handleFilterStateUpdate("print", values)}
            options={PRINTS}
          />
          <MultiSelect
            label="Bottom"
            selectedOptions={filterState.bottom}
            setSelectedOptions={values => handleFilterStateUpdate("bottom", values)}
            options={BOTTOMS}
          />
          <MultiSelect
            label="Footwear"
            selectedOptions={filterState.footwear}
            setSelectedOptions={values => handleFilterStateUpdate("footwear", values)}
            options={FOOTWEAR}
          />
          <MultiSelect
            label="Belt"
            selectedOptions={filterState.belt}
            setSelectedOptions={values => handleFilterStateUpdate("belt", values)}
            options={BELTS}
          />
          <MultiSelect
            label="Hat"
            selectedOptions={filterState.hat}
            setSelectedOptions={values => handleFilterStateUpdate("hat", values)}
            options={HATS}
          />
          <MultiSelect
            label="Eyewear"
            selectedOptions={filterState.eyewear}
            setSelectedOptions={values => handleFilterStateUpdate("eyewear", values)}
            options={EYEWEAR}
          />
          <MultiSelect
            label="Piercings"
            selectedOptions={filterState.piercings}
            setSelectedOptions={values => handleFilterStateUpdate("piercings", values)}
            options={PIERCINGS}
          />
          <MultiSelect
            label="Wrists"
            selectedOptions={filterState.wrists}
            setSelectedOptions={values => handleFilterStateUpdate("wrists", values)}
            options={WRIST}
          />
          <MultiSelect
            label="Hands"
            selectedOptions={filterState.hands}
            setSelectedOptions={values => handleFilterStateUpdate("hands", values)}
            options={HANDS}
          />
          <MultiSelect
            label="Neckwear"
            selectedOptions={filterState.neckwear}
            setSelectedOptions={values => handleFilterStateUpdate("neckwear", values)}
            options={NECKWEAR}
          />
          <MultiSelect
            label="Left Item"
            selectedOptions={filterState.leftItem}
            setSelectedOptions={values => handleFilterStateUpdate("leftItem", values)}
            options={LEFT_ITEMS}
          />
          <MultiSelect
            label="Right Item"
            selectedOptions={filterState.rightItem}
            setSelectedOptions={values => handleFilterStateUpdate("rightItem", values)}
            options={RIGHT_ITEMS}
          />
        </AccordionDetails>
      </Accordion>
    </form>
  );
};

export default CharactersFilter;
