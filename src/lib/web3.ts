import { AuthObject } from '@/app/types';
import Web3 from 'web3';
// import { ABI } from './ethers';
import config from './abi/VotingSystemAbi.json'
const abi = config.abi;

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

export const vote = async (web3: Web3|null, name:string): Promise<{success:boolean, error:string|null}> => {
  try {
    if(!web3) return {
      success: false,
      error: null
    };
    await window.ethereum?.enable()
    const accounts = await web3?.eth.getAccounts();
    
    if(accounts?.length === 0 || !accounts) return {
      success: false,
      error: null
    };

    const contract = new web3.eth.Contract(abi, process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);

    // @ts-ignore
    const result = await contract.methods.vote(name).send({from: accounts[0]});

    return {
      success: true,
      error: null
    }
  } catch (err: any) {
    console.warn(`Error`, err);

    return {
      success: false,
      error: err.message
    }
  }
}


