/*
  Warnings:

  - You are about to drop the column `title` on the `postsContent` table. All the data in the column will be lost.
  - Added the required column `title` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "postsContent" DROP COLUMN "title",
ADD COLUMN     "link" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "content" SET DEFAULT '',
ALTER COLUMN "images" SET NOT NULL,
ALTER COLUMN "images" SET DEFAULT '',
ALTER COLUMN "images" SET DATA TYPE TEXT;
