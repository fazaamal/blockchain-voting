import { ethers, Wallet } from 'ethers';
import { abi } from './abi/VotingSystemAbi.json';
require('dotenv').config();

// const wallet = new Wallet(process.env.PRIVATE_KEY as string, provider);
const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT || 'http://127.0.0.1:7545');
const votingContract = new ethers.Contract('0x22B8DdeC5B2aa48FFf10cA52cAD21E4e845b4a37', abi, provider);
// console.log(contract.toggleVoting().then(res=>console.log(res)));

// export const ABI = abi;

export class VotingContract {
  contract: ethers.Contract

  constructor(privateKey: string){
    const wallet = new Wallet(privateKey, provider);

    this.contract = new ethers.Contract('0x22B8DdeC5B2aa48FFf10cA52cAD21E4e845b4a37', abi, wallet);
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