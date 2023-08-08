/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem } from '@mui/material';
import mmImg from './metamask.png';
import communityImg from './social-media.png'; // Make sure the path is correct
import blockies from 'ethereum-blockies';


const navbarStyles = css`
  background-color: purple;
`;

const navbarLogo = css`
  margin-right: auto;
`;

const menuItems = css`
  margin-left: auto;
`;

const dappButtonStyles = css`
  margin-left: 5px;
  align-items: right;
  background-color: #0B0F26;
`;

const plsImage = css`
  width: 20px;
  height: 20px;
`;



const Nav = ({connectWallet}) => {
    const [userAddress, setUserAddress] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
  
    const handleClick = async () => {
      const address = await connectWallet();
      setUserAddress(address);
    };
  
    const handleMenuClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
  
    const handleLogout = () => {
      setUserAddress(null);
      setAnchorEl(null);
    };
  
    const trimAddress = (address) => {
      return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';
    };
  
    const avatar = userAddress
      ? `${blockies.create({ seed: userAddress }).toDataURL()}`
      : null;

    return (
        <AppBar position="static" css={navbarStyles}>
            <Toolbar>
                <Typography variant="h6" css={navbarLogo}>FOMO3D PHOENIX</Typography>
            <div css={menuItems}>
                <Button color="inherit">Tutorial</Button>

                <Button color="inherit" href="https://t.me/powh3" target="_blank">Community</Button>

                <Button color="inherit" href="https://fomo.hostedwiki.co/pages/Fomo3D%20Explained" target="_blank">About</Button>
                {userAddress ? (
            <React.Fragment>
              <Button color="inherit" onClick={handleMenuClick} css={dappButtonStyles}>
                {trimAddress(userAddress)}  <img src={avatar} css={plsImage} alt="User Avatar" />
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </React.Fragment>
          ) : (
            <Button color="inherit" onClick={handleClick} css={dappButtonStyles}>
              Connect <img src={mmImg} css={plsImage} />
            </Button>
          )}
                <Button color="inherit" css={dappButtonStyles} href="https://t.me/morpheuspls">
                      Telegram <img src={communityImg} css={plsImage}></img>
                </Button>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Nav;
