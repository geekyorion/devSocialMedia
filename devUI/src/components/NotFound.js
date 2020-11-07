import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="row pt-5">
            <div className="col-10 m-auto text-center">
                <h2 className="display-4">4 0 4</h2>
                <div className="logo-404 display-5">
                    <p>
                        ....-
                        {' '}
                        -----
                        {' '}
                        ....-
                    </p>
                </div>
                <p className="lead mb-5">
                    Oh! You are finally here, but sadly you won't be able to find any developer here.
                    <br />
                    Being an introvert <strong>404 page</strong>, I would like to be alone and
                    requesting you to click on the below button to be around developers.
                </p>
                <Link to="/profiles" className="btn btn-dark btn">View All Profiles</Link>
            </div>
        </div>
    );
};

export default NotFound;
