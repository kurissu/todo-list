import { z } from 'zod'
import { PrismaClient } from '@prisma/client';


const schema = z.object({
  todoListItemId: z.string().uuid(),
  title: z.string()
})

export default defineEventHandler(async (event) => {
      const prisma = new PrismaClient();
  
  const user = await getCurrentUser(event)
  if (!user) {
    throw createError({ status: 401 })
  }
  const body = await readBody(event)
  const parsed = await schema.safeParseAsync(body)
  if (parsed.error) {
    console.warn(parsed.error)
    throw createError({
      status: 400,
      message: 'Invalid request body'
    })
  }
  const data = await prisma.todoListItem.update({
    where: { id: parsed.data.todoListItemId, todoList: { userId: user.id } },
    data: { title: parsed.data.title }
  })
  return { data }
})