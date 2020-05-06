import React, { CSSProperties, useEffect, useState } from 'react';

import '@samsite/components/projects-page/project-card/style.scss';
import { ProjectCardPropsType } from '@samsite/components/projects-page/project-card/types';
import Timeout = NodeJS.Timeout;
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getCardRepoSelector } from '@samsite/components/projects-page/project-card/selectors';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchGitRepo, fetchGitUserRepos } from '@samsite/fetchers/git/repos';
import { AsyncImage } from '@samsite/components/ui/async-image';

const stringToClassName = (s: string): string => s.replace(' ', '-').toLowerCase();

const DumbProjectCard: React.FunctionComponent<ProjectCardPropsType> = ({
    project,
    visible,
    repo,
    onFetchGitRepo,
}) => {
    const [animationClass, updateAnimationClass] = useState('fade-in');
    const [animationTimeout, updateAnimationTimeout] = useState<number>();
    const [animationStyle, updateAnimationStyle] = useState<CSSProperties>({});

    useEffect(
        () => {
            project.gitRepoId && onFetchGitRepo(project.gitRepoId);
        },
        [],
    );

    useEffect(
        () => {
            const newClassName = visible ? 'fade-in' : 'fade-out';

            if (newClassName !== animationClass) {
                clearTimeout(animationTimeout);
                updateAnimationClass(newClassName);
                updateAnimationTimeout(
                    setTimeout(
                        () => {
                            updateAnimationStyle(visible ? {} : { display: 'none' });
                        },
                        visible ? 0 : 300,
                    ),
                );
            }

            return () => clearTimeout(animationTimeout);
        },
        [visible],
    );

    return (
        <div className={`project -${animationClass}`} style={animationStyle}>
            {repo && (
                <a href={repo.url} className="github-link" target="_blank">
                    <AsyncImage alt="Github" srcProgression={['/static/svg/github.svg']} />
                </a>
            )}
            <div className="name-grid">
                <div className={`state -${stringToClassName(project.state)}`}>{project.state}</div>
                <div className="name">{project.name}</div>
            </div>
            <ul className="keywords">
                {project.keywords.map((keyword: string, index: number) => (
                    <li className={`keyword -${stringToClassName(keyword)}`} key={index}>
                        {keyword}
                    </li>
                ))}
            </ul>
            <div className="description">{project.description}</div>
            {project.todos && project.todos.length && (
                <>
                    <div className="todos-title">Todo:</div>
                    <ul className="todos">
                        {project.todos &&
                            project.todos.map((todo: string, index: number) => (
                                <li className="todo" key={index}>
                                    {todo}
                                </li>
                            ))}
                    </ul>
                </>
            )}
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    repo: getCardRepoSelector,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            onFetchGitRepo: fetchGitRepo,
        },
        dispatch,
    );

export const ProjectCard = connect(
    mapStateToProps,
    mapDispatchToProps,
)(DumbProjectCard);
