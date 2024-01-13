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
            return res.status(401).json({message:'Please sign in to make a post'})
        }
        
        const comment:string = req.body.title

        //Get User
        const prismaUser = await prisma.user.findUnique({
            where: {email: session?.user?.email},
        })

        //console.log(req.body),'from addPosts.ts'

        try{
            const {comment, postId} = req.body.data
            if(comment.length > 100){
                return res.status(403).json({message: 'Your comment exceeds 100 characters'})
            }
            if(!comment.length){
                return res.status(403).json({message:'Comment cannot be empty'})
            }
            const result = await prisma.comment.create({
                data:{
                    content: comment,
                    userId: prismaUser?.id,
                    postId
                }
            })
            res.status(200).json(result)
        } catch (err) {
            res.status(403).json({err: 'Error has occurred whilst submitting a comment'})
        }
    }
}
