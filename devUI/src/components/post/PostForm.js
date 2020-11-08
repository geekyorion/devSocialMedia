import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../../redux/actions/errorsAction';
import { addPost, setResetText } from '../../redux/actions/postActions';
import TextAreaFieldGruop from '../common/TextAreaFieldGroup';

const PostForm = () => {
    const [text, setText] = useState('');
    const processing = useSelector(state => state.processing.processing);
    const errors = useSelector(state => state.errors);
    const resetText = useSelector(state => state.post.resetText);
    const dispatch = useDispatch();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(addPost({ text }));
    };

    useEffect(() => {
        if (resetText) {
            dispatch(setResetText(false));
            setText('');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resetText]);

    useEffect(() => {
        document.title = 'Dev Social Media : Add Post';
        dispatch(clearErrors());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="post-form mb-3">
            <div className="card card-info">
                <div className="card-header bg-info text-white">
                    Create a post ...
                </div>
                <div className="card-body">
                    <form onSubmit={handleFormSubmit}>
                        <TextAreaFieldGruop
                            name="text"
                            placeholder="Create a post"
                            value={text}
                            onChange={setText}
                            error={errors.text}
                        />
                        <button
                            type="submit"
                            className="btn btn-dark btn-sm"
                            disabled={processing}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PostForm;
