import { z } from 'zod';
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from '@/server/api/trpc';

export const subCategoryRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => ctx.prisma.subCategory.findMany()),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        categoryId: z.string().cuid(),
      })
    )
    .mutation(({ input: { name, categoryId }, ctx }) =>
      ctx.prisma.subCategory.create({
        data: {
          categoryId,
          name,
          userId: ctx.session.user.id,
        },
      })
    ),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .mutation(async ({ input: { id }, ctx }) => {
      const subCategory = await ctx.prisma.subCategory.findFirstOrThrow({
        where: {
          id,
          userId: ctx.session.user.id,
        },
      });

      return ctx.prisma.subCategory.delete({
        where: {
          id: subCategory.id,
        },
      });
    }),
});
