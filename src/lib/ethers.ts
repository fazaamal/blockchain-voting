import { ethers, Wallet } from 'ethers';
import config from './abi/VotingSystemAbi.json'
require('dotenv').config();

const {abi} = config;

export const fetchCache = 'force-no-store'
// const wallet = new Wallet(process.env.PRIVATE_KEY as string, provider);
const contractAddress= process.env.NODE_ENV ===  'test'?'0x800aE28599BD329DD83dAd79ad0d307dcaaCf075':process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;

const provider = new ethers.JsonRpcProvider(process.env.NODE_ENV ===  'test'?'http://127.0.0.1:7545':process.env.RPC_ENDPOINT as string);
const votingContract = new ethers.Contract(contractAddress, abi, provider);


export class VotingContract {
  contract: ethers.Contract

  constructor(privateKey: string){
    const wallet = new Wallet(privateKey, provider);

    this.contract = new ethers.Contract(contractAddress, abi, wallet);
  }

  async approveVoter ( walletAddress: string) {
    return await this.contract.approveVoter(walletAddress);
  }

  async toggleVoting(){
    return await this.contract.toggleVoting();
  }

  async addCandidate(name: string){
    return await this.contract.addCandidate(name);
  }

  async vote(name: string){
    return await this.contract.vote(name);
  }

  static async admin(): Promise<string>{
    return await votingContract.admin();
  }

  static async isVoterApproved(walletAddress: string): Promise<boolean>{
    return await votingContract.approvedVoters(walletAddress);
  }

  static async getCandidateList(): Promise<string[]>{
    return await votingContract.getCandidateList();
  }

  static async getVoteCount(name:string): Promise<number>{
    return parseFloat((await votingContract.getVoteCount(name) as BigInt).toString());
  }

  static async hasVoted(walletAddress: string): Promise<boolean>{
    return await votingContract.hasVoted(walletAddress);
  }

  static async votingAllowed(): Promise<boolean>{
    return await votingContract.votingAllowed();

  }
}

// VotingContract.("0x51F69fC5711D91d09d8156CAf0CB09C9C7EEc7cE").then(res=>console.log(res))
// const v = new VotingContract(process.env.PRIVATE_KEY as string)


// const contract = new ContractFactory(abi, byteC).connect(wallet);

// async function deployContract() {
//   const deployedContract = await contract.deploy();
//   console.log(deployedContract);
  

//   // console.log('Contract address:', receipt.address);
// }

// deployContract()
//   .then(() => process.exit(0))
//   .catch(error => {
//       console.error(error);
//       process.exit(1);
//   });