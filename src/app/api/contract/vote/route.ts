import { NextRequest, NextResponse } from 'next/server';

export async function POST (request: NextRequest) {
  const {} = await request.json()
  return NextResponse.json({ message: 'Hello world!'});
}