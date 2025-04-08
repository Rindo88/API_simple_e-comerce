/*
  Warnings:

  - You are about to drop the column `userId` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `sellerId` on the `Product` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - Added the required column `username` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usernameCustomer` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usernameSeller` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_userId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_sellerId_fkey";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "userId",
ADD COLUMN     "username" TEXT NOT NULL,
ALTER COLUMN "street" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "customerId",
ADD COLUMN     "usernameCustomer" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "sellerId",
ADD COLUMN     "usernameSeller" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ALTER COLUMN "email" DROP NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("username");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_usernameSeller_fkey" FOREIGN KEY ("usernameSeller") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_usernameCustomer_fkey" FOREIGN KEY ("usernameCustomer") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
