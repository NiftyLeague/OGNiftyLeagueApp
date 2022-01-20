import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import withVerification from './authentication';
import Dashboard from './Dashboard';
import Wallet from './Wallet';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    flexGrow: 1,
  },
  paper: {
    flexGrow: 1,
    backgroundColor: 'inherit',
  },
}));

interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps): JSX.Element => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const GamerProfile = (): JSX.Element => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" centered>
          <Tab label="Dashboard" />
          <Tab label="Wallet" />
          <Tab label="Rentals" disabled />
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0}>
        {/* <Dashboard /> */}
        Dashboard
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Wallet />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Rentals
      </TabPanel>
    </div>
  );
};

export default withVerification(GamerProfile);
