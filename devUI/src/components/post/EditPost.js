import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearErrors } from '../../redux/actions/errorsAction';
import { editUserPost, fetchSinglePost, setResetText } from '../../redux/actions/postActions';
import TextAreaFieldGruop from '../common/TextAreaFieldGroup';

const EditPost = (props) => {
    const [text, setText] = useState('');

    const processing = useSelector(state => state.processing.processing);
    const post = useSelector(state => state.post.post);
    const errors = useSelector(state => state.errors);
    const resetText = useSelector(state => state.post.resetText);

    const dispatch = useDispatch();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(editUserPost({ text }, post._id, props.history));
    };

    useEffect(() => {
        setText(post.text);
    }, [post]);

    useEffect(() => {
        if (resetText) {
            dispatch(setResetText(false));
            setText('');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resetText]);

    useEffect(() => {
        document.title = 'Dev Social Media : Edit Post';
        dispatch(clearErrors());
        dispatch(fetchSinglePost(props.match.params.id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Link to="/feed" className="btn btn-light btn-xs mb-3">Back to post feed</Link>
            <div className="post-form mb-3">
                <div className="card card-info">
                    <div className="card-header bg-info text-white">
                        Edit Your Post
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleFormSubmit}>
                            <TextAreaFieldGruop
                                name="text"
                                placeholder="Edit your post"
                                value={text}
                                onChange={setText}
                                error={errors.text}
                            />
                            <button
                                type="submit"
                                className="btn btn-dark btn-sm"
                                disabled={processing}
                            >
                                Update Post
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditPost;
