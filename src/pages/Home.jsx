import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center dark:bg-gradient-to-r dark:from-slate-900 dark:via-gray-800 dark:to-black">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold text-gray-800 hover:text-gray-500 dark:text-white dark:hover:text-gray-400">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

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

export default Home;
