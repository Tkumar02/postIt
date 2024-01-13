'use client'

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import toast from "react-hot-toast"

type PostProps = {
    id?: string
}

type Comment = {
    postId?: string
    comment: string
}

export function AddComment({id}: PostProps){
    const [comment,setComment]=useState('')
    const [isDisabled, setIsDisabled] = useState(false)
    let commentPostToast: string;

    const queryClient = useQueryClient()

    const commentMutation = async(data: Comment) =>{
        await axios.post("/api/posts/addComment",{data})
    }

    const {mutate} = useMutation({mutationFn: commentMutation,
        onSuccess: data=>{
            setComment('')
            setIsDisabled(false)
            toast.dismiss(commentPostToast)
            toast.success('Comment posted successfully',{id:commentPostToast})
        },
        onError: error=> {
            setIsDisabled(false)
            toast.dismiss(commentPostToast)
            toast.error('Error posting comment', {id: commentPostToast})
        }
    })

    const submitComment = async (e:React.FormEvent) => {
        e.preventDefault()
        setIsDisabled(true)
        commentPostToast = toast.loading('Adding comment', {id: commentPostToast})
        mutate({comment, postId:id})
    }

    return(
        <div>
            <form onSubmit={submitComment} className="my-8">
                <h3>Add a Comment</h3>
                <div>
                    <textarea
                    onChange={(e)=>setComment(e.target.value)}
                    value={comment}
                    className="bg-gray-300 p-4 my-2"
                    placeholder="Enter a comment"
                    maxLength={200}
                    />
                </div>
                <div className="flex items=center gap-2">
                    <button
                        disabled={isDisabled}
                        className="text-sm bg-teal-500 text-white py-2 px-6 rounded-md"
                        type="submit">
                            Add a comment
                    </button>
                    <p
                        className={`font-bold ${comment.length>100 ? "text-red-700" : "text-gray-700"}`}>
                            {`${comment.length}/100`}
                        </p>
                </div>
            </form>
        </div>
    )
}