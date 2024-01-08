import { NextRequest, NextResponse } from 'next/server';
import Web3 from 'web3';



export async function POST (request: NextRequest) {
  const { signature, message, walletAddress} = await request.json();

  if( !signature || !message || !walletAddress )
    return NextResponse.json({ error: 'Missing signature, message or walletAddress' }, { status: 400 });
  // console.log(signature, message, walletAddress);
  
  const web3 = new Web3('http://127.0.0.1:7545');
  
  try {
    const recoveredAddress = web3.eth.accounts.recover(message, signature);
    if(recoveredAddress.toLowerCase() === walletAddress.toLowerCase())
      return NextResponse.json({ message: 'Succesfully logged in' });
    else
      return NextResponse.json({ error: 'Could not verify signature' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Could not verify signature' }, { status: 401 });
  }
}