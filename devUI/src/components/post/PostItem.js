import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addPostLike, deleteUserPost, removePostLike } from '../../redux/actions/postActions';
import { initDelete } from '../../redux/actions/deleteActions';

const PostItem = ({ post, userID, showPostActions }) => {
    const dispatch = useDispatch();

    const postDate = new Date(post.date);

    const handleDelete = () => {
        dispatch(initDelete({
            modalType: 'post',
            modalFunc: deleteUserPost,
            modalParam: post._id
        }));
    };

    return (
        <div className="card card-body mb-3">
            <div className="row">
                <div className="col-md-2">
                    <img
                        className="rounded-circle d-none d-md-block"
                        src={post.avatar}
                        alt="Gravatar associated with your email"
                    />
                    <div />
                    <p className="text-center lead m-0"><strong>{post.name}</strong></p>
                </div>
                <div className="col-md-10">
                    {showPostActions && (
                        <div className="m-1 text-right">
                            <button
                                type="button"
                                className="btn btn-light btn-sm mr-1"
                                data-toggle="tooltip"
                                title="Like"
                                onClick={() => dispatch(addPostLike(post._id))}
                            >
                                {/* added separate icon with key to handle fontAwesomeIssue with react */}
                                {post.likes.filter(like => like.user === userID).length > 0
                                    ? <span key="liked"><i className="text-success fas fa-thumbs-up"></i></span>
                                    : <span key="not-liked"><i className="text-secondary fas fa-thumbs-up"></i></span>}
                                <span className="badge badge-light">{post.likes.length}</span>
                            </button>
                            <button
                                type="button"
                                className="btn btn-light btn-sm mr-1"
                                data-toggle="tooltip"
                                title="Unlike"
                                onClick={() => dispatch(removePostLike(post._id))}
                            >
                                <i className="text-secondary fas fa-thumbs-down"></i>
                            </button>
                            <Link
                                to={`/post/${post._id}`}
                                className="btn btn-dark mr-1 btn-sm"
                                data-toggle="tooltip"
                                title="Comments"
                            >
                                <i className="text-light fas fa-comments"></i>
                                <span className="badge badge-dark"> {post.comments.length}</span>
                            </Link>
                            <Link
                                to={`/edit-post/${post._id}`}
                                className="btn btn-dark mr-1 btn-sm"
                                data-toggle="tooltip"
                                title="Edit"
                            >
                                <i className="text-light far fa-edit"></i>
                            </Link>
                            {(userID === post.user) && (
                                <button
                                    type="button"
                                    className="btn btn-danger mr-1 btn-sm"
                                    onClick={handleDelete}
                                    data-toggle="modal"
                                    data-target="#deleteRecord"
                                >
                                    <i className="fas fa-times" />
                                </button>
                            )}
                        </div>
                    )}
                    <p className="lead">{post.text}</p>
                    <div className="text-right time-stamp">
                        <small className="text-muted">{postDate.toLocaleString()}</small>
                    </div>
                </div>
            </div>
        </div>
    );
};

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    userID: PropTypes.string,
    showPostActions: PropTypes.bool,
}

PostItem.defaultProps = {
    showPostActions: true,
}

export default PostItem;
