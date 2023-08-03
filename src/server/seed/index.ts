/* eslint-disable no-console */
import { CategoryType, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Income Categories
  await prisma.category.createMany({
    data: [
      { name: '🤑 Allowance', type: CategoryType.INCOME },
      { name: '💰 Salary', type: CategoryType.INCOME },
      { name: '💵 Petty Cash', type: CategoryType.INCOME },
      { name: '🏅 Bonus', type: CategoryType.INCOME },
      { name: 'Other', type: CategoryType.INCOME },
      { name: '🍕 Food', type: CategoryType.EXPENSE },
    ],
  });

  // Expense Categories & Sub Categories
  await prisma.category.upsert({
    where: { name_type: { name: '🍕 Food', type: CategoryType.EXPENSE } },
    update: {},
    create: {
      name: '🍕 Food',
      type: CategoryType.EXPENSE,
      subCategories: {
        create: [
          { name: 'Lunch' },
          { name: 'Dinner' },
          { name: 'Eating Out' },
          { name: 'Beverages' },
        ],
      },
    },
  });
  await prisma.category.upsert({
    where: {
      name_type: { name: '💃🏻 Social Life', type: CategoryType.EXPENSE },
    },
    update: {},
    create: {
      name: '💃🏻 Social Life',
      type: CategoryType.EXPENSE,
      subCategories: {
        create: [
          { name: 'Friend' },
          { name: 'Fellowship' },
          { name: 'Alumni' },
          { name: 'Dues' },
        ],
      },
    },
  });
  await prisma.category.upsert({
    where: { name_type: { name: '🚖 Transport', type: CategoryType.EXPENSE } },
    update: {},
    create: {
      name: '🚖 Transport',
      type: CategoryType.EXPENSE,
      subCategories: {
        create: [
          { name: 'Bus' },
          { name: 'Subway' },
          { name: 'Taxi' },
          { name: 'Car' },
        ],
      },
    },
  });
  await prisma.category.upsert({
    where: { name_type: { name: '🎆 Culture', type: CategoryType.EXPENSE } },
    update: {},
    create: {
      name: '🎆 Culture',
      type: CategoryType.EXPENSE,
      subCategories: {
        create: [
          { name: 'Books' },
          { name: 'Movie' },
          { name: 'Music' },
          { name: 'Apps' },
        ],
      },
    },
  });
  await prisma.category.upsert({
    where: { name_type: { name: '🪑 Household', type: CategoryType.EXPENSE } },
    update: {},
    create: {
      name: '🪑 Household',
      type: CategoryType.EXPENSE,
      subCategories: {
        create: [
          { name: 'Appliances' },
          { name: 'Furniture' },
          { name: 'Kitchen' },
          { name: 'Toiletries' },
          { name: 'Chandlery' },
        ],
      },
    },
  });
  await prisma.category.upsert({
    where: { name_type: { name: '🧥 Apparel', type: CategoryType.EXPENSE } },
    update: {},
    create: {
      name: '🧥 Apparel',
      type: CategoryType.EXPENSE,
      subCategories: {
        create: [
          { name: 'Clothing' },
          { name: 'Fashion' },
          { name: 'Shoes' },
          { name: 'Laundry' },
        ],
      },
    },
  });
  await prisma.category.upsert({
    where: { name_type: { name: '💄 Beauty', type: CategoryType.EXPENSE } },
    update: {},
    create: {
      name: '💄 Beauty',
      type: CategoryType.EXPENSE,
      subCategories: {
        create: [
          { name: 'Cosmetics' },
          { name: 'Makeup' },
          { name: 'Accessories' },
          { name: 'Beauty' },
        ],
      },
    },
  });
  await prisma.category.upsert({
    where: { name_type: { name: '🧘🏻 Health', type: CategoryType.EXPENSE } },
    update: {},
    create: {
      name: '🧘🏻 Health',
      type: CategoryType.EXPENSE,
      subCategories: {
        create: [
          { name: 'Health' },
          { name: 'Yoga' },
          { name: 'Hospital' },
          { name: 'Medicine' },
        ],
      },
    },
  });
  await prisma.category.upsert({
    where: { name_type: { name: '📚 Education', type: CategoryType.EXPENSE } },
    update: {},
    create: {
      name: '📚 Education',
      type: CategoryType.EXPENSE,
      subCategories: {
        create: [
          { name: 'Schooling' },
          { name: 'Textbooks' },
          { name: 'School Supplies' },
          { name: 'Academy' },
        ],
      },
    },
  });
  await prisma.category.upsert({
    where: {
      name_type: {
        name: '📚 Education',
        type: CategoryType.EXPENSE,
      },
    },
    update: {},
    create: {
      name: '📚 Education',
      type: CategoryType.EXPENSE,
      subCategories: {
        create: [
          { name: 'Schooling' },
          { name: 'Textbooks' },
          { name: 'School Supplies' },
          { name: 'Academy' },
        ],
      },
    },
  });
  await prisma.category.createMany({
    data: [
      { name: '🐶 Pets', type: CategoryType.EXPENSE },
      { name: '🎁 Gift', type: CategoryType.EXPENSE },
      { name: 'Other', type: CategoryType.EXPENSE },
    ],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('Data seeded successfully.');
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
