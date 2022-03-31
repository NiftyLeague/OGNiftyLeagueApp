/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Accordion, AccordionDetails, AccordionSummary, InputLabel } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(() => ({
  accordion: {
    margin: '0 !important',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.92) !important',
    marginBottom: '0 !important',
  },
  summary: {
    '&.Mui-expanded': {
      borderTop: '1px solid rgba(0, 0, 0, 0.12)',
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    '& .MuiAccordionSummary-content': {
      margin: '20px 0 !important',
    },
  },
}));

const Section = ({
  label,
  children,
}: {
  label: string;
  children: JSX.Element | Array<JSX.Element | null | false>;
}): JSX.Element => {
  const classes: any = useStyles();

  return (
    <Accordion className={classes.accordion}>
      <AccordionSummary
        className={classes.summary}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <InputLabel className={classes.label}>{label}</InputLabel>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default Section;
