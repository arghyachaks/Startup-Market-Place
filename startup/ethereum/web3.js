import Web3 from 'web3';

let web3;

if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // We are in the browser and metamask is running
  web3 = new Web3(window.web3.currentProvider);

} else {
  // we are on the server OR user donot have metamask
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/79935d85d3be4157ba6f22cd15e9d6d1'
  );
  web3 = new Web3(provider);
}

export default web3;
