'use client'

import { useState } from "react"

export function AddComment(){
    const [comment,setComment]=useState('')

    const submitComment = (e:any) => {
        e.preventDefault()
        console.log(comment)
        setComment('')
    }
    const writeComment = (e:any) => {
        setComment(e.target.value)
    }
    return(
        <div>
            <form>
                <div>
                    <textarea
                    onChange={writeComment}
                    value={comment}
                    className="bg-gray-300 p-4 my-2"
                    placeholder="Enter a comment"
                    maxLength={200}
                    />
                </div>
                <button onClick={submitComment} className="py-2 px-4 rounded-xl bg-gray-500" type="submit">Post Comment</button>
            </form>
        </div>
    )
}