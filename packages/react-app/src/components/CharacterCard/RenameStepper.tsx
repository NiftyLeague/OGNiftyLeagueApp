import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import clsx from 'clsx';

import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import withStyles from '@mui/styles/withStyles';
import { StepIconProps } from '@mui/material/StepIcon';
import Step from '@mui/material/Step';
import StepConnector from '@mui/material/StepConnector';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';

import DoneAll from '@mui/icons-material/DoneAll';
import HowToReg from '@mui/icons-material/HowToReg';
import VerifiedUser from '@mui/icons-material/VerifiedUser';
import NFTL from 'assets/images/nl_logo_white.png';

const icons: { [index: string]: React.ReactElement } = {
  1: <img src={NFTL} alt="NFTL" width={30} />,
  2: <VerifiedUser />,
  3: <HowToReg />,
  4: <DoneAll />,
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage: 'linear-gradient(89deg, #620edf 0%, #5e72eb 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage: 'linear-gradient(89deg, #620edf 0%, #5e72eb 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage: 'linear-gradient(89deg, #620edf 0%, #5e72eb 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage: 'linear-gradient(89deg, #620edf 0%, #5e72eb 100%)',
  },
});

function ColorlibStepIcon({ active, completed, icon }: StepIconProps) {
  const classes = useColorlibStepIconStyles();
  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(icon)]}
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    stepper: {
      backgroundColor: 'transparent',
    },
    labelDark: {
      color: 'white !important',
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }),
);

function getSteps() {
  return ['Claim/purchase 1000 NFTL', 'Approve contract as NFTL spender', 'Submit rename request', 'DEGEN Renamed!'];
}

function getStepContent(step: number, redirectToWallet: boolean) {
  switch (step) {
    case 0: {
      return redirectToWallet ? (
        <span>
          Please go to your <Link to="/wallet">wallet</Link> and claim at least 1000 NFTL or purchase some on Uniswap
          using the contract address listed in <Link to="/contracts">contracts</Link>
        </span>
      ) : (
        <span>
          Please go back and claim at least 1000 NFTL or purchase some on Uniswap using the contract address listed in{' '}
          <Link to="/contracts">contracts</Link>
        </span>
      );
    }
    case 1:
      return 'Note: renaming requires two transactions since the Nifty Degen contract is not already an approved spender.';
    case 2:
      return 'Spender approved, submit rename request';
    default:
      return '';
  }
}

export default function RenameStepper({
  insufficientAllowance,
  redirectToWallet,
  renameSuccess,
  insufficientBalance,
}: {
  insufficientAllowance: boolean;
  redirectToWallet?: boolean;
  renameSuccess: boolean;
  insufficientBalance: boolean;
}): JSX.Element {
  const classes = useStyles();
  const { currentTheme } = useThemeSwitcher();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  useEffect(() => {
    if (renameSuccess) setActiveStep(3);
    else if (insufficientBalance) setActiveStep(0);
    else setActiveStep(insufficientAllowance ? 1 : 2);
  }, [insufficientAllowance, insufficientBalance, renameSuccess]);

  return (
    <div className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        classes={{ root: classes.stepper }}
        connector={<ColorlibConnector />}
      >
        {steps.map(label => (
          <Step key={label}>
            <StepLabel
              classes={{ label: currentTheme === 'dark' ? classes.labelDark : undefined }}
              StepIconComponent={ColorlibStepIcon}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep !== steps.length ? (
          <Typography className={classes.instructions}>
            {getStepContent(activeStep, redirectToWallet ?? false)}
          </Typography>
        ) : null}
      </div>
    </div>
  );
}

RenameStepper.defaultProps = { redirectToWallet: false };
