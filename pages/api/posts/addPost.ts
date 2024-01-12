import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from '../../../prisma/client'
import { MySession } from "@/app/interfaces/Session";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.method === "POST") {
        const session = (await getServerSession (req,res,authOptions)) as MySession
        if(!session){
            console.log('Please sign in to create a title for your post')
            return res.status(401).json({message:'Please sign in to make a post'})
        }
        
        const title:string = req.body.title

        //Get User
        const prismaUser = await prisma.user.findUnique({
            where: {email: session?.user?.email},
        })

        //check title
        if(title.length > 300){
            return res.status(403).json({message: 'Your title exceeds 300 characters'})
        }
        if(title.length<=0){
            return res.status(403).json({message:'Title cannot be empty'})
        }
        console.log(req.body)

        try{
            const result = await prisma.post.create({
                data: {
                    title,
                    userId:prismaUser.id,
                },
            })
            res.status(200).json(result)
        } catch (err) {
            res.status(403).json({err: 'Error has occurred whilst making a post'})
        }
    }
}
