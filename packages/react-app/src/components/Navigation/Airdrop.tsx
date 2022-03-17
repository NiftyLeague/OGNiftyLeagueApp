import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import MuiButton from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { NetworkContext } from 'NetworkProvider';
import { useUserUnclaimedAmount, useClaimCallback } from 'hooks/Airdrop';

const ClaimButton = ({
  setAvailableNFTL,
  setDialogOpen,
}: {
  setAvailableNFTL: (string: any) => void;
  setDialogOpen: (string: any) => void;
}): JSX.Element | null => {
  const availableNFTL = useUserUnclaimedAmount();

  useEffect(() => {
    setAvailableNFTL(availableNFTL ?? '0');
  }, [availableNFTL, setAvailableNFTL]);

  return availableNFTL && parseFloat(availableNFTL) > 0 ? (
    <div style={{ display: 'flex', alignItems: 'center', marginRight: 16 }}>
      <Button
        style={{
          marginLeft: 8,
          color: '#fff',
          borderColor: '#6f6c6c',
          background: '-webkit-linear-gradient(89deg, #620edf 0%, #5e72eb 100%)',
        }}
        shape="round"
        size="large"
        onClick={() => setDialogOpen(true)}
      >
        claim airdrop
      </Button>
    </div>
  ) : null;
};

function ClaimDialog({
  availableNFTL,
  dialogOpen,
  setDialogOpen,
}: {
  availableNFTL: string;
  dialogOpen: boolean;
  setDialogOpen: (string: any) => void;
}): JSX.Element {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [checked, setChecked] = useState(false);
  const { claimCallback } = useClaimCallback();

  const onClose = () => setDialogOpen(false);

  const handleToggleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleClaim = async () => {
    await claimCallback();
    setDialogOpen(false);
  };

  return (
    <Dialog aria-labelledby="airdrop-claim-dialog" fullScreen={fullScreen} onClose={onClose} open={dialogOpen}>
      <DialogTitle id="airdrop-claim-title">{Math.round(parseFloat(availableNFTL))} NFTL Claimable</DialogTitle>
      <DialogContent>
        <DialogContentText>
          NOTE: The deadline to claim is <strong>April 12th</strong>. 🔥 Any leftover tokens will be burnt 🔥 Learn more
          about our governance/utility token{' '}
          <Link onClick={() => onClose()} to="/about/#nftl">
            here
          </Link>
          !
        </DialogContentText>
        <DialogContentText>
          <Checkbox
            checked={checked}
            color="primary"
            inputProps={{ 'aria-label': 'primary checkbox' }}
            onChange={handleToggleChecked}
          />
          Please accept our <Link to="/terms-of-service">Terms of Service</Link> before claiming.
        </DialogContentText>
        {fullScreen && (
          <MuiButton onClick={handleClaim} color="primary" autoFocus disabled={!checked} fullWidth variant="contained">
            Claim
          </MuiButton>
        )}
      </DialogContent>
      {!fullScreen && (
        <DialogActions>
          <MuiButton onClick={handleClaim} color="primary" autoFocus disabled={!checked}>
            Claim
          </MuiButton>
        </DialogActions>
      )}
    </Dialog>
  );
}

export default function Airdrop(): JSX.Element | null {
  const { selectedChainId, validAccount } = useContext(NetworkContext);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [availableNFTL, setAvailableNFTL] = useState('0');

  return validAccount && selectedChainId ? (
    <>
      <ClaimButton setDialogOpen={setDialogOpen} setAvailableNFTL={setAvailableNFTL} />
      <ClaimDialog availableNFTL={availableNFTL} dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
    </>
  ) : null;
}
