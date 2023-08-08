/** @jsxImportSource @emotion/react */
import React from 'react';
import { Dialog, DialogTitle, DialogContent, Button } from '@mui/material';
import styled from '@emotion/styled';

// Define your styled components here
const CustomDialogTitle = styled(DialogTitle)`
  .MuiTypography-root {
    color: purple;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
`;

const CustomDialogContent = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
`;

const ConnectModal = (props) => {
  const {connectWallet, authWalletConnect, setShowConnect} = props;

  const handleClickMM = () => {
    setShowConnect(false);
    connectWallet();
  }

  const handleClickWC = () => {
    setShowConnect(false);
    authWalletConnect();
  }

  return (
    <Dialog
      {...props}
      fullWidth
      maxWidth="md"
    >
      <CustomDialogTitle>
        Connect your wallet
      </CustomDialogTitle>

      <CustomDialogContent>
        <Button variant="contained" color="primary" onClick={handleClickMM}>
          MetaMask
        </Button>
        <Button variant="contained" color="primary" onClick={handleClickWC}>
          WalletConnect
        </Button>
      </CustomDialogContent>
    </Dialog>
  );
};

export default ConnectModal;
