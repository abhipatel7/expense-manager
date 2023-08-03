import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const transferRouter = createTRPCRouter({
  get: protectedProcedure.query(({ ctx }) =>
    ctx.prisma.transfer.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        fromAccount: true,
        toAccount: true,
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
        fromAccountId: z.string().cuid(),
        toAccountId: z.string().cuid(),
      })
    )
    .mutation(
      async ({
        input: {
          amount,
          fromAccountId,
          toAccountId,
          attachment,
          description,
          note,
        },
        ctx,
      }) => {
        await ctx.prisma.userAccount.findFirstOrThrow({
          where: { id: fromAccountId },
        });

        await ctx.prisma.userAccount.findFirstOrThrow({
          where: { id: toAccountId },
        });

        return ctx.prisma.transfer.create({
          data: {
            amount,
            description,
            note,
            attachment,
            fromAccountId,
            toAccountId,
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
        fromAccountId: z.string().cuid(),
        toAccountId: z.string().cuid(),
      })
    )
    .mutation(
      async ({
        input: {
          id,
          amount,
          fromAccountId,
          toAccountId,
          attachment,
          description,
          note,
        },
        ctx,
      }) => {
        await ctx.prisma.userAccount.findFirstOrThrow({
          where: { id: fromAccountId },
        });

        await ctx.prisma.userAccount.findFirstOrThrow({
          where: { id: toAccountId },
        });

        return ctx.prisma.transfer.update({
          where: { id },
          data: {
            amount,
            description,
            note,
            attachment,
            fromAccountId,
            toAccountId,
            userId: ctx.session.user.id,
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
      const transfer = await ctx.prisma.transfer.findFirstOrThrow({
        where: { id, userId: ctx.session.user.id },
      });

      await ctx.prisma.transfer.delete({
        where: {
          id: transfer.id,
        },
      });

      return { success: true };
    }),
});
