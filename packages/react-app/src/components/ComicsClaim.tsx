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
import { ClaimResult, useUserUnclaimedAmount, useClaimCallback } from 'hooks/ComicsClaim';

const ClaimButton = ({
  setAvailableComics,
  setDialogOpen,
}: {
  setAvailableComics: React.Dispatch<React.SetStateAction<ClaimResult>>;
  setDialogOpen: (string: any) => void;
}): JSX.Element | null => {
  const availableComics = useUserUnclaimedAmount();
  console.log('availableComics', availableComics);

  useEffect(() => {
    const result = { p5: availableComics.p5 || 0, p6: availableComics.p6 || 0 };
    setAvailableComics(result);
  }, [availableComics.p5, availableComics.p6, setAvailableComics]);

  if (!availableComics) return null;

  return (availableComics.p5 && availableComics.p5 > 0) || (availableComics.p6 && availableComics.p6 > 0) ? (
    <div style={{ display: 'flex', alignItems: 'center', margin: 'auto' }}>
      <Button
        style={{
          color: '#fff',
          borderColor: '#6f6c6c',
          background: '-webkit-linear-gradient(89deg, #620edf 0%, #5e72eb 100%)',
        }}
        shape="round"
        size="large"
        onClick={() => setDialogOpen(true)}
      >
        claim comics airdrop
      </Button>
    </div>
  ) : null;
};

function ClaimDialog({
  availableComics,
  dialogOpen,
  setDialogOpen,
}: {
  availableComics: ClaimResult;
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
      <DialogTitle id="airdrop-claim-title" className="text-center">
        {availableComics.p5} Page 5s &amp; {availableComics.p6} Page 6s Claimable
      </DialogTitle>
      <DialogContent className="pt-3 pb-0">
        <DialogContentText className="pb-3 text-center">
          NOTE: The deadline to claim is <strong>May 15th</strong>. <br />
          🔥 Any leftover comics will be burnt! 🔥
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

export default function ComicsClaim(): JSX.Element | null {
  const { selectedChainId, validAccount } = useContext(NetworkContext);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [availableComics, setAvailableComics] = useState({ p5: 0, p6: 0 });

  return validAccount && selectedChainId ? (
    <>
      <ClaimButton setDialogOpen={setDialogOpen} setAvailableComics={setAvailableComics} />
      <ClaimDialog availableComics={availableComics} dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
    </>
  ) : null;
}
