'use server';
import prisma from './db'

type Message = {
  name: string;
  message: string;
}

export async function createMessage(data: Message) {
  // 중복체크
  const duplicated = false
  if (duplicated) {
    return { duplicated: true ,message: '중복체크 실패' }
   }
  
  const message = await prisma.message.create({
    data
  });

  return { duplicated: false, data: message};
}

export async function getMessages(userId: string) {
  const messages = await prisma.message.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return messages;
}

export async function deleteMessage(messageId: number) {
  const message = await prisma.message.delete({
    where: {
      id: messageId,
    },
  });

  return message;
}