import { useState } from "react";
import { useQuery } from "react-query";

import { PostDetail } from "./PostDetail";
const maxPostPage = 10;

async function fetchPosts() {
    const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=10&_page=0"
    );
    return response.json();
}

export function Posts() {
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedPost, setSelectedPost] = useState(null);

    // Destructure the "data" ptoperty that gets returned from the useQuery() hook
    // There are many other properties that can be destructured.
    // See: https://react-query-v3.tanstack.com/guides/queries and https://react-query-v3.tanstack.com/reference/useQuery
    const { data, isLoading, isError, error } = useQuery("posts", fetchPosts);

    if (isLoading) return <div>Loading ...</div>;
    if (isError)
        return (
            <>
                <h3>Something went wrong. Unable to fetch posts.</h3>
                <p>{error.toString()}</p>
            </>
        );

    return (
        <>
            <ul>
                {data.map((post) => (
                    <li
                        key={post.id}
                        className="post-title"
                        onClick={() => setSelectedPost(post)}
                    >
                        {post.title}
                    </li>
                ))}
            </ul>
            <div className="pages">
                <button disabled onClick={() => {}}>
                    Previous page
                </button>
                <span>Page {currentPage + 1}</span>
                <button disabled onClick={() => {}}>
                    Next page
                </button>
            </div>
            <hr />
            {selectedPost && <PostDetail post={selectedPost} />}
        </>
    );
}
