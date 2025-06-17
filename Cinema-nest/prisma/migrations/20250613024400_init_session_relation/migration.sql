-- CreateTable
CREATE TABLE "session" (
    "id" SERIAL NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "language" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "dataTime" TIMESTAMP(3) NOT NULL,
    "movieId" INTEGER NOT NULL,
    "theaterId" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_theaterId_fkey" FOREIGN KEY ("theaterId") REFERENCES "theater"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
