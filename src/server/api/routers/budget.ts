import { z } from 'zod';
import { Frequency } from '@prisma/client';
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';

export const budgetRouter = createTRPCRouter({
  get: protectedProcedure.query(({ ctx }) =>
    ctx.prisma.budget.findMany({
      where: {
        userId: ctx.session?.user.id,
      },
      include: {
        category: true,
        subCategory: true,
      },
    })
  ),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        amount: z.number(),
        frequency: z.nativeEnum(Frequency),
        note: z.string().optional(),
        categoryId: z.string().cuid(),
        subCategoryId: z.string().cuid().optional(),
      })
    )
    .mutation(
      async ({
        input: { name, amount, categoryId, frequency, note, subCategoryId },
        ctx,
      }) => {
        await ctx.prisma.category.findFirstOrThrow({
          where: { id: categoryId },
        });

        if (subCategoryId) {
          await ctx.prisma.subCategory.findFirstOrThrow({
            where: { id: subCategoryId },
          });
        }

        return ctx.prisma.budget.create({
          data: {
            name,
            amount,
            categoryId,
            frequency,
            note,
            subCategoryId,
            userId: ctx.session.user.id,
          },
        });
      }
    ),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        name: z.string(),
        amount: z.number(),
        frequency: z.nativeEnum(Frequency),
        note: z.string().optional(),
        categoryId: z.string().cuid(),
        subCategoryId: z.string().cuid().optional(),
      })
    )
    .mutation(
      async ({
        input: { id, name, amount, categoryId, frequency, note, subCategoryId },
        ctx,
      }) => {
        await ctx.prisma.category.findFirstOrThrow({
          where: { id: categoryId },
        });

        if (subCategoryId) {
          await ctx.prisma.subCategory.findFirstOrThrow({
            where: { id: subCategoryId },
          });
        }

        return ctx.prisma.budget.update({
          where: { id },
          data: {
            name,
            amount,
            categoryId,
            frequency,
            note,
            subCategoryId,
          },
        });
      }
    ),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .mutation(async ({ input: { id }, ctx }) => {
      const budget = await ctx.prisma.budget.findFirstOrThrow({
        where: {
          id,
          userId: ctx.session.user.id,
        },
      });

      await ctx.prisma.budget.delete({
        where: {
          id: budget.id,
        },
      });

      return { success: true };
    }),
});
