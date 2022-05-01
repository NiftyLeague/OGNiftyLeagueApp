import React, { useCallback, useContext, useEffect, useState } from 'react';
import { BigNumber, BigNumberish, utils } from 'ethers';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { NetworkContext } from 'NetworkProvider';
import { submitTxWithGasEstimate } from 'helpers/Notifier';
import Tooltip from 'components/Tooltip';
import { getErrorForName } from 'utils/name';
import RenameStepper from './RenameStepper';
import { DEBUG, NFT_CONTRACT, NFTL_CONTRACT } from '../../constants';

const RenameDialog = ({
  displayName,
  open,
  setOpen,
  tokenId,
  userNFTLBalance,
  redirectToWallet,
}: {
  displayName: string;
  open: boolean;
  setOpen: (boolean) => void;
  tokenId: string;
  userNFTLBalance: number;
  redirectToWallet?: boolean;
}): JSX.Element => {
  const { address, tx, writeContracts } = useContext(NetworkContext);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [allowance, setAllowance] = useState<BigNumberish>(BigNumber.from('0'));
  const [renameSuccess, setRenameSuccess] = useState(false);
  const insufficientAllowance = allowance < 1000;
  const insufficientBalance = userNFTLBalance < 1000;

  useEffect(() => {
    const getAllowance = async () => {
      const degen = writeContracts[NFT_CONTRACT];
      const DEGENAddress = degen.address;
      const nftl = writeContracts[NFTL_CONTRACT];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const allowanceBN = (await nftl.allowance(address, DEGENAddress)) as BigNumberish;
      setAllowance(allowanceBN);
    };
    setRenameSuccess(false);
    if (open && writeContracts && writeContracts[NFTL_CONTRACT] && writeContracts[NFT_CONTRACT]) void getAllowance();
  }, [address, open, writeContracts]);

  const handleClose = useCallback(() => setOpen(false), [setOpen]);

  const validateName = (value: string) => {
    setInput(value);
    const errorMsg = getErrorForName(value);
    setError(errorMsg);
  };

  const handleRename = useCallback(async () => {
    if (!error && writeContracts && writeContracts[NFT_CONTRACT] && writeContracts[NFTL_CONTRACT]) {
      if (DEBUG) console.log('Rename NFT to:', input);
      const degen = writeContracts[NFT_CONTRACT];
      const nftl = writeContracts[NFTL_CONTRACT];
      if (insufficientAllowance) {
        if (DEBUG) console.log('Current allowance too low');
        const DEGENAddress = degen.address;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        await tx(nftl.increaseAllowance(DEGENAddress, utils.parseEther('100000')));
        setAllowance(BigNumber.from('1000'));
      }
      const args = [parseInt(tokenId, 10), input];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const result = await submitTxWithGasEstimate(tx, degen, 'changeName', args);
      if (result) {
        setRenameSuccess(true);
        setTimeout(handleClose, 2000);
      }
    }
  }, [error, handleClose, input, insufficientAllowance, tokenId, tx, writeContracts]);

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="rename-form-dialog">
      <DialogTitle>
        Rename {displayName} #{tokenId}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Renaming costs <strong>1000 NFTL</strong> which is immediately burned by the contract. Each name must be
          unique (case insensitive) with a max character length of 32 and may only include numbers, letters, or spaces.
        </DialogContentText>
        <TextField
          autoFocus
          disabled={insufficientBalance}
          error={!!error}
          helperText={error}
          fullWidth
          label="New Name"
          margin="dense"
          onChange={({ target: { value } }) => validateName(value)}
          value={input}
        />
        <RenameStepper
          insufficientAllowance={insufficientAllowance}
          redirectToWallet={redirectToWallet}
          renameSuccess={renameSuccess}
          insufficientBalance={insufficientBalance}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Tooltip
          text={
            // eslint-disable-next-line no-nested-ternary
            insufficientBalance
              ? 'Please claim or purchase 1000 NFTL'
              : insufficientAllowance
              ? 'Will need to wait for approval and rename transactions to complete'
              : 'Send rename transaction'
          }
        >
          <Button onClick={handleRename} color="primary" variant="contained" disabled={!!error || insufficientBalance}>
            Rename
          </Button>
        </Tooltip>
      </DialogActions>
    </Dialog>
  );
};

RenameDialog.defaultProps = { redirectToWallet: false };

export default RenameDialog;
