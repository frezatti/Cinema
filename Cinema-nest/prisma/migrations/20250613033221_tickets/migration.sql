-- CreateTable
CREATE TABLE "ticket" (
    "id" SERIAL NOT NULL,
    "customerName" TEXT NOT NULL,
    "cpf" TEXT,
    "seat" TEXT NOT NULL,
    "paymentType" TEXT NOT NULL,
    "purchaseDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sessionId" INTEGER NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "ticket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ticket_cpf_key" ON "ticket"("cpf");

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
