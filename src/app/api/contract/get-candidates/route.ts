import { VotingContract } from '@/lib/ethers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET (request: NextRequest) {
  return NextResponse.json({ 
  candidates: await VotingContract.getCandidateList(),
  });
}