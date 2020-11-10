import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from '../../utils/utils';

const DeleteRecord = () => {
    const dispatch = useDispatch();
    const processing = useSelector(state => state.processing.processing);
    const deleteState = useSelector(state => state.delete);

    const handleDelete = () => {
        const param = deleteState.modalParam;
        if (isEmpty(param)) {
            dispatch(deleteState.modalFunc());
        } else {
            dispatch(deleteState.modalFunc(param));
        }
        window.$('#deleteRecord').modal('hide');
    };

    return (
        <div className="modal fade" id="deleteRecord" tabIndex="-1" aria-labelledby="deleteRecord" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="deleteRecordTitle">Delete {deleteState.modalType}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>
                            Are you sure you want to delete this {deleteState.modalType}.
                            <br />
                            This can not be undone.
                        </p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
                        <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={handleDelete}
                            disabled={processing}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteRecord;
