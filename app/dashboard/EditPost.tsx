'use client'
import Image from "next/image"
import { useState } from "react"
import Toggle from "./Toggle"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import toast from "react-hot-toast"

type EditProps={
    id: string
    avatar: string
    name: string
    title: string
    comments?: {
        id: string
        postId: string
        userId: string
    }[]
}

export default function EditPost({avatar, name, title, comments, id}:EditProps){
    const queryClient = useQueryClient()
    //toggle
    const [toggle,setToggle] = useState(false)
    let deleteToastId: string
    
    //Delete post
    const deleteMutation = async (id:string) => {
        await axios.delete('/api/posts/deletePost', {data:id})
    }
    const {mutate} = useMutation({mutationFn: deleteMutation,
        onError: (error) => {
            toast.dismiss(deleteToastId)
            toast.error('Error deleting post', {id:deleteToastId})
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries()
            toast.dismiss(deleteToastId)
            toast.success('Post successfully deleted', {id:deleteToastId})
        }
    })

    const deletePost = () => {
        deleteToastId = toast.loading('Deleting your post', {id: deleteToastId})
        mutate(id)
    }

    return(
        <>
        <div className="bg-white my-8 p-8 rounded-lg">
            <div className="flex items-centre gap-2">
                <Image width={32} height={32} src={avatar} alt='avatar' />
                <h3 className="font-bold text-gray-700">{name}</h3>
            </div>
            <div>
                <p className="break-all"></p>
            </div>
            <div className="py-6">{title}</div>
            <div className="flex items-center gap-4">
                <p className="text-sm font-bold text-gray-700">
                    {comments?.length} Comments
                </p>
                <button onClick={(e)=>{
                    setToggle(true)
                }} className="text-sm font-bold text-red-500">
                    Delete
                </button>
            </div>
        </div>
        {toggle && <Toggle deletePost={deletePost} setToggle={setToggle} />}
        </>
    )
}