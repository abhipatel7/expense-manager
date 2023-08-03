import { createTRPCRouter } from '@/server/api/trpc';
import {
  exampleRouter,
  categoryRouter,
  subCategoryRouter,
  incomeRouter,
  expenseRouter,
  userAccountRouter,
} from '@/server/api/routers';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  category: categoryRouter,
  subCategory: subCategoryRouter,
  income: incomeRouter,
  expense: expenseRouter,
  userAccount: userAccountRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
