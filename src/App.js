import logo from './logo.svg';
import './App.css';
import LoadingPage from './Loading';
import Nav from './Nav';
import Pot from './Pot';
import RoundStats from './RoundStats';
import Footer from './Footer';
import ConnectWallet from './ConnectWallet';
import CoreContainer from './CoreContainer';
import Web3 from 'web3';
import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
//contracts
import FomoPhoenix from './contracts/build/contracts/FomoPhoenix.json';
import PlayersBook from './contracts/build/contracts/PlayersBook.json';
//drizzle
// import { Drizzle, generateStore } from "@drizzle/store";
// import { DrizzleContext } from "@drizzle/react-plugin";
// import Axios from 'axios';

const web3 = new Web3("https://rpc.v4.testnet.pulsechain.com");
const networkId = "943";


const fomoPhoenixAddress = FomoPhoenix.networks[networkId].address;
const playersBookAddress = PlayersBook.networks[networkId].address;

const fomoPhoenixContract = new web3.eth.Contract(FomoPhoenix.abi, fomoPhoenixAddress);
const playersBookContract = new web3.eth.Contract(PlayersBook.abi, playersBookAddress);

console.log(fomoPhoenixContract);
// console.log(web3);
// const options = {
//   web3: {
//     customProvider: web3,
//   },
//   // window.ethereum || 
//   contracts: [FomoPhoenix,PlayersBook],
//   events: [],
// };
// const drizzleStore = generateStore(options);
// const drizzle = new Drizzle(options, drizzleStore);

// const axios = Axios;


// const DEXSCREENER_API = 'https://api.dexscreener.com/latest/dex/pairs/pulsechain/0xE56043671df55dE5CDf8459710433C10324DE0aE';

// async function getEthPriceInUsd() {
//   console.log("entered get eth price function!")
//   const response = await axios.get(DEXSCREENER_API);
//   console.log(response);
//   const priceOfPls = response.data.pair.priceUsd;
//   console.log("the price is" + priceOfPls);
//   return priceOfPls;
// }

// async function getBalanceInUsd(address) {
//   const balanceWei = await web3.eth.getBalance(address);
//   const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
//   const priceUsd = await getEthPriceInUsd();
//   const balanceUsd = balanceEth * priceUsd;
//   plsUsd = balanceUsd;
//   return balanceUsd;
// }


// // Address for which you want to get the balance
// const address = '0x7A0702FFFEe21387149C23661016F425315EC469';

// getBalanceInUsd(address);

// // Get the balance of the address
// let sacrificeBalance;

// function getSacBalance(){
//   web3.eth.getBalance(address)
//   .then(balance => {
//     console.log('Address:', address);
//     console.log('Balance:', web3.utils.fromWei(balance, 'ether'), 'PLS');
//     sacrificeBalance = web3.utils.fromWei(balance, "ether");
//     console.log("sacrifice Balance is: " + sacrificeBalance);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });
// };

// getSacBalance();





function App() {
  const [web3, setWeb3] = useState();
  const [loading, setLoading] = useState(true);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [accounts, setAccounts] = useState();
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3Instance = new Web3(window.ethereum);

        
        setAccounts(accounts);
        // Update your component state
        setWeb3(web3Instance);
        setIsWalletConnected(true);
        setLoading(false);
        
        console.log("current selected address is", accounts[0]);
  
        return accounts[0];
      } catch (error) {
        console.error("User denied account access");
      }
    } else {
      console.log('No Ethereum browser extension detected. You should consider trying MetaMask!');
    }
  };

  


  return (
    <>
      <Nav connectWallet={connectWallet} />
      {loading ? (
        <LoadingPage />
      ) : isWalletConnected ? (
        <>
          <Pot contract={fomoPhoenixContract} contract2={playersBookContract} web3={web3} />
          <CoreContainer contract={fomoPhoenixContract} contract2={playersBookContract} web3={web3} accounts={accounts} />
          <Footer contract={fomoPhoenixContract} />
        </>
      ) : null}
    </>
);
}

export default App;
