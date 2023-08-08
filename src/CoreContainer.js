/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import Buy from './Buy';
import Vault from './Vault';
import Vanity from './Vanity';
import RoundStats from './RoundStats';
import { css } from '@emotion/react';

const containerStyles = css`
  justify-content: center;
  display: flex;
`;

const purchaseStyles = css`
  width: 531px;
  height: 369px;
  background-color: purple;
  border-radius: 10px;
  margin-top: 11px;
  margin-right: 11px;
`;

const panelStyle = css`
  border-radius: 0px.

`

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
};

const CoreContainer = ({contract, contract2, web3, accounts}) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div css={containerStyles}>
      <div css={purchaseStyles}>
        <div sx={{ width: '100%' }}>
          <div sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={value} 
              onChange={handleChange}
              sx={{
                '.MuiTab-root': {
                  color: 'white',
                },
                '.MuiTabs-indicator': {
                  backgroundColor: 'white',
                }
              }}
            >
              <Tab label="Buy" />
              <Tab label="Vault" />
              <Tab label="Vanity" />
            </Tabs>
          </div>
          <Box css={panelStyle}>
          <TabPanel value={value} index={0} css={panelStyle}>
            <Buy web3={web3} contract={contract} contract2={contract2}/>
          </TabPanel>
          <TabPanel value={value} index={1} css={panelStyle}>
            <Vault contract={contract} contract2={contract2} web3={web3}/>
          </TabPanel>
          <TabPanel value={value} index={2} css={panelStyle}>
            <Vanity />
          </TabPanel>
          </Box>
        </div>
      </div>
      <RoundStats contract={contract} contract2={contract2} web3={web3} accounts={accounts}/>
    </div>
  );
};

export default CoreContainer;
