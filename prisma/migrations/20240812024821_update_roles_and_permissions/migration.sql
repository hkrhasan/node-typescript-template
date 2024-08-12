/*
  Warnings:

  - You are about to drop the column `action` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `resource` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `parentRoleId` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the `UserRole` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_parentRoleId_fkey";

-- DropForeignKey
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_roleId_fkey";

-- DropForeignKey
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_userId_fkey";

-- AlterTable
ALTER TABLE "Permission" DROP COLUMN "action",
DROP COLUMN "resource",
ADD COLUMN     "attributes" JSONB;

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "parentRoleId",
ADD COLUMN     "attributes" JSONB;

-- AlterTable
ALTER TABLE "RolePermission" ADD COLUMN     "attributes" JSONB;

-- DropTable
DROP TABLE "UserRole";

-- CreateTable
CREATE TABLE "Resources" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "attributes" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Resources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoleUsers" (
    "id" SERIAL NOT NULL,
    "roleId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "attributes" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoleUsers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Resources_name_key" ON "Resources"("name");

-- AddForeignKey
ALTER TABLE "RoleUsers" ADD CONSTRAINT "RoleUsers_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoleUsers" ADD CONSTRAINT "RoleUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
