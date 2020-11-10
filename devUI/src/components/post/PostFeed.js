import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import PostItem from './PostItem';

const PostFeed = ({ posts }) => {
    const user = useSelector(state => state.auth.user);

    return (
        <div className="posts">
            {posts.length > 0 ? (
                posts.map(post => <PostItem key={post._id} post={post} userID={user.id} />)
            ) : (
                    <div className="card card-body mb-3">
                        Post(s) are not available
                    </div>
                )
            }
        </div>
    );
};

PostFeed.propTypes = {
    posts: PropTypes.array.isRequired,
}

export default PostFeed;
