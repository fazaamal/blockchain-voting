import { AuthObject } from '@/app/types';
import { prisma } from '@/lib/db';
import { VotingContract } from '@/lib/ethers';
import JwtInstance from '@/lib/jwt';
import { verifySignature } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function POST (request: NextRequest) {
  const {authentication, walletAddress} = await request.json();

  if(!authentication || !walletAddress) {
    return NextResponse.json({message: 'Invalid request body'}, { status: 400 });
  }

  if(!verifySignature(authentication.message, authentication.signature, authentication.walletAddress)) {
    return NextResponse.json({message: 'Invalid signature'}, { status: 401 });
  }

  if(!await prisma.voter.findUnique({where: {walletAddress}})) {
    return NextResponse.json({message: 'User not registered'}, { status: 401 });
  }

  if(!await VotingContract.isVoterApproved(walletAddress)) {
    return NextResponse.json({message: 'User not approved to vote; if registered please wait until approved'}, { status: 401 });
  }

  const token = JwtInstance.generateToken(walletAddress, 1);

  return NextResponse.json({ success: true, message: 'Voter successfully logged in'}, {
    headers: {
      'Authorization': `${token}`
    }
  });
}