'use client'
import AddPost from './components/AddPost'
import DisplayPosts from './components/DisplayPosts'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { PostType } from './types/Post'

//Fetch all posts
const allPosts = async () => {
  const response = await axios.get("/api/posts/getPost")
  return response.data
}

export default function Home() {
  const {data, error,isLoading} = useQuery<PostType[]>({
    queryFn: allPosts, 
    queryKey: ["posts"]
  })
  if(error) return error
  if (isLoading) return "Loading ..."
  //console.log(data,'main page')
  return (
    <main>
      <AddPost/>
      {data?.map((post)=>
        <DisplayPosts 
        comments = {post.comments}
        key={post.id} 
        name={post.user.name} 
        title={post.title} 
        avatar={post.user.image}
        id={post.id}/>
      )}
    </main>
  )
}
