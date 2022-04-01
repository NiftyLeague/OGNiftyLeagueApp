import React from 'react';
import { Modal, Typography, Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles({
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'white',
    border: '2px solid #000',
    padding: 16,
    color: 'black',
  },
  title: {
    width: '100%',
    borderBottom: '1px solid #333',
    textAlign: 'center',
  },
  paper: {
    padding: '1rem',
  },
});

type closeFunction = () => void;

const ErrorModal = ({
  header,
  content,
  handleClose,
}: {
  header: string;
  content: string;
  handleClose: closeFunction;
}): JSX.Element => {
  const classes = useStyles();
  return (
    <Modal
      open={!!content}
      onClose={handleClose}
      aria-labelledby="error-modal-title"
      aria-describedby="error-modal-description"
    >
      <Box className={classes.modal}>
        <Typography className={classes.title}>{header}</Typography>
        <Typography className={classes.paper}>{content}</Typography>
      </Box>
    </Modal>
  );
};

export default ErrorModal;
