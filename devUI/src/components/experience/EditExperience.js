import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearErrors } from '../../redux/actions/errorsAction';
import { updateExperience } from '../../redux/actions/profileActions';
import ExperienceForm from './ExperienceForm';
import { isEmpty, setDateFormat } from '../../utils/utils';
import emitToaster from '../../utils/alert';

const initialState = {
    company: '',
    current: false,
    disabled: false,
    description: '',
    from: '',
    location: '',
    title: '',
    to: '',
};

const EditExperience = (props) => {
    const [state, setState] = useState(initialState);
    const locationState = props.location.state || {};
    const [experience] = useState(locationState.experience || {});
    const dispatch = useDispatch();

    const errors = useSelector(state => state.errors);
    const processing = useSelector(state => state.processing.processing);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const data = {
            company: state.company,
            current: state.current,
            description: state.description,
            from: state.from,
            location: state.location,
            title: state.title,
            to: state.to,
            id: experience._id,
        };
        dispatch(updateExperience(data, props.history));
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

    const setExperienceFields = () => {
        setState({
            company: experience.company,
            current: experience.current,
            disabled: experience.current,
            description: experience.description,
            from: setDateFormat(new Date(experience.from)),
            location: experience.location,
            title: experience.title,
            to: isEmpty(experience.to)
                ? ''
                : (experience.current
                    ? ''
                    : setDateFormat(new Date(experience.to))),
        });
    };

    useEffect(() => {
        document.title = 'Dev Social Media : Edit Experience';
        if (isEmpty(experience)) {
            emitToaster({
                toastText: 'You can not edit an empty experience detail',
                type: 'warning'
            });
            props.history.push('/dashboard');
            return;
        }
        setExperienceFields();
        dispatch(clearErrors());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="section edit-experience">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <Link to="/dashboard" className="btn btn-light btn-xs">Go Back</Link>
                        <h1 className="display-4 text-center">Update an Experience</h1>
                        <p className="lead text-center">Keep your profile updated for a better growth</p>
                        <small className="d-block pb-3">* = required field</small>
                        <ExperienceForm
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

export default EditExperience;
