import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';

export const expenseRouter = createTRPCRouter({
  get: protectedProcedure.query(({ ctx }) =>
    ctx.prisma.expense.findMany({
      where: { userId: ctx.session?.user.id },
      include: {
        category: true,
        subCategory: true,
        userAccount: true,
        recurringExpense: true,
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
        recurringExpenseId: z.string().cuid().optional(),
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
          recurringExpenseId,
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

        if (recurringExpenseId) {
          await ctx.prisma.recurringExpense.findFirstOrThrow({
            where: { id: recurringExpenseId },
          });
        }

        return ctx.prisma.expense.create({
          data: {
            amount,
            categoryId,
            description,
            note,
            userAccountId,
            subCategoryId,
            attachment,
            recurringExpenseId,
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
        recurringExpenseId: z.string().cuid().optional(),
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
          recurringExpenseId,
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

        if (recurringExpenseId) {
          await ctx.prisma.recurringExpense.findFirstOrThrow({
            where: { id: recurringExpenseId },
          });
        }

        return ctx.prisma.expense.update({
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
            recurringExpenseId,
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
      const expense = await ctx.prisma.expense.findFirstOrThrow({
        where: {
          id,
          userId: ctx.session.user.id,
        },
      });

      await ctx.prisma.expense.delete({
        where: {
          id: expense.id,
        },
      });

      return { success: true };
    }),
});
