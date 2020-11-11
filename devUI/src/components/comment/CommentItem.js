import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { initDelete } from '../../redux/actions/deleteActions';
import { deleteUserComment } from '../../redux/actions/postActions';

/**
 * post owner => can delete every post
 * comment owner => can only delete the respective comment
 */

const CommentItem = ({ comment, userID, post_id, post_user_id }) => {
    const dispatch = useDispatch();

    const commentDate = new Date(comment.date);

    const handleDelete = () => {
        dispatch(initDelete({
            modalType: 'comment',
            modalFunc: deleteUserComment,
            modalParam: { postID: post_id, commentID: comment._id }
        }));
    };

    return (
        <div class="card card-body mb-3">
            <div class="row">
                <div class="col-md-2">
                    <img
                        className="rounded-circle d-none d-md-block"
                        src={comment.avatar}
                        alt="Gravatar associated with your email"
                    />
                    <div />
                    <p className="lead text-center m-0"><strong>{comment.name}</strong></p>
                </div>
                <div class="col-md-10">
                    <div className="text-right">
                        {(userID === post_user_id || comment.user === userID) && (<button
                            type="button"
                            className="btn btn-danger mr-1 btn-sm"
                            onClick={handleDelete}
                            data-toggle="modal"
                            data-target="#deleteRecord"
                        >
                            <i className="fas fa-times" />
                        </button>)}
                    </div>
                    <p class="lead">{comment.text}</p>
                    <div className="text-right time-stamp">
                        <small className="text-muted">{commentDate.toLocaleString()}</small>
                    </div>
                </div>
            </div>
        </div>
    );
};

CommentItem.propTypes = {
    comment: PropTypes.object.isRequired,
    userID: PropTypes.string.isRequired,
    post_id: PropTypes.string.isRequired,
    post_user_id: PropTypes.string.isRequired,
};

export default CommentItem;
