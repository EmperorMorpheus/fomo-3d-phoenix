/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Web3 from 'web3';
import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, TextField, Typography } from '@mui/material';
import styled from '@emotion/styled';


// Contract address
const BN = require('bn.js');

// Create contract instance
// Define your styled components here
const Container = styled.div`
    // Add your styles here
`;
const containerStyles = css`
  background-color: #2b2b2b;
  color: #fff;
  padding: 20px;
  border-radius: 10px;
`;

const buttonStyles = css`
  background-color: #4f60e0;
  color: #fff;
  margin: 5px;
  &:hover {
    background-color: #3e50c7;
  }
`;

const textFieldStyles = css`
  background-color: #fff;
  margin: 10px 0;
`;
const PurchaseTab = ({contract, contract2, web3 }) => {
    const [key, setKey] = useState(1);
    const [userAddress, setUserAddress] = useState(null);

    useEffect(() => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        web3.eth.getAccounts()
          .then(accounts => {
            setUserAddress(accounts[0]);
          })
          .catch(error => {
            console.error('An error occurred:', error);
          });
      } else {
        console.log('No Ethereum browser extension detected. You should consider trying MetaMask!');
      }
    }, []);

    // Define your increment function
    const incrementKeys = (num) => {
        let newKey = Number(key) + num;
        setKey(newKey);
    }

    // Define your onChange function
    const onChangeKeyNum = (evt) => {
        setKey(evt.target.value);
    }
    
    const buyKeys = async () => {

      if (!window.ethereum) {
        console.error('MetaMask is not installed');
        return;
      }


    const functionArgs = ["555", key.toString()];
    console.log(key);

    // Encode the function call
    const data = contract.methods.buyKeys(key.toString()).encodeABI();
    const keyPrice = await contract.methods.calculateTotalPrice(key).call();
    const keyPriceInt = new BN(keyPrice);
    // let adjustableGas = '0x09184e72a000'; // This is 21000 in decimal, which is a typical gas amount for a simple transfer. You can adjust this value as needed.
    // const keyPriceTemp = keyPriceInt * 10000;
    // const keyPriceStr = keyPriceTemp.toString();
    // const keyPriceStr = keyPrice.toString();
    // const keyPriceValue = parseInt(keyPrice);
    // const keyPriceStrValue = keyPriceValue.toString();




    const keyPriceHex = '0x' + keyPriceInt.toString('hex')
    const keyPriceStr = keyPriceHex.toString();
    console.log("key price issssssssshhh", keyPriceHex);
    // const keyPriceInWei = web3.utils.toWei(keyPrice.toString(), 'ether');
    const transactionParameters = {
      nonce: '0x00', // ignored by MetaMask
      to: contract.options.address, 
      from: userAddress, 
      value: keyPriceHex, 
      data,
    };
    

    
    console.log(transactionParameters);
    try {
      // txHash is a hex string
      // As with any RPC call, it may throw an error
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });

      console.log('Transaction hash:', txHash);
    } catch (err) {
      console.error('There was an issue:', err);
    }
  }



    return (
        <Container css={containerStyles}>
        <Typography variant="h3">Purchase Keys</Typography>
  
        <TextField
          css={textFieldStyles}
          variant="outlined"
          type="number"
          onChange={onChangeKeyNum}
          value={key}
        />
  
        <ButtonGroup>
          <Button css={buttonStyles} onClick={() => incrementKeys(1)}>+ 1 Key</Button>
          <Button css={buttonStyles} onClick={() => incrementKeys(2)}>+ 2 Keys</Button>
          <Button css={buttonStyles} onClick={() => incrementKeys(5)}>+ 5 Keys</Button>
          <Button css={buttonStyles} onClick={() => incrementKeys(10)}>+ 10 Keys</Button>
          <Button css={buttonStyles} onClick={() => incrementKeys(100)}>+ 100 Keys</Button>
        </ButtonGroup>
  
        <Button color="primary" variant="contained" css={buttonStyles} onClick={buyKeys}>Buy Keys</Button>
      </Container>
    );
}

export default PurchaseTab;
