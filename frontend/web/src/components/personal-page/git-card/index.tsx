import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';

import '@samsite/components/personal-page/git-card/style.scss';
import {
    GitCardPropsType, GitCommitRepoPropsType, GitCommitTitlePropsType, GitCommitDescriptionPropsType,
    GitProfilePicturePropsType,
    GitUsernamePropsType
} from '@samsite/components/personal-page/git-card/types';
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

const GitProfilePicture: React.FunctionComponent<GitProfilePicturePropsType> = ({ user }) =>
    user ?
        <AsyncImage
            alt="Git avatar"
            srcProgression={[user.avatarUrl]}
            containerClass="profile-picture-container"
            imageClass="profile-picture"
        /> :
        <div className="profile-picture-container -placeholder"/>;

const GitUsername: React.FunctionComponent<GitUsernamePropsType> = ({ user }) =>
    user ?
        <div className="username">
            @{ user.username }
        </div> :
        <div className="username -placeholder" />;

const GitCommitRepo: React.FunctionComponent<GitCommitRepoPropsType> = ({ commit }) =>
    commit ?
        <div className="commit-repo">
            {commit.url.split('/')[4]}
        </div> :
        <div className="commit-repo -placeholder"/>;

const GitCommitTitle: React.FunctionComponent<GitCommitTitlePropsType> = ({ commit }) =>
    commit ?
        <div className="commit-title">{ commit.message.split('\n\n')[0] }</div> :
        <div className="commit-title -placeholder"/>;

const GitCommitDescription: React.FunctionComponent<GitCommitDescriptionPropsType> = ({ commit }) =>
    commit ?
        <div className="commit-description">
            { commit.message.split('\n\n').splice(1).join('\n\n') }
        </div> :
        <div className="commit-description -placeholder"/>;


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
            <a className="profile-link" href={ user ? user.url : '#' } >
                <GitProfilePicture user={ user }/>
                <GitUsername user={ user }/>
            </a>
            <div className="latest-commit">
                <div className="top-line">
                    <div className="top-line-title">Latest Commit:</div>
                    <GitCommitRepo commit={ latestCommit }/>
                </div>
                <div className="description">
                    <GitCommitTitle commit={ latestCommit }/>
                    <GitCommitDescription commit={ latestCommit }/>
                </div>
            </div>
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
