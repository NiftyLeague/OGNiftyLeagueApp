import React, { useCallback, useContext, useState } from 'react';
import { constants } from 'ethers';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import { NetworkContext } from 'NetworkProvider';
import { DEBUG, NFT_CONTRACT, NFTL_CONTRACT } from '../constants';

const RenameDialog = ({
  displayName,
  open,
  setOpen,
  tokenId,
}: {
  displayName: string;
  open: boolean;
  setOpen: (boolean) => void;
  tokenId: string;
}): JSX.Element => {
  const { address, tx, writeContracts } = useContext(NetworkContext);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const handleClose = useCallback(() => setOpen(false), [setOpen]);

  const validateName = (value: string) => {
    setInput(value);
    const regex = new RegExp('^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$');
    const doubleSpaceRegex = new RegExp('^(?!.*[ ]{2})');
    let hasError = true;
    if (!value.length) {
      setHelperText('Please input a name.');
    } else if (value.length > 32) {
      setHelperText('Max character length of 32.');
    } else if (!regex.test(value)) {
      setHelperText('Invalid character. Please only use numbers, letters, or spaces.');
    } else if (value.charAt(0) === ' ' || value.charAt(value.length - 1) === ' ') {
      setHelperText('No leading or trailing spaces.');
    } else if (!doubleSpaceRegex.test(value)) {
      setHelperText('No double spaces allowed.');
    } else {
      hasError = false;
      setHelperText('');
    }
    setError(hasError);
    return hasError;
  };

  const handleRename = useCallback(async () => {
    const hasError = validateName(input);
    if (!hasError && writeContracts) {
      handleClose();
      if (DEBUG) console.log('Rename NFT to:', input);
      const NFTAddress = writeContracts[NFT_CONTRACT].address;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,  @typescript-eslint/no-unsafe-call
      const allowance = await writeContracts[NFTL_CONTRACT].allowance(address, NFTAddress);
      if (allowance < 1000) {
        if (DEBUG) console.log('Allowance:', allowance);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const result = await tx(writeContracts[NFTL_CONTRACT].approve(NFTAddress, constants.MaxUint256));
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      await tx(writeContracts[NFT_CONTRACT].changeName(parseInt(tokenId, 10), input));
    }
  }, [address, handleClose, input, tokenId, tx, writeContracts]);

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="rename-form-dialog">
      <DialogTitle>
        Rename {displayName} #{tokenId}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Renaming costs <strong>1000 NFTL</strong>. Each name must be unique (case insensitive) with a max character
          length of 32 and may only include numbers, letters, or spaces.
        </DialogContentText>
        <TextField
          autoFocus
          error={error}
          helperText={helperText}
          fullWidth
          label="New Name"
          margin="dense"
          onChange={({ target: { value } }) => validateName(value)}
          value={input}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleRename} color="primary" disabled={error}>
          Rename
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RenameDialog;
