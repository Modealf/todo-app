// prisma/seed.ts
// TODO: this needs to be edited to seed the database with the correct data
import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
  const user1 = await prisma.user.upsert({
    where: { email: 'modelf@email.com' },
    update: {},
    create: {
      email: 'modelf@email.com',
      name: 'Modelf',
      password: '',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'azoz@email.com' },
    update: {},
    create: {
      email: 'azoz@email.com',
      name: 'Azoz',
      password: '',
    },
  });

  const todo1 = await prisma.todos.upsert({
    where: { id: '1' },
    update: {},
    create: {
      title: 'Todo 1',
      userId: user1.id,
    },
  });
  const todo2 = await prisma.todos.upsert({
    where: { id: '2' },
    update: {},
    create: {
      title: 'Todo 2',
      userId: user2.id,
    },
  });
  console.log({ user1, user2 }, { todo1, todo2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
