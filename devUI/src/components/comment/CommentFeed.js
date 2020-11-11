import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import CommentItem from './CommentItem';

const CommentFeed = ({ comments, post_id, post_user_id }) => {
    const userID = useSelector(state => state.auth.user.id);

    return (
        <div className="comments">
            {comments.map(comment => (
                <CommentItem
                    key={comment._id}
                    comment={comment}
                    post_id={post_id}
                    userID={userID}
                    post_user_id={post_user_id}
                />
            ))}
        </div>
    );
};

CommentFeed.propTypes = {
    comments: PropTypes.array.isRequired,
    post_id: PropTypes.string.isRequired,
    post_user_id: PropTypes.string.isRequired,
};

export default CommentFeed;
