import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserProfile } from '../../redux/actions/profileActions';
import TextFieldGroup from '../common/TextFieldGroup';

const DeleteProfile = () => {
    const dispatch = useDispatch();
    const usernameState = useSelector(state => state.auth.user.name);
    const [username, setUsername] = useState('');

    const handleDeleteProfile = () => {
        dispatch(deleteUserProfile());
        // handle modal hide event manually
        window.$('#deleteProfileModal').modal('hide');
    }

    return (
        <div className="mt-3">
            <button
                type="button"
                className="btn btn-danger"
                data-toggle="modal"
                data-target="#deleteProfileModal"
            >
                Delete Account
            </button>

            <div
                className="modal fade"
                id="deleteProfileModal"
                tabIndex="-1"
                aria-labelledby="deleteProfileModal"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Delete Account</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p className="lead">
                                This action can not be undone and will <strong>delete </strong>
                                your DevSocialMedia account
                                <br /><br />
                                <strong>Note: </strong>
                                This will not delete your comments and posts as they might be useful for other developers.
                                If you want to delete those, you need to do that manually.
                            </p>
                            <br />
                            Type your name (<strong>{usernameState}</strong>) to proceed.
                            <TextFieldGroup
                                value={username}
                                onChange={setUsername}
                                name="deleteUserAccount"
                                info="Case sensitive field"
                                placeholder={usernameState}
                            />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light" data-dismiss="modal">Cancel</button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                disabled={username !== usernameState}
                                onClick={handleDeleteProfile}
                            >
                                Yes, Delete My Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DeleteProfile;
