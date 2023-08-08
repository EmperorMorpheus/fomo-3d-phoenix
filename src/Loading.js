import { CircularProgress } from '@mui/material';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Web3 from 'web3';
import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, TextField, Typography } from '@mui/material';
import styled from '@emotion/styled';
import mmImg from './metamask.png';
import logoImg from './logoImg.png'


const loadingPageCSS = css`
  display: flex; 
  flex-direction: column;
  justify-content: center; 
  align-items: center; 
  height: 100vh;
  text-align: center;
`

const fontCSS = css`
color: white;
`

const mmImgCSS = css`
    height: 50px;
    width: 50px;
`
function LoadingPage() {
    return (
        // <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div css={loadingPageCSS}>
        <Typography variant="h2" color="inherit" css={fontCSS}>Please connect  <img src={mmImg} css={mmImgCSS} /> to play <CircularProgress />
</Typography>

            <img src={logoImg} />
    // </div>
    );
}

export default LoadingPage;

