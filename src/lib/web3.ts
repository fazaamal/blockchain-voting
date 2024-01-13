import { AuthObject } from '@/app/types';
import Web3 from 'web3';
// import { ABI } from './ethers';
import { abi } from './abi/VotingSystemAbi.json';

export const connectAndSign = async (web3: Web3|null): Promise<AuthObject | false> => {
  try {
    if(!web3) return false;
    await window.ethereum?.request({ method: 'wallet_requestPermissions', params: [{ eth_accounts: {} }] });

    // await window.ethereum?.enable()
    const accounts = await web3.eth.getAccounts();
    
    const message = 'Hello World';
    if(accounts?.length === 0 || !accounts) return false;
    const signature = await web3?.eth.personal.sign(message, accounts[0], '');
    if(!signature) return false;

    if(accounts[0].toLowerCase() != web3.eth.accounts.recover(message, signature).toLowerCase()) throw new Error('Invalid signature');

    return {
      message,
      signature,
      walletAddress: accounts[0],
    }
  } catch (err) {
    console.warn(`No accounts found`, err);

    return false;
  }
}

export const vote = async (web3: Web3|null, name:string) => {
  try {
    if(!web3) return false;
    await window.ethereum?.enable()
    const accounts = await web3?.eth.getAccounts();
    
    if(accounts?.length === 0 || !accounts) return false;

    const contract = new web3.eth.Contract(abi, '0x22B8DdeC5B2aa48FFf10cA52cAD21E4e845b4a37');

    // @ts-ignore
    const result = await contract.methods.vote(name).send({from: accounts[0]});

    console.log(result);
    


    // const signature = await web3?.eth.personal.sign(message, accounts[0], '');
    // if(!signature) return false;

    // if(accounts[0].toLowerCase() != await web3?.eth.accounts.recover(message, signature).toLowerCase()) throw new Error('Invalid signature');

    // return {
    //   message,
    //   signature,
    //   walletAddress: accounts[0],
    // }
  } catch (err) {
    console.warn(`No accounts found`, err);

    return false;
  }
}


