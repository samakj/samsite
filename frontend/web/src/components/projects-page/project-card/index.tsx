import React, { CSSProperties, useEffect, useState } from 'react';

import '@samsite/components/projects-page/project-card/style.scss';
import { ProjectCardPropsType } from '@samsite/components/projects-page/project-card/types';
import Timeout = NodeJS.Timeout;

const stringToClassName = (s: string): string => s.replace(' ', '-').toLowerCase();

export const ProjectCard: React.FunctionComponent<ProjectCardPropsType> = ({
    project,
    visible,
}) => {
    const [animationClass, updateAnimationClass] = useState('fade-in');
    const [animationTimeout, updateAnimationTimeout] = useState<number>();
    const [animationStyle, updateAnimationStyle] = useState<CSSProperties>({});

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
