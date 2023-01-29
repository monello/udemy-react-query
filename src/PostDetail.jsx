import { useQuery } from "react-query"; // <= import useQuery

async function fetchComments(postId) {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    return response.json();
}

async function deletePost(postId) {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/postId/${postId}`,
        { method: "DELETE" }
    );
    return response.json();
}

async function updatePost(postId) {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/postId/${postId}`,
        { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
    );
    return response.json();
}

export function PostDetail({ post }) {
    const { data, isLoading, isError, error } = useQuery(
        // here the query-key is an array witht he key and post-id
        // this will make a unique key that will be cached and invalidated etc as it's own unique set of data
        ["comments", post.id],
        // here we pass the post-id in to the fetch function by wrapping it inside an anonymous arrow function
        () => fetchComments(post.id)
    );

    if (isLoading) return <div>Loading ...</div>;
    if (isError)
        return (
            <>
                <h3>Something went wrong. Unable to fetch comments.</h3>
                <p>{error.toString()}</p>
            </>
        );

    return (
        <>
            <h3 style={{ color: "blue" }}>{post.title}</h3>
            <button>Delete</button> <button>Update title</button>
            <p>{post.body}</p>
            <h4>Comments</h4>
            {data.map((comment) => (
                <li key={comment.id}>
                    {comment.email}: {comment.body}
                </li>
            ))}
        </>
    );
}
