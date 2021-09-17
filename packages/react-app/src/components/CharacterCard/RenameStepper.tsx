import React, { useEffect, useState } from 'react';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import clsx from 'clsx';

import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import { StepIconProps } from '@material-ui/core/StepIcon';
import Button from '@material-ui/core/Button';
import Step from '@material-ui/core/Step';
import StepConnector from '@material-ui/core/StepConnector';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import Typography from '@material-ui/core/Typography';

import DoneAll from '@material-ui/icons/DoneAll';
import HowToReg from '@material-ui/icons/HowToReg';
import VerifiedUser from '@material-ui/icons/VerifiedUser';

const icons: { [index: string]: React.ReactElement } = {
  1: <VerifiedUser />,
  2: <HowToReg />,
  3: <DoneAll />,
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
  return ['Approve contract as NFTL spender', 'Submit rename request', 'DEGEN Renamed!'];
}

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return 'Note: renaming requires two transactions if the Nifty Degen contract is not already an approved spender.';
    case 1:
      return 'Spender approved, submit rename request';
    default:
      return '';
  }
}

export default function RenameStepper({
  insufficientAllowance,
  renameSuccess,
}: {
  insufficientAllowance: boolean;
  renameSuccess: boolean;
}): JSX.Element {
  const classes = useStyles();
  const { currentTheme } = useThemeSwitcher();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  useEffect(() => {
    if (renameSuccess) setActiveStep(2);
    else setActiveStep(insufficientAllowance ? 0 : 1);
  }, [insufficientAllowance, renameSuccess]);

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
          <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
        ) : null}
      </div>
    </div>
  );
}
