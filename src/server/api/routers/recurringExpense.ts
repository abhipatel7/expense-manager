import { z } from 'zod';
import { DayOfWeek, Frequency } from '@prisma/client';
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';

export const recurringExpenseRouter = createTRPCRouter({
  get: protectedProcedure.query(({ ctx }) =>
    ctx.prisma.recurringExpense.findMany({
      where: { userId: ctx.session?.user.id },
      include: {
        category: true,
        subCategory: true,
        expense: true,
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
        description: z.string().optional(),
        categoryId: z.string().cuid(),
        subCategoryId: z.string().cuid().optional(),
        startDate: z.date(),
        endDate: z.date().optional(),
        dayOfWeek: z.nativeEnum(DayOfWeek).optional(),
        dayOfMonth: z.number().optional(),
        frequency: z.nativeEnum(Frequency),
      })
    )
    .mutation(
      async ({
        input: {
          amount,
          description,
          categoryId,
          subCategoryId,
          frequency,
          startDate,
          dayOfMonth,
          dayOfWeek,
          endDate,
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

        return ctx.prisma.recurringExpense.create({
          data: {
            amount,
            categoryId,
            subCategoryId,
            description,
            frequency,
            startDate,
            endDate,
            dayOfMonth,
            dayOfWeek,
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
        description: z.string().optional(),
        categoryId: z.string().cuid(),
        subCategoryId: z.string().cuid().optional(),
        startDate: z.date(),
        endDate: z.date().optional(),
        dayOfWeek: z.nativeEnum(DayOfWeek).optional(),
        dayOfMonth: z.number().optional(),
        frequency: z.nativeEnum(Frequency),
      })
    )
    .mutation(
      async ({
        input: {
          id,
          amount,
          categoryId,
          frequency,
          startDate,
          dayOfMonth,
          dayOfWeek,
          description,
          endDate,
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

        return ctx.prisma.recurringExpense.update({
          where: {
            id,
            userId: ctx.session.user.id,
          },
          data: {
            amount,
            categoryId,
            subCategoryId,
            description,
            frequency,
            startDate,
            endDate,
            dayOfMonth,
            dayOfWeek,
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
      const recurringExpense =
        await ctx.prisma.recurringExpense.findFirstOrThrow({
          where: {
            id,
            userId: ctx.session.user.id,
          },
        });

      await ctx.prisma.recurringExpense.delete({
        where: {
          id: recurringExpense.id,
        },
      });

      return { success: true };
    }),
});
