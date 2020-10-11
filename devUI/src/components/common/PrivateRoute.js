import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({
    component: Component,
    ...rest
}) => {
    const authState = useSelector(state => state.auth);

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
    component: PropTypes.node.isRequired
});

export default PrivateRoute;
