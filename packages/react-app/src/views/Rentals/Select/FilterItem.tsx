/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { ListItemIcon, Checkbox, ListItem, ListItemButton, ListItemText } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

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
  return (
    <ListItem key={id} disablePadding>
      <ListItemButton role={undefined} onClick={() => onToggle(id)} dense>
        <ListItemIcon className={classes.listItemIcon}>
          <Checkbox
            edge="start"
            checked={checked}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': labelId }}
          />
        </ListItemIcon>
        <ListItemText id={labelId} primary={value} />
      </ListItemButton>
    </ListItem>
  );
};

export default React.memo(FilterItem);
