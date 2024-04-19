-- CreateTable
CREATE TABLE "Pedido" (
    "id" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "cycle" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL DEFAULT 'Brinde',
    "valueUnit" TEXT NOT NULL DEFAULT '',
    "pedidoId" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
