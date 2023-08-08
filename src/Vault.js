import React, {useState, useEffect} from 'react';
import { Box, Button, Typography } from '@mui/material';
import styled from '@emotion/styled';
import Web3 from 'web3';


// Create contract instance


// Define your styled components here
const VaultInfoText = styled(Box)`
  margin-bottom: 20px;
`;

const VaultTab = (props) => {
  const {
    affiliateVault,
    vault,
    connectedAddress,
    web3,
    withdraw,
    totalGains,
    isWeb3Enabled,
    bnbPrice,
    keys,
    currentPot,
    totalKeys,
    toggleLong,
    contract,
    contract2
  } = props;

//   const newKeys = Number(web3.utils.fromWei(keys.toString()));
//   const newEstimatedExit = 0.25 * currentPot * (newKeys / totalKeys);
const [totalKeysBought, setTotalKeys] = useState(null);
const [atExit, setExitShare] = useState(null);
const [exitScammed, setExitScamTotal] = useState(null);
const [badAdvice, setBadAdvice] = useState(null);
const [totalGain, setTotalGains] = useState(null);

useEffect(() => {
  const getTotals = async () => {
    try {
      // const totalKeys = await contract2.methods.getTotalPlayerKeys({from: window.ethereum.selectedAddress}.from).call()
      // const totalKeysFixed = parseInt(totalKeys);
      // const atExitTotal = await contract.methods.endSidePot().call();
      // const atExitPot = parseInt(atExitTotal);
      // const atExitTotalFixed = parseInt(atExitPot) / totalKeysFixed;
      // const exitScammedTotal = await contract.methods.getPlayer("0x9D370D719E65019315987d8E2544E5982C13e797").call();
      // const badAdviceTotal = await contract.methods.getPlayer("0x9D370D719E65019315987d8E2544E5982C13e797").call();
      // const totalGainz = await contract.methods.getPlayer("0x9D370D719E65019315987d8E2544E5982C13e797").call();

      // setTotalKeys(totalKeysFixed); // Convert from Wei to Ether
      // setTotalKeys(atExitTotalFixed); // Convert from Wei to Ether
      // setTotalKeys(exitScammedTotal); // Convert from Wei to Ether
      // setTotalKeys(badAdviceTotal); // Convert from Wei to Ether
      // setTotalKeys(totalGainz); // Convert from Wei to Ether

      console.log();
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  getTotals();
}, []);

  return (
    <Box>
      <Typography variant="h4">Vault</Typography>
      <VaultInfoText>
        <Typography variant="h5">Total Keys: </Typography>
        <Typography variant="h5"></Typography>

      </VaultInfoText>

      <VaultInfoText>
        <Typography variant="h5">At Exit(estimated)</Typography>
        <Typography variant="h5"></Typography>

      </VaultInfoText>

      <VaultInfoText>
        <Typography variant="h5">Exit Scammed</Typography>
      </VaultInfoText>

      <VaultInfoText>
        <Typography variant="h5">Bad Advice </Typography>
      </VaultInfoText>

      <VaultInfoText>
        <Typography variant="h5">Total Gains</Typography>
        <Button>Withdraw Earnings</Button>
      </VaultInfoText>

      <Button variant="contained" disabled={!isWeb3Enabled} onClick={withdraw}>
        Withdraw
      </Button>
    </Box>
  );
};

export default VaultTab;
