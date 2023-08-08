/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, {useState, useEffect} from 'react';
import Web3 from 'web3';
import { Card, CardContent, Typography, Button } from '@mui/material';
import logoImg from './logoImg.png'


//utitlity function(s)

const secondsToHMS = (seconds) => {
  console.log("total secs", seconds);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return { hours, minutes, seconds: remainingSeconds };
};

// Define your styled components here
const cardStyles = css`
    background-color: #2A2A2A;
    color: #FFD700;
    border-radius: 10px;
    width: 400px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const potStyles = css`
    font-size: 2em;
    margin-bottom: 0.5em;
`;

const countdownStyles = css`
    font-size: 1.5em;
    margin-bottom: 0.5em;
`;

const messageStyles = css`
    font-size: 1em;
`;
const sectionStyles = css`
  background-color: black;
  color: #fff;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 50%;
  height: 50%;
  @media (max-width: 760px) {
    background-color: #212121;
    color: #fff;
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 81%;
    height: 50%;
  
  }
`;

const timerStyles = css`
  font-size: 48px;
  font-weight: bold;
  margin-top: 16px;
  color: #fff;
`;

const sectionContainer = css`
  width:100%;
  heigh: 100%;
  background-color: black;
  display: flex;
  align-items: center; /* Vertical alignment */
  justify-content: center;
  margin-top: 10px;
`
const morphImage = css`
  width: 100%;
`
const plsImage = css`
  height: 30px;
  width: 30px;
`

const logoImgCss = css`
  height: 369px;
  width: 369px;
`
const sacrificeContainer = css`
  // width: 80%
  // height: 20px;
  border-radius: 10px;
  padding: 10px;
  background: linear-gradient(210deg, #00eaff 0%, #0080ff 25%, #8000ff 50%, #e619e6 75%, #f00 100%);
  word-wrap: break-word;
  width: 81%;
  font-size: 30px;
`


const sacrificeCounter = css`
  font-size: 40px;
  font-bold: bold;
  margin-top: 10px;
  border-radius: 10px;
  background: linear-gradient(210deg, #00eaff 0%, #0080ff 25%, #8000ff 50%, #e619e6 75%, #f00 100%);
  width: 81%;
  word-wrap: break-word;

`
const sacrificeInUsdContainer = css`
  font-size: 40px;
  font-bold: bold;
  margin-top: 10px;
  border-radius: 10px;
  background-color: green;
  width: 81%;
  word-wrap: break-word;
`

function Pot({contract, contract2, web3}) {
    const [potValue, setPotValue] = useState(null);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPotValue = async () => {
      try {
        console.log(contract.methods);
        const value =  await contract.methods.pot().call();
        const etherValue = web3.utils.fromWei(value.toString(), 'ether'); // Convert from Wei to Ether
        setPotValue(etherValue);
        console.log("pot amount is", etherValue);
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    getPotValue();
  }, [contract]);

  const [sidePotValue, setSidePotValue] = useState(null);

  useEffect(() => {
   
    const getSidePotValue = async () => {
      try {
        const value = await contract.methods.endSidePot().call();
        const etherValue = web3.utils.fromWei(value.toString(), 'ether'); // Convert from Wei to Ether
        setSidePotValue(etherValue);
        console.log("Side value", etherValue);
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

  getSidePotValue();
}, [contract]);
const [totalKeys, setTotalKeys] = useState(null);

  useEffect(() => {

    const getTotalKeys = async () => {
      try {
        const keys = await contract.methods.totalKeys().call();
        const totalKeysValue = keys.toString();
        setTotalKeys(totalKeysValue); // Convert from Wei to Ether
        console.log("keys:", totalKeysValue);
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

  getTotalKeys();
}, [contract]);

  const [currentRoundDuration, setCurrentRoundDuration] = useState(0);

  // Replace with your logic to get the current round duration
  const fetchCurrentRoundDuration = async () => {
    // Example: fetching from a smart contract or API
    const durationSecs = await contract.methods.getCurrentTimeLeft().call();
    const durationSecsValue = parseInt(durationSecs);
    const duration = secondsToHMS(durationSecsValue); //converting bInt
    console.log(duration);
    setCurrentRoundDuration(duration);
  };

  // Run the fetch logic when the component mounts
  useEffect(() => {
    fetchCurrentRoundDuration();
    // Optionally, you could set up an interval to keep fetching the duration
    const interval = setInterval(fetchCurrentRoundDuration, 1000);
    return () => clearInterval(interval); // Clean up the interval when the component unmounts
  }, [contract]);

    return (
        <div css={sectionContainer}>
        <section css={sectionStyles}>
            <Typography variant="h2" color="inherit">
                Fomo3D Phoenix
            </Typography>
            <Typography variant="p" color="inherit">
                Inspired by the original game in 2018, by Team JUST
            </Typography>
            <Typography variant="h3" color="inherit" style={{ fontStyle: 'italic' }}>
                Satoshi is...
                {/* This game is about greed. How far will people go to win the jackpot?
                Bet early on how high a round will go by purchasing keys, each key is 
                a percentage of the total side pot. Go for the big pot by be the last one 
                to purchase a key or sit back relax and collect the passive income, your choice... */}
            </Typography>
            <Typography variant="h2" color="inherit">
                RUGGING
            </Typography>
            <img src={logoImg} css={logoImgCss}></img>
            <Typography variant="h2" color="inherit">
                Total Pot
            </Typography>
            <div css={sacrificeContainer}>
                <Typography variant="p" color="inherit">
                    {potValue} ETH<br /><br />
                </Typography>
            </div>
            <div css={sacrificeCounter}>
                <Typography variant="p" color="inherit">
                    Total Side Pot: {sidePotValue} ETH 
                </Typography>
                <br /><br />
            </div>
            <div css={sacrificeInUsdContainer}>
                <Typography variant="p" color="inherit">
                    Total Keys Purchased: {totalKeys}
                </Typography>
            </div>
            <Typography variant="h3" css={timerStyles}>
            </Typography>
            <Typography variant="h1" color="inherit" paragraph>
                Round will end in: {currentRoundDuration.hours}hrs:{currentRoundDuration.minutes}mins:{currentRoundDuration.seconds}secs            </Typography>
            <Button variant="contained" color="primary" href="#vision">
                Tutorial
            </Button>
        </section>
    </div>
    )
}

export default Pot;
