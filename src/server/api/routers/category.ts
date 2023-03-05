import { z } from 'zod';

import { CategoryType } from '@prisma/client';
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from '@/server/api/trpc';

export const categoryRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) =>
    ctx.prisma.category.findMany({
      include: {
        subCategories: true,
        _count: {
          select: {
            subCategories: true,
          },
        },
      },
    })
  ),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        categoryType: z.nativeEnum(CategoryType),
      })
    )
    .mutation(({ input: { name, categoryType }, ctx }) =>
      ctx.prisma.category.create({
        data: {
          name,
          type: categoryType,
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
      const category = await ctx.prisma.category.findFirstOrThrow({
        where: {
          id,
          userId: ctx.session.user.id,
        },
      });

      return ctx.prisma.category.delete({
        where: {
          id: category.id,
        },
      });
    }),
});
