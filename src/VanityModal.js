import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, TextField, Button } from '@mui/material';
import styled from '@emotion/styled';

// Define your styled components here
const CustomDialogTitle = styled(DialogTitle)`
  .MuiTypography-root {
    color: purple;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
`;

const CustomDialogContent = styled(DialogContent)`
  .MuiTypography-root {
    margin-bottom: 20px;
  }
`;

const RegisterNameModal = (props) => {
  const [regName, setRegName] = useState("");

  const { isWeb3Enabled, toggleLong } = props;

  const handleRegName = () => {
    props.setShowMod(false);
    props.registerNewName(regName);
  };

  const onNameChange = (evt) => {
    setRegName(evt.target.value);
  };

  return (
    <Dialog
      {...props}
      fullWidth
      maxWidth="md"
    >
      <CustomDialogTitle>
        Graffiti your name on the Blockchain
      </CustomDialogTitle>

      <CustomDialogContent>
        <TextField fullWidth onChange={onNameChange} placeholder="Kokichi Mikimoto" />
        <Typography variant="body1">
          Names must follow these rules:
        </Typography>
        <ul>
          <li>Must be unique</li>
          <li>32 Characters or less</li>
          <li>A-Z(upper and lowercase)</li>
          <li>No special characters</li>
          <li>No more than one space between characters</li>
        </ul>
        <Typography variant="body1">
          If the transaction fails, one of these criteria was not met properly.
        </Typography>
        <Typography variant="body1">
          Names are yours permanently(for vanity URLS). But only your most recent name will show up on the leaderboard/game UI. You can own as many names as you'd like.
        </Typography>
        <Button disabled={!isWeb3Enabled} variant="contained" color={toggleLong ? "primary" : "secondary"} onClick={handleRegName}>
          Purchase for 0.01 BNB
        </Button>
        <Typography variant="body1">
          The fee is distributed across community members who made this game possible.
        </Typography>
      </CustomDialogContent>
    </Dialog>
  );
};

export default RegisterNameModal;
