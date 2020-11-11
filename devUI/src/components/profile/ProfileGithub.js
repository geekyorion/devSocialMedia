import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from '../../utils/utils';

const ProfileGithub = ({ username }) => {
    const options = {
        type: 'owner',      // all, owner (default), member
        sort: 'updated',    // values can be: created, updated, pushed, full_name (default)
        direction: 'asc',   // asc (default), desc
        repoCount: 5,
    }
    const [repos, setRepos] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        // using fetch API to prevent Auth Header and Token Verification
        fetch(`https://api.github.com/users/${username}/repos?per_page=${options.repoCount}&sort=${options.sort}`)
            .then(res => res.json())
            .then(repos => {
                if (repos && !isEmpty(repos.message)) {
                    setError('');
                    setRepos([]);
                } else {
                    setRepos(repos);
                }
            })
            .catch(_err => {
                setError('Unable to get GitHub repos');
                setRepos([]);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="col-12 mt-3">
            <h3 className="mb-2 text-info text-center">Latest Github Repos</h3>
            {isEmpty(repos) ? (
                <p className="text-center lead">{error || 'This user doesn’t have any public repositories yet.'}</p>
            ) : (
                    repos.map(repo => (
                        <div key={repo.id} className="card card-body mb-2">
                            <div className="row">
                                <div className="col-md-6">
                                    <h4>
                                        <a
                                            className="text-dark"
                                            href={repo.html_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {repo.name}
                                        </a>
                                    </h4>
                                    <p className="lead">
                                        {isEmpty(repo.description) ? "This repo has no description" : repo.description}
                                    </p>
                                </div>
                                <div className="col-md-6">
                                    <span className="badge badge-warning m-1">Language: {repo.language || 'Text'}</span>
                                    <span className="badge badge-dark m-1">License: {(repo.license && repo.license.name) || 'No license'}</span>
                                    <span className="badge badge-success m-1">Watchers: {repo.watchers_count}</span>
                                    <span className="badge badge-secondary m-1">Forks: {repo.forks_count}</span>
                                    <span className="badge badge-info m-1">Stars: {repo.stargazers_count}</span>
                                    <span className="badge badge-light m-1">
                                        Size: {repo.size > 1023 ? `${(repo.size / 1024).toFixed(2)} MB` : `${repo.size} KB`}
                                    </span>
                                    {repo.homepage && (<span className="badge badge-success m-1">
                                        <a
                                            href={repo.homepage}
                                            className="text-light"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Homepage
                                        </a>
                                    </span>)}
                                </div>
                            </div>
                        </div>
                    ))
                )}
        </div>
    );
};

ProfileGithub.propTypes = {
    username: PropTypes.string.isRequired,
};

export default ProfileGithub;
