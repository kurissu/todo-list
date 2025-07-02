import { z } from "zod"
import { PrismaClient } from '~/generated/prisma'


const schema = z.object({
  id: z.string().uuid(),
  title: z.string()
})

export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient();
  const user = await getCurrentUser(event)
  if(!user){
    throw createError({
        statusCode: 401,
    })
  }
  const body = await readBody(event)
  const parsed = await schema.safeParseAsync(body)
  if(parsed.error){
    console.warn(parsed.error)
    throw createError({
        statusCode: 400,
        statusMessage: 'Invalid request body'
    })
  }
  const data = await prisma.todoList.update({
    where: {id: parsed.data.id, userId: user.id},
    data: {title: parsed.data.title}
  })

  return { data }
})
