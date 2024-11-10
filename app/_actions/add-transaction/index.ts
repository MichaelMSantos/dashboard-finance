"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import {
  TransactionCategory,
  TransactionpPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { upsertTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";

interface upsertTransactionParams {
  id?: string;
  name: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  paymentMethod: TransactionpPaymentMethod;
  date: Date;
}

export const upsertTransaction = async (params: upsertTransactionParams) => {
  upsertTransactionSchema.parse(params);

  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const transactionData = { ...params, userId };

  if (params.id) {
    await db.transaction.upsert({
      where: {
        id: params.id ?? "",
      },
      update: transactionData,
      create: transactionData,
    });
  } else {
    await db.transaction.create({
      data: transactionData,
    });
  }
  revalidatePath("/transactions");
};
