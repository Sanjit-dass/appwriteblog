import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <div className='w-full py-8 dark:bg-gradient-to-r dark:from-slate-900 dark:via-gray-800 dark:to-black'>
      <Container>
        <div className='flex flex-wrap -mx-2'>
          {posts.map((post) => (
            <div
              key={post.$id}
              className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2'
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
