import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostForm from './PostForm';
import Spinner from '../common/Spinner';
import { getAllPosts, getUserPosts } from '../../redux/actions/postActions';
import PostFeed from './PostFeed';

const Posts = () => {
    const dispatch = useDispatch();

    const { loading, posts } = useSelector(state => state.post);
    const processing = useSelector(state => state.processing.processing);

    const [userPost, setUserPost] = useState(false);

    useEffect(() => {
        if (userPost) {
            dispatch(getUserPosts());
        } else {
            dispatch(getAllPosts());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userPost]);

    useEffect(() => {
        document.title = 'Dev Social Media : Feed';
        dispatch(getAllPosts());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="feed">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <PostForm />
                        <div className="my-post">
                            <div className="form-check mb-4">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="current"
                                    value={userPost}
                                    onChange={(e) => setUserPost(e.target.checked)}
                                    checked={userPost}
                                    id="user-post"
                                    disabled={processing}
                                />
                                <label className="form-check-label" htmlFor="user-post">
                                    Check this to display only your posts
                                </label>
                            </div>
                        </div>
                        <div className="div-relative">
                            {loading ? <Spinner position="absolute" /> : <PostFeed posts={posts} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Posts;
