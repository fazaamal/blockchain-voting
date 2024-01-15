import { VotingContract } from '@/lib/ethers';
import { NextRequest, NextResponse } from 'next/server';

export type VoteCountObject = {
  voteCounts: {
    name: string,
    count: number
  }[],
  totalVotes: number,
  maxVotes: number
}

export async function GET (request: NextRequest) {
  let candidatesList = await VotingContract.getCandidateList(); 
  let voteCounts: VoteCountObject['voteCounts'] = [];
  let totalVotes = 0
  let maxVotes = 0;

  for(var name in candidatesList){
    let count = (await VotingContract.getVoteCount(candidatesList[name]));
    voteCounts.push({name: candidatesList[name], count})
    totalVotes += count;
    if(count > maxVotes) maxVotes = count;
  }

  return NextResponse.json({
    voteCounts,
    totalVotes,
    maxVotes
  });
}