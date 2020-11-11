import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, setResetText } from '../../redux/actions/postActions';
import TextAreaFieldGruop from '../common/TextAreaFieldGroup';

const CommentForm = ({ postID }) => {
    const [text, setText] = useState('');
    const processing = useSelector(state => state.processing.processing);
    const errors = useSelector(state => state.errors);
    const resetText = useSelector(state => state.post.resetText);
    const dispatch = useDispatch();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(addComment({ text }, postID));
    };

    useEffect(() => {
        if (resetText) {
            dispatch(setResetText(false));
            setText('');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resetText]);

    return (
        <div className="post-form mb-3">
            <div className="card card-info">
                <div className="card-header bg-info text-white">
                    Add a comment
                </div>
                <div className="card-body">
                    <form onSubmit={handleFormSubmit}>
                        <TextAreaFieldGruop
                            name="text"
                            placeholder="Reply to post"
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

CommentForm.propTypes = {
    postID: PropTypes.string.isRequired,
};

export default CommentForm;
