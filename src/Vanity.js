import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import styled from '@emotion/styled';

// Define your styled components here
const CopyButton = styled(Button)`
  margin-top: 10px;
  margin-bottom: 20px;
`;

const VanityTab = (props) => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const { account, playerID, playerName, regNewName, isWeb3Enabled, toggleLong } = props;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Box>
      <Typography variant="body1">
        Advise others to invest in this exit scam and we'll reward you 10% of
        everything they lose. In BNB
      </Typography>

      <Typography variant="h6">Wallet Referral</Typography>
      <Typography variant="body1">fomo3d.net/{account}</Typography>
      <CopyButton variant="outlined" onClick={() => handleCopy('fomo3d.net/' + account)}>
        Copy
      </CopyButton>

      <Typography variant="h6">Anonymous Referral</Typography>
      <Typography variant="body1">fomo3d.net/{playerID == "0" ? null : playerID}</Typography>
      <CopyButton variant="outlined" onClick={() => handleCopy('fomo3d.net/' + playerID)}>
        Copy
      </CopyButton>

      <Typography variant="h6">Vanity Referral</Typography>
      <Typography variant="body1">fomo3d.net/{playerName}</Typography>
      <CopyButton variant="outlined" onClick={() => handleCopy('fomo3d.net/' + playerName)}>
        Copy
      </CopyButton>

      <Button variant="contained" onClick={() => setShowRegisterModal(true)}>
        Register a new name
      </Button>

      {/* Placeholder for the RegisterNameModal component */}
      {/*<RegisterNameModal
        show={showRegisterModal}
        onHide={() => setShowRegisterModal(false)}
        registerNewName={regNewName}
        setShowMod={setShowRegisterModal}
        isWeb3Enabled={isWeb3Enabled}
        toggleLong={toggleLong}
      />*/}
    </Box>
  );
};

export default VanityTab;
