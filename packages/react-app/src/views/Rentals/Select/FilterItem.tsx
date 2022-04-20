/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { ListItemIcon, Checkbox, ListItem, ListItemButton, ListItemText } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useThemeSwitcher } from 'react-css-theme-switcher';

const useStyles = makeStyles(() => ({
  listItemIcon: {
    minWidth: 'unset',
  },
}));

interface FilterItemProps {
  id: string;
  value: string;
  checked: boolean;
  onToggle: (key: string) => void;
}

const FilterItem = ({ id, value, checked, onToggle }: FilterItemProps): JSX.Element => {
  const classes: any = useStyles();
  const labelId = `checkbox-list-label-${id}`;
  const { currentTheme } = useThemeSwitcher();

  return (
    <ListItem sx={{ color: currentTheme === 'dark' ? '#121212' : '#fff' }} key={id} disablePadding>
      <ListItemButton role={undefined} onClick={() => onToggle(id)} dense>
        <ListItemIcon className={classes.listItemIcon}>
          <Checkbox
            sx={{ color: currentTheme === 'dark' ? '#121212' : '#fff' }}
            edge="start"
            checked={checked}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': labelId }}
          />
        </ListItemIcon>
        <ListItemText sx={{ color: currentTheme === 'dark' ? '#121212' : '#fff' }} id={labelId} primary={value} />
      </ListItemButton>
    </ListItem>
  );
};

export default React.memo(FilterItem);
