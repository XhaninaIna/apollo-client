import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER } from './GetUser';
import { GET_POSTS } from './GetPosts';
import { GET_COMMENTS } from './GetComments';
// import './User.css';  
const User = () => {
    const [userId, setUserId] = useState(1);
    const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER, {
        variables: { id: userId },
        skip: !userId,
    });
    const { loading: postsLoading, error: postsError, data: postsData } = useQuery(GET_POSTS, {
        variables: { userId },
        skip: !userId,
    });
    const { loading: commentsLoading, error: commentsError, data: commentsData } = useQuery(GET_COMMENTS, {
        variables: { userId },
        skip: !userId,
    });
    const handleInputChange = (e) => {
        const value = e.target.value;
        if (value === '' || !isNaN(value)) {
            setUserId(value === '' ? '' : parseInt(value));
        }
    };
    if (userLoading || postsLoading || commentsLoading) return <p>Loading...</p>;
    if (userError || postsError || commentsError) return <p>Error: {userError?.message || postsError?.message || commentsError?.message}</p>;
    const user = userData?.user;
    const posts = postsData?.posts;
    const comments = commentsData?.comments;

    return (
        <div>
            <h2>User Information</h2>
            <div>
                <label>
                    User ID:
                    <input
                        type="number"
                        value={userId}
                        onChange={handleInputChange}
                        min="1"
                    />
                </label>
            </div>

            {user ? (
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Posts</th>
                            <th>Comments</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                                <ul>
                                    {posts?.map((post) => (
                                        <li key={post.id}>{post.title}</li>
                                    ))}
                                </ul>
                            </td>
                            <td>
                                <ul>
                                    {comments?.map((comment) => (
                                        <li key={comment.id}>{comment.body}</li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            ) : (
                <p>No user found for this ID.</p>
            )}
        </div>
    );
};

export default User;
