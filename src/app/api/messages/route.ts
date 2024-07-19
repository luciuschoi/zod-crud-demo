import { NextResponse } from 'next/server';
import prisma from '../../../../prisma/db';

export async function GET(request: Request) {
  const data = await prisma.message.findMany(
    {
      orderBy: {
        createdAt: 'desc',
      },
    }
  );
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const data = await request.json();
  console.log(data)
  const newMessage = await prisma.message.create({
    data
  });

  return NextResponse.json(data, { status: 201 });
}
