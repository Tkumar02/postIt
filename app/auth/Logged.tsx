'use client'

import Image from "next/image"
import { signOut } from "next-auth/react"
import Link from "next/link"

type User = {
    image:string
}

export default function Logged({image}: User){
    return(
        <li className="flex gap-8 items-center">
            <Link href={"/dashboard"}>
                <Image className="mb-2 ml-auto mr-auto w-14 rounded-full" width={64} height={64} src={image} alt={"no image available"}/>
            </Link>
            <button onClick={()=>signOut()} className="bg-gray-700 px-6 py-2 rounded-xl text-white text-sm disabled:opacity 25">Sign Out</button>
        </li>
    )
}