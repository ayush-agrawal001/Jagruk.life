/*
  Warnings:

  - You are about to drop the column `content` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `videos` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "content",
DROP COLUMN "images",
DROP COLUMN "title",
DROP COLUMN "videos";

-- CreateTable
CREATE TABLE "postsContent" (
    "id" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "images" TEXT[],
    "postId" TEXT NOT NULL,

    CONSTRAINT "postsContent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "postsContent" ADD CONSTRAINT "postsContent_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
