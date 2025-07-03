import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "~/generated/prisma";
import { openAPI } from "better-auth/plugins"

// If your Prisma file is located elsewhere, you can change the path
// import { PrismaClient } from "@prisma/client"; // Uncomment if using Prisma Client directly 
const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
    },
    advanced: {
    generateId: () => crypto.randomUUID(), // Use crypto instead of file-based ID generation
  },
  // Use environment variables for configuration instead of file paths
  secret: process.env.AUTH_SECRET,
    plugins: [
        openAPI(),
    ]
});