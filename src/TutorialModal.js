import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';
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

const TutorialModal = (props) => {
  return (
    <Dialog
      {...props}
      fullWidth
      maxWidth="md"
    >
      <CustomDialogTitle>
        How to play Fomo3D
      </CustomDialogTitle>

      <CustomDialogContent>
        <Typography variant="body1">
          Buy a key by choosing the amount of keys you want, choosing the team and then clicking on the <strong>SEND BNB</strong> button.
        </Typography>
        <Typography variant="body1">
          Congratulations, you are now holding the key to the pot! You will win the pot as long as nobody else buys another key.
        </Typography>
        <Typography variant="h5" color="secondary">
          Want to spread your joy and earn 10% affiliate fees?
        </Typography>
        <Typography variant="body1">
          Just register a name for <strong>0.01 BNB</strong> in the <strong>Vanity & Referrals</strong> tab.
        </Typography>
        <Typography variant="body1">
          Once your name is registered, a <strong>Vanity Referral</strong> link will be made for you. For example
          <a href="https://fomo3d.net/inventor" target="_blank" rel="noreferrer"> fomo3d.net/inventor</a>.
        </Typography>
        <Typography variant="body1">
          Whenever someone purchases keys through your link, <strong>10%</strong> of their purchase will go directly to you!
        </Typography>
        <Typography variant="body1">
          Btw, if you have a name registered and you are the most recent key buyer, then your name will show up at the top! For example, <strong>satoshi is EXIT SCAMMING</strong>.
        </Typography>
      </CustomDialogContent>
    </Dialog>
  );
};

export default TutorialModal;
