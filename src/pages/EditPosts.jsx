import React, { use } from 'react'
import { useState, useEffect } from 'react'
import { Container, PostForm } from '../components'
import service from '../appwrite/config'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'



function EditPosts() {
    const [post, setPost] = useState(null)
    const {slug}=useParams()
    const navigate=useNavigate()

    useEffect(()=>{
        if(slug){
        service.getPost(slug)
        .then((post)=>{
            if(post){
                setPost(post)
            } else {
                navigate('/')
            }
        })

        }
       
    }, [slug, navigate])
   
  return  post ?(
    <div className='py-10 dark:bg-gradient-to-r dark:from-slate-900 dark:via-gray-800 dark:to-black'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPosts