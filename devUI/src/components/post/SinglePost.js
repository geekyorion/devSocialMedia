import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSinglePost } from '../../redux/actions/postActions';
import Spinner from '../common/Spinner';
import CommentForm from '../comment/CommentForm';
import PostItem from './PostItem';
import CommentFeed from '../comment/CommentFeed';

const SinglePost = (props) => {
    const dispatch = useDispatch();
    const { post, loading } = useSelector(state => state.post);

    useEffect(() => {
        document.title = 'Dev Social Media : Comments Section';
        const postID = props.match.params.id;
        dispatch(fetchSinglePost(postID, null, props.history));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {loading ? <Spinner /> : (
                <>
                    <Link to="/feed" className="btn btn-light btn-xs mb-3">Back to post feed</Link>
                    <PostItem post={post} showPostActions={false} />
                    <CommentForm postID={props.match.params.id} />
                    {post.comments && post.comments.length > 0 && (
                        <CommentFeed comments={post.comments} post_id={post._id} post_user_id={post.user} />
                    )}
                </>
            )}
        </>
    );
};

export default SinglePost;
