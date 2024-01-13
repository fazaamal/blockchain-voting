import { VotingContract } from '@/lib/ethers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST (request: NextRequest) {
  const { walletAddress } = await request.json();
  
  return NextResponse.json({ hasVoted: await VotingContract.hasVoted(walletAddress)});
}