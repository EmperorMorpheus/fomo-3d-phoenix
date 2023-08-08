/** @jsxImportSource @emotion/react */
import React, {useState, useEffect} from 'react';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Web3 from 'web3';
import FomoPhoenix from './contracts/build/contracts/FomoPhoenix.json';
import PlayersBook from './contracts/build/contracts/PlayersBook.json';
const secondsToHMS = (seconds) => {
    console.log("total secs", seconds);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return { hours, minutes, seconds: remainingSeconds };
  };


// Define your styled components here
const Container = styled.div`
    // Add your styles here
`;

const containerStyles = css`
    justify-content: center;
    display: flex;

`
const purchaseStyles = css`
  width: 531px;
  height: 369px;
  background-color: #2b2b2b;
  color: #fff;
  border-radius: 10px;
  margin-top: 11px;
`;

const RoundTab = ({contract, contract2, web3, accounts}) => {
    
    const [round, setRound] = useState(null);
    const [drainTime, setDrainTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [activePot, setActivePot] = useState(null);
    const [keys, setKeys] = useState(null);
    const [earnings, setEarnings] = useState(null);
    
    useEffect(() => {
      // Assuming you have a web3 instance and a contract instance

      
      const address = window.ethereum.selectedAddress;

      async function fetchData() {
        console.log(web3);
       
        console.log (window.ethereum.selectedAddress);
        console.log(contract);
        
        const round = await contract.methods.roundNumber().call();
        const roundStr = round.toString();

        if (!web3 && !address) {
            console.log('No address selected');
            return;
          }

        const drainTime = await contract.methods.getCurrentTimeLeft().call();
        console.log(drainTime);
        const drainTimeInt = parseInt(drainTime);
        const drainTimeFixed = secondsToHMS(drainTimeInt);
        const activePot = await contract.methods.pot().call();
        const activePotFixed = parseInt(activePot);
        const activePotEther = web3.utils.fromWei(activePotFixed.toString(), 'ether');
        // const keys = await contract.methods.getNumberOfKeysBought().call({from: window.ethereum.selectedAddress});
        const earnings = await contract2.methods.getDividendsEarned(accounts[0]).call();
        const totalKeys = await contract2.methods.getTotalPlayerKeys(accounts[0]).call();
        const earningsFixed = parseInt(earnings);
        const earningsInEther = web3.utils.fromWei(earningsFixed.toString(), 'ether');
        const totalKeysFixed = parseInt(totalKeys);
  
        setRound(roundStr);
        setDrainTime(drainTimeFixed);
        setActivePot(activePotEther);
        setKeys(totalKeysFixed);
        setEarnings(earningsInEther);
      
    }
      fetchData();
      console.log(round);
    },[web3]);
  
    return (
        <div css={containerStyles}>
            <div css={purchaseStyles}>
        <Container>
            <Typography variant="h3">Round # {round}</Typography>
            <Box>
                <Typography variant="h5">Contract will drain in</Typography>
                <Typography variant="h5">{drainTime.hours}{drainTime.minutes}{drainTime.seconds}</Typography>
            </Box>
            <Box>
                <Typography variant="h5">Active Pot</Typography>
                
                <Typography variant="h5">{activePot}</Typography>
            </Box>
            <Box>
                <Typography variant="h5">Your Keys</Typography>
                <Typography variant="h5">{keys}</Typography>
            </Box>
            <Box>
                <Typography variant="h5">Your Earnings</Typography>
                <Typography variant="h5">{earnings}</Typography>
            </Box>
        </Container>
        </div>
        </div>
    );
}

export default RoundTab;
