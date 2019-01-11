const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");

const provider = new HDWalletProvider(
  "potato enroll select date dad stop sketch cute song cave nice vanish",
  "https://rinkeby.infura.io/v3/79935d85d3be4157ba6f22cd15e9d6d1"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: "0x" + compiledFactory.bytecode })
    .send({ from: accounts[0], gas: "2000000" });

  console.log("Contract deployed to", result.options.address);
};
deploy();
