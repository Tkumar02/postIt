'use client'
//import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import axios, { AxiosError } from "axios"
import {useMutation, useQueryClient} from '@tanstack/react-query'
import toast from "react-hot-toast"

export default function CreatePost(){
    const[title,setTitle] = useState("");
    const[isDisabled, setIsDisabled] = useState(false);
    let toastPostId: string;

    //create a post
    // const { mutate } = useMutation(
    //     async (title: void) =>await axios.post("/api/posts/addPost", {title})
    // )

    const mutationFunction = async (): Promise<void> =>{
        try{
            const response = await axios.post("/api/posts/addPost", {title});
            setTitle('')
            setIsDisabled(false)
            toast.dismiss(toastPostId)
            toast.success('Post has been made',{id: toastPostId})
            //return response
        } catch (error:any) {
            console.error(error);
            toast.dismiss(toastPostId)
            toast.error(error?.response?.data.message, {id: toastPostId})
            setIsDisabled(false)
            throw error;
        }
    }

        const { mutate } = useMutation({mutationFn: mutationFunction});
    // const { mutate } = useMutation({mutationFn: mutationFunction,
    //                     onSuccess: ()=>{
    //                         toast.success('Post created!', {id:toastPostId})
    //                     },
    //                     onError:(error)=>{
    //                         if (error instanceof AxiosError)
    //                         toast.error(error?.response?.data.message,{id:toastPostId})
    //                         console.log('this first?')
    //                     }});

    const submitPost = async (e:React.FormEvent) => {
        e.preventDefault()
        toastPostId = toast.loading('Creating Post', {id:toastPostId})
        setIsDisabled(true)
        mutate()
        console.log('something happened')
        return
    }

    

    return(
        <form onSubmit={submitPost} className="bg-white my-8 p-8 rounded-md">
            <div className="flex flex-col my-4">
                <textarea 
                    onChange={(e)=>setTitle(e.target.value)} 
                    name="title" 
                    placeholder="what's on your mind" 
                    value={title}
                    className="p-4 text-lg rounded-md my-2 bg-gray-200"
                    ></textarea>
            </div>
            <div className="flex items-center justify-between gap-2">
                <p className={`fontbold text-sm ${title.length>300 ? "text-red-700" : "text-black-700"}`}>{`${title.length}/300`}</p>
                <button
                    disabled={isDisabled}
                    className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
                    type="submit"
                >Create a Post Now!</button>
            </div>
        </form>
    )
}
