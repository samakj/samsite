import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';

import '@samsite/components/personal-page/git-card/style.scss';
import { GitCardPropsType } from '@samsite/components/personal-page/git-card/types';
import { GitRepoStateType } from '@samsite/store/handlers/git/types';
import { fetchGitUser } from '@samsite/fetchers/git/users';
import { fetchGitUserRepos } from '@samsite/fetchers/git/repos';
import { fetchGitRepoCommits } from '@samsite/fetchers/git/commits';
import {
    getCardUserReposSelector,
    getCardUserSelector,
    getLatestCommitSelector
} from '@samsite/components/personal-page/git-card/selectors';
import { AsyncImage } from '@samsite/components/ui/async-image';

const DumbGitCard: React.FunctionComponent<GitCardPropsType> = ({
    username,
    user,
    repos,
    latestCommit,
    onFetchGitUser,
    onFetchGitUserRepos,
    onFetchGitRepoCommits,
}) => {
    useEffect(
        () => {
            onFetchGitUser(username);
            onFetchGitUserRepos(username);
        },
        [],
    );
    useEffect(
        () => {
            repos && Object.values(repos).forEach(
                (repo: GitRepoStateType): void => onFetchGitRepoCommits(username, repo.name)
            )
        },
        [repos ? Object.keys(repos).length : 0],
    );

    return (
        <div className="git-card">
            {
                user ?
                    <a className="profile-link" href={ user.url } >
                        <AsyncImage
                            alt="Git avatar"
                            srcProgression={[user.avatarUrl]}
                            containerClass="profile-picture-container"
                            imageClass="profile-picture"
                        />
                        <div className="username">
                            /{ user.username }
                        </div>
                    </a> :
                    <a className="profile-link" href="https://github.com/samakj">
                        <div className="profile-picture-container -placeholder" />
                        <div className="username -placeholder" />
                    </a>
            }
            {
                latestCommit && user ?
                    <div className="latest-commit">
                        <div className="top-line">
                            <div className="top-line-title">Latest Commit:</div>
                            <div className="commit-repo">
                                {latestCommit.url.replace(user.url, '').split('/')[1]}
                            </div>
                        </div>
                        <div className="description">
                            <div className="commit-title">{ latestCommit.message.split('\n\n')[0] }</div>
                            <div className="commit-description">{ latestCommit.message.split('\n\n').splice(1).join('\n\n') }</div>
                        </div>
                    </div> :
                    <div className="latest-commit">
                        <div className="top-line">
                            <div className="top-line-title -placeholder">Latest Commit:</div>
                            <div className="commit-repo -placeholder"/>
                        </div>
                        <div className="description">
                            <div className="commit-title -placeholder" />
                            <div className="commit-description -placeholder" />
                        </div>
                    </div>
            }
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    user: getCardUserSelector,
    repos: getCardUserReposSelector,
    latestCommit: getLatestCommitSelector,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            onFetchGitUser: fetchGitUser,
            onFetchGitUserRepos: fetchGitUserRepos,
            onFetchGitRepoCommits: fetchGitRepoCommits,
        },
        dispatch,
    );

export const GitCard = connect(
    mapStateToProps,
    mapDispatchToProps,
)(DumbGitCard);
