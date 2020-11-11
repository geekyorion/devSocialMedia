import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
// import axios from 'axios';
import axiosAPI from '../../utils/axiosApiEndPoint';
import emitToaster from '../../utils/alert';
import { logoutUser } from '../../redux/actions/authActions';

const PrivateRoute = ({
    component: Component,
    ...rest
}) => {
    const dispatch = useDispatch();
    const authState = useSelector(state => state.auth);

    const authenticateToken = () => {
        axiosAPI
            .get('/api/user/verify')
            .then(res => {
                if (res.data.verified !== true) {
                    emitToaster({
                        toastText: "Unauthorized Access is not permitted",
                        type: 'error',
                    });
                    dispatch(logoutUser());
                }
            }).catch(_err => dispatch(logoutUser()));
    }

    useEffect(() => {
        authenticateToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Route
            {...rest}
            render={props => authState.isAuthenticated === true ? (
                <Component {...props} />
            ) : (
                    <Redirect to="login" />
                )
            }
        />
    );
}

PrivateRoute.propTypes = ({
    component: PropTypes.func.isRequired
});

export default PrivateRoute;
