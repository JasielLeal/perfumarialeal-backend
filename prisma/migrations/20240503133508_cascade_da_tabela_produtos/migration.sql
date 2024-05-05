-- DropForeignKey
ALTER TABLE "Pedido" DROP CONSTRAINT "Pedido_userId_fkey";

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
