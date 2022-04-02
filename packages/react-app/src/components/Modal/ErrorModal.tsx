import React from 'react';
import { Alert } from 'antd';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  alertContainer: {
    zIndex: 2,
    position: 'absolute',
    right: 0,
    top: 60,
    padding: 16,
  },
}));

const ErrorModal = ({ content, onClose }: { content: string; onClose: () => void }): JSX.Element | null => {
  const classes = useStyles();
  if (!content) {
    return null;
  }

  return (
    <div className={classes.alertContainer}>
      <Alert closable message={content} showIcon type="error" afterClose={onClose} />
    </div>
  );
};

export default ErrorModal;
