'use client'
//import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import axios from "axios"
import {useMutation, useQueryClient} from '@tanstack/react-query'

export default function CreatePost(){
    const[title,setTitle] = useState("")
    const[isDisabled, setIsDisabled] = useState(false)

    //create a post
    // const { mutate } = useMutation(
    //     async (title: void) =>await axios.post("/api/posts/addPost", {title})
    // )

    const mutationFunction = async ()=>{
        const response = await axios.post("/api/posts/addPost", {title})
        return response
    }

    const { mutate } = useMutation({mutationFn: mutationFunction});

    const submitPost = async (e:React.FormEvent) => {
        e.preventDefault()
        setIsDisabled(true)
        mutate()
        console.log('something happened')
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