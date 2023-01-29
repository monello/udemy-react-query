import { useState } from "react";
import { useQuery } from "react-query";

import { PostDetail } from "./PostDetail";
const maxPostPage = 10;

async function fetchPosts(pageNumber) {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNumber}`
    );
    return response.json();
}

export function Posts() {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedPost, setSelectedPost] = useState(null);

    // Destructure the "data" ptoperty that gets returned from the useQuery() hook
    // There are many other properties that can be destructured.
    // See: https://react-query-v3.tanstack.com/guides/queries and https://react-query-v3.tanstack.com/reference/useQuery
    const { data, isLoading, isError, error } = useQuery(
        // Set a unique query-key for each page
        ["posts", currentPage],
        () => fetchPosts(currentPage),
        {
            staleTime: 2000,
        }
    );

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
                <button
                    disabled={currentPage <= 1}
                    onClick={() => {
                        // When setting a new state value that must be based on the previous value, use the Previous-pattern
                        // https://beta.reactjs.org/reference/react/useState#setstate
                        // https://beta.reactjs.org/reference/react/useState#updating-state-based-on-the-previous-state
                        setCurrentPage((previousValue) => previousValue - 1);
                    }}
                >
                    Previous page
                </button>
                <span>Page {currentPage}</span>
                <button
                    disabled={currentPage >= maxPostPage}
                    onClick={() => {
                        setCurrentPage((previousValue) => previousValue + 1);
                    }}
                >
                    Next page
                </button>
            </div>
            <hr />
            {selectedPost && <PostDetail post={selectedPost} />}
        </>
    );
}
