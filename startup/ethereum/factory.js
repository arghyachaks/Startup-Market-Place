import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';


const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x195FD80Fb2566eAC07C7A3c77F6Bda138cE5093e'
);

export default instance;
