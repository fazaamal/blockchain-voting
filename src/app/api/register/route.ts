import { NextRequest, NextResponse } from 'next/server';
import { RegisterPostBodySchema } from '@/app/register/page';
import { prisma } from '@/lib/db';
import { verifySignature } from '@/lib/utils';
import { VotingContract } from '@/lib/ethers';

export async function POST (request: NextRequest) {
  const {authentication, walletAddress, fullName, passportNumber} = (await request.json()) as RegisterPostBodySchema;
  // const body = await request.json()

  if(!authentication || !walletAddress || !fullName || !passportNumber) {
    return NextResponse.json({message: 'Invalid request body'}, { status: 400 });
  }
  if(!verifySignature(authentication.message, authentication.signature, authentication.walletAddress)) {
    return NextResponse.json({message: 'Invalid signature'}, { status: 400 });
  }
  
  if(await prisma.voter.findUnique({where: {walletAddress}}) || await prisma.voter.findUnique({where: { passportNumber}})) {
    return NextResponse.json({message: 'User already exists'}, { status: 400 });
  }
  
  const votingContract = new VotingContract(process.env.PRIVATE_KEY as string);  
  await votingContract.approveVoter(walletAddress, 10);

  await prisma.voter.create({
    data: {
      walletAddress,
      fullName,
      passportNumber,
    }
  });

  return NextResponse.json({ success: true ,message: 'Voter successfully registered!'});
}