'use client'

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { AuthPosts } from "../types/AuthPosts"
import EditPost from "./EditPost"

const fetchAuthPosts = async () => {
    const response = await axios.get('/api/posts/authPosts')
    return response.data
}

export default function MyPosts() {
    const{data, isLoading} = useQuery<AuthPosts>({
        queryFn: fetchAuthPosts,
        queryKey: ["auth-posts"]
    })
    if(isLoading) return <h1>Posts are Loading...</h1>
    return(
        <div>
            <div>
                {data?.posts?.map((post)=>
                <EditPost 
                    id={post.id} 
                    key={post.id} 
                    avatar={data.image}
                    title={post.title}
                    name = {data.name}
                    comments={post.comments}
                    />)}
            </div>
        </div>
    )
}

