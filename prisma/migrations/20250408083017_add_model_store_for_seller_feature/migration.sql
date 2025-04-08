/*
  Warnings:

  - You are about to drop the column `usernameSeller` on the `Product` table. All the data in the column will be lost.
  - Added the required column `storeId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_username_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_usernameSeller_fkey";

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "username" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "usernameSeller",
ADD COLUMN     "storeId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Store" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "logoUrl" TEXT,
    "bannerUrl" TEXT,
    "contact" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sellerUsername" TEXT NOT NULL,
    "addressId" INTEGER,
    "totalProducts" INTEGER DEFAULT 0,
    "totalSales" INTEGER DEFAULT 0,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Store_name_key" ON "Store"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Store_sellerUsername_key" ON "Store"("sellerUsername");

-- CreateIndex
CREATE UNIQUE INDEX "Store_addressId_key" ON "Store"("addressId");

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_sellerUsername_fkey" FOREIGN KEY ("sellerUsername") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
