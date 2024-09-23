import React, { useState, useEffect, useRef } from 'react';

function SocialMediaFeed() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const postsContainerRef = useRef(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const response = await fetch(`/api/posts?page=${page}`);
      const data = await response.json();
      setPosts([...posts, ...data.posts]);
      setIsLoading(false);
    };

    fetchPosts();

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = postsContainerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        setPage(page + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [posts, page]);

  return (
    <div ref={postsContainerRef}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      {isLoading && <Spinner />}
    </div>
  );
}
