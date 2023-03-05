/*
  Warnings:

  - You are about to drop the column `deleted` on the `Budget` table. All the data in the column will be lost.
  - You are about to drop the column `deleted` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `deleted` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `deleted` on the `Income` table. All the data in the column will be lost.
  - You are about to drop the column `deleted` on the `RecurringExpense` table. All the data in the column will be lost.
  - You are about to drop the column `deleted` on the `SubCategory` table. All the data in the column will be lost.
  - You are about to drop the column `deleted` on the `Transfer` table. All the data in the column will be lost.
  - You are about to drop the column `deleted` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `deleted` on the `UserAccount` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Budget" DROP COLUMN "deleted";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "deleted";

-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "deleted";

-- AlterTable
ALTER TABLE "Income" DROP COLUMN "deleted";

-- AlterTable
ALTER TABLE "RecurringExpense" DROP COLUMN "deleted";

-- AlterTable
ALTER TABLE "SubCategory" DROP COLUMN "deleted";

-- AlterTable
ALTER TABLE "Transfer" DROP COLUMN "deleted";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "deleted";

-- AlterTable
ALTER TABLE "UserAccount" DROP COLUMN "deleted";
