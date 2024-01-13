import JwtInstance from '@/lib/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function POST (request: NextRequest) {
  const { authToken, walletAddress} = await request.json();

  if(!authToken || !walletAddress) return NextResponse.json({isAuthed: false}, {status: 401});

  let isAuthed = JwtInstance.verifyToken(authToken, walletAddress);

  if(isAuthed)
    return NextResponse.json({ isAuthed})
  else
    return NextResponse.json({ isAuthed}, { status: 401 })
}