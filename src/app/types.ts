import { prisma } from "@/lib/db";

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

export type Voter = NonNullable<UnwrapPromise<ReturnType<typeof prisma.voter.findFirst>>>;

export type AuthObject = {
  message: string,
  signature: string,
  walletAddress: string,
}
