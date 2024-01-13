'use client'
import { AddComment } from "@/app/components/AddComment"
import DisplayPosts from "@/app/components/DisplayPosts"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

type URL = {
    params: {
        slug:string
    }
}

const fetchDetails = async (slug:string) => {
    const response = await axios.get(`/api/posts/${slug}`)
    return response.data
}

export default function PostDetail(url:URL){
    const{data,isLoading} = useQuery({
        queryKey: ['detail-post'],
        queryFn: () => fetchDetails(url.params.slug),
    })
    if(isLoading) return 'Loading...'
    //console.log(data,'slug page')
    return(
        <div>
            <DisplayPosts 
                id={data.id} 
                name={data.user.name} 
                title={data.title} 
                avatar={data.user.image} 
                comments={data.comments}>
            </DisplayPosts>
            <AddComment id={data?.id}></AddComment>
        </div>
    )
}