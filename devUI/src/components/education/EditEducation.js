import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearErrors } from '../../redux/actions/errorsAction';
import { updateEducation } from '../../redux/actions/profileActions';
import EducationForm from './EducationForm';
import { isEmpty, setDateFormat } from '../../utils/utils';
import emitToaster from '../../utils/alert';

const initialState = {
    current: false,
    degree: '',
    description: '',
    fieldOfStudy: '',
    from: '',
    school: '',
    to: '',
    disabled: false,
};

const EditEducation = (props) => {
    const [state, setState] = useState(initialState);
    const locationState = props.location.state || {};
    const [education] = useState(locationState.education || {});
    const dispatch = useDispatch();

    const errors = useSelector(state => state.errors);
    const processing = useSelector(state => state.processing.processing);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const data = {
            current: state.current,
            degree: state.degree,
            description: state.description,
            fieldOfStudy: state.fieldOfStudy,
            from: state.from,
            school: state.school,
            to: state.to,
            id: education._id,
        };
        dispatch(updateEducation(data, props.history));
    };

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const handleCheck = (e) => {
        setState({
            ...state,
            current: !state.current,
            disabled: !state.disabled
        });
    };

    const setEducationFields = () => {
        setState({
            current: education.current,
            degree: education.degree,
            disabled: education.current,
            description: education.description,
            fieldOfStudy: education.fieldOfStudy,
            from: setDateFormat(new Date(education.from)),
            school: education.school,
            to: isEmpty(education.to)
                ? ''
                : (education.current
                    ? ''
                    : setDateFormat(new Date(education.to))),
        });
    };

    useEffect(() => {
        document.title = 'Dev Social Media : Edit Education';
        if (isEmpty(education)) {
            emitToaster({
                toastText: 'You can not edit an empty education detail',
                type: 'warning'
            });
            props.history.push('/dashboard');
            return;
        }
        setEducationFields();
        dispatch(clearErrors());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="section edit-education">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <Link to="/dashboard" className="btn btn-light btn-xs">Go Back</Link>
                        <h1 className="display-4 text-center">Update an Education</h1>
                        <p className="lead text-center">Keep your profile updated for a better growth</p>
                        <small className="d-block pb-3">* = required field</small>
                        <EducationForm
                            errors={errors}
                            handleFormSubmit={handleFormSubmit}
                            handleChange={handleChange}
                            handleCheck={handleCheck}
                            processing={processing}
                            state={state}
                            type="Update"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default EditEducation;
