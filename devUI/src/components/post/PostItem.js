import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PostItem = ({ post, userID }) => {
    return (
        <div class="card card-body mb-3">
            <div class="row">
                <div class="col-md-2">
                    <img
                        class="rounded-circle d-none d-md-block"
                        src={post.avatar}
                        alt="Gravatar associated with your email"
                    />
                    <br />
                    <p class="text-center lead text-strong m-0"><strong>{post.name}</strong></p>
                </div>
                <div class="col-md-10">
                    <div class="m-1 text-right">
                        <button type="button" class="btn btn-light btn-sm mr-1">
                            <i class="text-info fas fa-thumbs-up"></i>
                            <span class="badge badge-light">{post.likes.length}</span>
                        </button>
                        <Link to={`/post/:${post._id}`} class="btn btn-info mr-1 btn-sm">
                            Comments
                        </Link>
                        {(userID === post.user) && (<button type="button" class="btn btn-danger mr-1 btn-sm">
                            <i class="fas fa-times" />
                        </button>)}
                    </div>
                    <p class="lead">{post.text}</p>
                </div>
            </div>
        </div>
    );
};

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    userID: PropTypes.string.isRequired,
}

export default PostItem;
