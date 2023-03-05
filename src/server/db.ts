/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-param-reassign */
import { PrismaClient } from '@prisma/client';

import { env } from '@/env.mjs';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

// eslint-disable-next-line @typescript-eslint/no-floating-promises, @typescript-eslint/require-await
(async () => {
  /** ******************************** */
  /* SOFT DELETE MIDDLEWARE */
  /** ******************************** */

  prisma.$use(async (params, next) => {
    // Check incoming query type
    if (params.model !== 'Category' && params.model !== 'SubCategory') {
      if (params.action === 'delete') {
        // Delete queries
        // Change action to an update
        params.action = 'update';
        params.args.data = { deleted: true };
      }
      if (params.action === 'deleteMany') {
        // Delete many queries
        params.action = 'updateMany';
        if (params.args.data !== undefined) {
          params.args.data.deleted = true;
        } else {
          params.args.data = { deleted: true };
        }
      }
    }
    return next(params);
  });
})();

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
