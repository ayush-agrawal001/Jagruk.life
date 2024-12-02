/*
  Warnings:

  - The `likesOnComments` column on the `comments` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `socialMedia` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "comments" DROP COLUMN "likesOnComments",
ADD COLUMN     "likesOnComments" TEXT[];

-- AlterTable
ALTER TABLE "users" DROP COLUMN "socialMedia",
ADD COLUMN     "socialMedia" TEXT[];
