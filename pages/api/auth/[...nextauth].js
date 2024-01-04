import NextAuth from "next-auth" //315.7k (gzipped: 86.9k)
import GoogleProvider from "next-auth/providers/google" //810 (gzipped: 493)
import { PrismaAdapter } from "@next-auth/prisma-adapter" //1.7k (gzipped: 679)
import prisma from '../../../prisma/client'
import { PrismaClient } from "@prisma/client"

//const prisma = new PrismaClient()

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
}

export default NextAuth(authOptions)