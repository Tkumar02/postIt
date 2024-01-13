'use client'
import Image from "next/image"
import Link from "next/link"
import { AddComment } from "./AddComment"

export default function DisplayPosts({name, title, avatar,id,comments}){
    return(
        <div className="bg-white my-8 p-8 rounded-lg">
            <div className="flex items-center gap-2">
                <Image
                    className="rounded-full"
                    width={32}
                    height={32}
                    src={avatar}
                    alt="avatar"
                />
                <h3 className="font-bold text-gray-700">{name}</h3>
            </div>
            <div className="my-8">
                <p className="break-all">{title}</p>
            </div>
            <div>
            <Link href={`/post/${id}`}>
                    <p className="text-sm font-bold text-gray-700"> {comments?.length > 0 ? `Add a comment (${comments.length} comments)`: 'Be the first to post a Comment'}</p>
            </Link>
            </div>
        </div>
    )
}
