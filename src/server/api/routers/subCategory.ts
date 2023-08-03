import { z } from 'zod';
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from '@/server/api/trpc';

export const subCategoryRouter = createTRPCRouter({
  get: publicProcedure.query(({ ctx }) =>
    ctx.prisma.subCategory.findMany({
      where: {
        OR: [
          {
            userId: null,
          },
          { userId: ctx.session?.user.id },
        ],
      },
    })
  ),

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

  update: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        name: z.string(),
        categoryId: z.string().cuid(),
      })
    )
    .mutation(({ input: { name, categoryId, id }, ctx }) =>
      ctx.prisma.subCategory.update({
        where: {
          id,
          userId: ctx.session.user.id,
        },
        data: {
          categoryId,
          name,
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

      await ctx.prisma.subCategory.delete({
        where: {
          id: subCategory.id,
        },
      });

      return { success: true };
    }),
});
