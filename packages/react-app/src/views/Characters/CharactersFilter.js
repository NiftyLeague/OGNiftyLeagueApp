import React, { useState, useMemo } from "react";
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
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FilterListIcon from "@material-ui/icons/FilterList";
import { INITIAL_FILTER_STATE, TRIBES, NAMES, MenuProps } from "./constants";
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
        {options.map(name => (
          <MenuItem key={name} value={name} style={getMenuItemStyles(name, selectedOptions)}>
            {name}
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
    <Paper component="form" className={classes.paper} onClick={stopClick}>
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

const CharactersFilter = () => {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [filterState, setFilterState] = useState(INITIAL_FILTER_STATE);
  const filterActive = useMemo(() => Object.values(filterState).some(v => v.length), [filterState]);

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
            options={NAMES}
          />
          <MultiSelect
            label="2nd Skin Color"
            selectedOptions={filterState.secondarySkinColor}
            setSelectedOptions={values => handleFilterStateUpdate("secondarySkinColor", values)}
            options={NAMES}
          />
          <MultiSelect
            label="Eye Color"
            selectedOptions={filterState.eyeColor}
            setSelectedOptions={values => handleFilterStateUpdate("eyeColor", values)}
            options={NAMES}
          />
          <MultiSelect
            label="2nd Eye Color"
            selectedOptions={filterState.secondaryEyeColor}
            setSelectedOptions={values => handleFilterStateUpdate("secondaryEyeColor", values)}
            options={NAMES}
          />
          <MultiSelect
            label="Hair"
            selectedOptions={filterState.hair}
            setSelectedOptions={values => handleFilterStateUpdate("hair", values)}
            options={NAMES}
          />
          <MultiSelect
            label="Mouth"
            selectedOptions={filterState.mouth}
            setSelectedOptions={values => handleFilterStateUpdate("mouth", values)}
            options={NAMES}
          />
          <MultiSelect
            label="Beard"
            selectedOptions={filterState.beard}
            setSelectedOptions={values => handleFilterStateUpdate("beard", values)}
            options={NAMES}
          />
          <MultiSelect
            label="Facemarks"
            selectedOptions={filterState.facemarks}
            setSelectedOptions={values => handleFilterStateUpdate("facemarks", values)}
            options={NAMES}
          />
          <MultiSelect
            label="Misc"
            selectedOptions={filterState.misc}
            setSelectedOptions={values => handleFilterStateUpdate("misc", values)}
            options={NAMES}
          />
          <MultiSelect
            label="Top"
            selectedOptions={filterState.top}
            setSelectedOptions={values => handleFilterStateUpdate("top", values)}
            options={NAMES}
          />
          <MultiSelect
            label="Outerwear"
            selectedOptions={filterState.outerwear}
            setSelectedOptions={values => handleFilterStateUpdate("outerwear", values)}
            options={NAMES}
          />
          <MultiSelect
            label="Top Print"
            selectedOptions={filterState.topPrint}
            setSelectedOptions={values => handleFilterStateUpdate("topPrint", values)}
            options={NAMES}
          />
          <MultiSelect
            label="Bottom"
            selectedOptions={filterState.bottom}
            setSelectedOptions={values => handleFilterStateUpdate("bottom", values)}
            options={NAMES}
          />
          <MultiSelect
            label="Footwear"
            selectedOptions={filterState.footwear}
            setSelectedOptions={values => handleFilterStateUpdate("footwear", values)}
            options={NAMES}
          />
          <MultiSelect
            label="Belt"
            selectedOptions={filterState.belt}
            setSelectedOptions={values => handleFilterStateUpdate("belt", values)}
            options={NAMES}
          />
          <MultiSelect
            label="Hat"
            selectedOptions={filterState.hat}
            setSelectedOptions={values => handleFilterStateUpdate("hat", values)}
            options={NAMES}
          />
          <MultiSelect
            label="Eyewear"
            selectedOptions={filterState.eyewear}
            setSelectedOptions={values => handleFilterStateUpdate("eyewear", values)}
            options={NAMES}
          />
          <MultiSelect
            label="Piercings"
            selectedOptions={filterState.piercings}
            setSelectedOptions={values => handleFilterStateUpdate("piercings", values)}
            options={NAMES}
          />
          <MultiSelect
            label="Wrists"
            selectedOptions={filterState.wrists}
            setSelectedOptions={values => handleFilterStateUpdate("wrists", values)}
            options={NAMES}
          />
          <MultiSelect
            label="Hands"
            selectedOptions={filterState.hands}
            setSelectedOptions={values => handleFilterStateUpdate("hands", values)}
            options={NAMES}
          />
          <MultiSelect
            label="Neckwear"
            selectedOptions={filterState.neckwear}
            setSelectedOptions={values => handleFilterStateUpdate("neckwear", values)}
            options={NAMES}
          />
          <MultiSelect
            label="Left Item"
            selectedOptions={filterState.leftItem}
            setSelectedOptions={values => handleFilterStateUpdate("leftItem", values)}
            options={NAMES}
          />
          <MultiSelect
            label="Right Item"
            selectedOptions={filterState.rightItem}
            setSelectedOptions={values => handleFilterStateUpdate("rightItem", values)}
            options={NAMES}
          />
        </AccordionDetails>
      </Accordion>
    </form>
  );
};

export default CharactersFilter;
