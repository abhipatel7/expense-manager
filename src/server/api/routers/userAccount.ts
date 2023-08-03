import { z } from 'zod';
import { AccountGroup } from '@prisma/client';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const userAccountRouter = createTRPCRouter({
  get: protectedProcedure.query(({ ctx }) =>
    ctx.prisma.userAccount.findMany({
      where: {
        OR: [
          {
            userId: {
              equals: undefined,
            },
          },
          {
            userId: ctx.session?.user.id,
          },
        ],
      },
    })
  ),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        amount: z.number(),
        description: z.string().optional(),
        type: z.nativeEnum(AccountGroup),
      })
    )
    .mutation(({ input: { amount, name, type, description }, ctx }) =>
      ctx.prisma.userAccount.create({
        data: {
          amount,
          name,
          type,
          description,
          userId: ctx.session.user.id,
        },
      })
    ),

  update: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        amount: z.number(),
        description: z.string().optional(),
        type: z.nativeEnum(AccountGroup),
        id: z.string().cuid(),
      })
    )
    .mutation(({ input: { amount, name, type, description, id }, ctx }) =>
      ctx.prisma.userAccount.update({
        where: {
          userId: ctx.session.user.id,
          id,
        },
        data: {
          amount,
          name,
          type,
          description,
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
      const account = await ctx.prisma.userAccount.findFirstOrThrow({
        where: {
          id,
          userId: ctx.session.user.id,
        },
      });

      await ctx.prisma.userAccount.delete({
        where: {
          id: account.id,
        },
      });

      return {
        success: true,
      };
    }),
});
