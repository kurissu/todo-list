import { PrismaClient } from '@prisma/client';

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();
  const user = await getCurrentUser(event)
  if(!user){
     throw createError({
        statusCode: 401
    }) 
  }
  const data = await prisma.todoList.findMany({
    where: { userId: user.id},
    include: { items: true}
  })
  return {data}
})
