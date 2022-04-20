/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Accordion, AccordionDetails, AccordionSummary, InputLabel } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';
import { useThemeSwitcher } from 'react-css-theme-switcher';

const Section = ({
  label,
  children,
}: {
  label: string;
  children: JSX.Element | Array<JSX.Element | null | false>;
}): JSX.Element => {
  const { currentTheme } = useThemeSwitcher();

  return (
    <Accordion sx={{ margin: '0 !important', backgroundColor: currentTheme === 'dark' ? '#121212' : '#fff' }}>
      <AccordionSummary
        sx={{
          '&.Mui-expanded': {
            borderTop: '1px solid rgba(0, 0, 0, 0.12)',
            borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
          },
          '& .MuiAccordionSummary-content': {
            margin: '20px 0 !important',
          },
          color: `${currentTheme === 'dark' ? '#fff' : '#121212'}`,
        }}
        expandIcon={<ExpandMoreIcon sx={{ color: `${currentTheme === 'dark' ? '#fff' : '#121212'}` }} />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <InputLabel
          sx={{
            fontWeight: 'bold',
            fontSize: 16,
            marginBottom: '0 !important',
            color: `${currentTheme === 'dark' ? '#fff' : '#121212'}`,
          }}
        >
          {label}
        </InputLabel>
      </AccordionSummary>
      <AccordionDetails sx={{ backgroundColor: currentTheme === 'dark' ? '#fff' : '#121212' }}>
        {children}
      </AccordionDetails>
    </Accordion>
  );
};

export default Section;
