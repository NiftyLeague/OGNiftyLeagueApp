import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import MuiButton from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
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
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { claimCallback } = useClaimCallback();

  const onClose = () => setDialogOpen(false);

  const handleClaim = async () => {
    await claimCallback();
    setDialogOpen(false);
  };

  return (
    <Dialog aria-labelledby="airdrop-claim-dialog" fullScreen={fullScreen} onClose={onClose} open={dialogOpen}>
      <DialogTitle id="airdrop-claim-title">{availableNFTL} NFTL Claimable</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Claimable until September 15th, 2021. Learn more about <strong>NFTL</strong>{' '}
          <Link onClick={() => onClose()} to="/about/#nftl">
            here
          </Link>
          !
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <MuiButton onClick={handleClaim} color="primary" autoFocus>
          Claim
        </MuiButton>
      </DialogActions>
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
