import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';

export const incomeRouter = createTRPCRouter({
  getIncomes: protectedProcedure.query(({ ctx }) =>
    ctx.prisma.income.findMany({
      where: { userId: ctx.session?.user.id },
      include: {
        category: true,
        subCategory: true,
        userAccount: true,
      },
      orderBy: {
        updatedAt: 'asc',
      },
    })
  ),

  create: protectedProcedure
    .input(
      z.object({
        amount: z.number(),
        note: z.string().optional(),
        description: z.string().optional(),
        attachment: z.string().array().optional(),
        categoryId: z.string().cuid(),
        subCategoryId: z.string().cuid().optional(),
        userAccountId: z.string().cuid(),
      })
    )
    .mutation(
      async ({
        input: {
          amount,
          attachment,
          description,
          note,
          categoryId,
          userAccountId,
          subCategoryId,
        },
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

        await ctx.prisma.userAccount.findFirstOrThrow({
          where: { id: userAccountId },
        });

        return ctx.prisma.income.create({
          data: {
            amount,
            categoryId,
            description,
            note,
            userAccountId,
            subCategoryId,
            attachment,
            userId: ctx.session.user.id,
          },
        });
      }
    ),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        amount: z.number(),
        note: z.string().optional(),
        description: z.string().optional(),
        attachment: z.string().array().optional(),
        categoryId: z.string().cuid(),
        subCategoryId: z.string().cuid().optional(),
        userAccountId: z.string().cuid(),
      })
    )
    .mutation(
      async ({
        input: {
          id,
          amount,
          attachment,
          description,
          note,
          categoryId,
          userAccountId,
          subCategoryId,
        },
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

        await ctx.prisma.userAccount.findFirstOrThrow({
          where: { id: userAccountId },
        });

        return ctx.prisma.income.update({
          where: {
            id,
            userId: ctx.session.user.id,
          },
          data: {
            amount,
            categoryId,
            description,
            note,
            userAccountId,
            subCategoryId,
            attachment,
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
      const income = await ctx.prisma.income.findFirstOrThrow({
        where: {
          id,
          userId: ctx.session.user.id,
        },
      });

      await ctx.prisma.income.delete({
        where: {
          id: income.id,
        },
      });

      return { success: true };
    }),
});
