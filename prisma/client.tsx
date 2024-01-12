import { PrismaClient } from "@prisma/client" //38.1k (gzipped: 14.6k)

declare global {
    namespace NodeJS{
        interface Global {}
    }
}
interface CustomNodeJSGlobal extends NodeJS.Global{
    prisma: PrismaClient
}

declare const global: CustomNodeJSGlobal

const prisma = global.prisma || new PrismaClient()

if(process.env.NODE_ENV === "development") global.prisma = prisma

export default prisma

// BELOW CODE IS WHEN THIS WAS CLIENT.JS FILE:
// const client = globalThis.prisma || new PrismaClient()
// if(process.env.NODE_ENV!== "production") globalThis.prisma = client

// export default client