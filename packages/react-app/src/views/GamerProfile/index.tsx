import React, { lazy } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import withVerification from 'components/Authentication';

const Comics = lazy(() => import('./Comics'));
const Dashboard = lazy(() => import('./Dashboard'));
const Wallet = lazy(() => import('./Wallet'));

const useStyles = makeStyles({
  container: {
    flexGrow: 1,
  },
  paper: {
    flexGrow: 1,
    backgroundColor: 'inherit',
    paddingTop: 10,
    color: 'inherit',
  },
  tabs: {
    '& .MuiTab-root': {
      fontSize: 18,
    },
    '& .Mui-selected': {
      color: '#1976d2',
    },
  },
  comicsPanel: {
    '& .MuiBox-root': {
      padding: 0,
    },
  },
});

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
        <Tabs className={classes.tabs} value={value} onChange={handleChange} centered textColor="inherit">
          {/* <Tab label="Dashboard" /> */}
          <Tab label="Wallet" />
          <Tab label="Comics" />
          {/* <Tab label="Rentals" disabled /> */}
        </Tabs>
      </Paper>
      {/* <TabPanel value={value} index={0}>
        <Dashboard />
        Dashboard
      </TabPanel> */}
      <TabPanel value={value} index={0}>
        <Wallet />
      </TabPanel>
      {/* @ts-expect-error ts-migrate(2345) FIXME: classes prop not expected */}
      <TabPanel value={value} index={1} className={classes.comicsPanel}>
        <Comics />
      </TabPanel>
      {/* <TabPanel value={value} index={3}>
        Rentals
      </TabPanel> */}
    </div>
  );
};

export default withVerification(GamerProfile);
