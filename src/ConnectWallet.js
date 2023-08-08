import React, { useState } from 'react';

function ConnectWallet({connectWallet}) {
    const [account, setAccount] = useState('');

    return (
        <div>
            <button onClick={connectWallet}>Connect Wallet</button>
            { account && <p>Connected: {account}</p> }
        </div>
    );
}

export default ConnectWallet;
