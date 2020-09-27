import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getCurrentProfile } from '../../redux/actions/profileActions';

const Dashboard = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentProfile());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}

export default Dashboard;
