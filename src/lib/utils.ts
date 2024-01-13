import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import Web3 from "web3"
import 'dotenv/config'
require('dotenv').config()
import jwt from './jwt';
import { getAuthToken, getWalletAddress } from "./localStorage"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function verifySignature(message: string, signature: string, walletAddress: string) {
  
  const web3 = new Web3(process.env.RPC_ENPOINT)

  try {
    const recoveredAddress = web3.eth.accounts.recover(message, signature);
    if(recoveredAddress.toLowerCase() === walletAddress.toLowerCase())
      return true;
    else
      return false;
  } catch (error) {
    return false;
  }
}

export function isTokenValid(): boolean {
  let authToken = getAuthToken();
  let walletAddress = getWalletAddress();

  if(!authToken || !walletAddress) return false;

  return jwt.verifyToken(authToken, walletAddress);
}
