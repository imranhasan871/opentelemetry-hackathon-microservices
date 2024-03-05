/*
  Warnings:

  - Added the required column `total` to the `line_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "line_items" ADD COLUMN     "total" DOUBLE PRECISION NOT NULL;
