import React from 'react';

import '@samsite/components/projects-page/project-card/style.scss';
import { ProjectCardPropsType } from '@samsite/components/projects-page/project-card/types';

const stringToClassName = (s: string): string => s.replace(' ', '-').toLowerCase();

export const ProjectCard: React.FunctionComponent<ProjectCardPropsType> = ({ project }) => {
    return (
        <div className="project">
            <div className="name-grid">
                <div className={`state -${stringToClassName(project.state)}`}>{project.state}</div>
                <div className="name">{project.name}</div>
            </div>
            <ul className="keywords">{
                project.keywords.map(
                    (keyword: string, index: number) => (
                        <li className={`keyword -${stringToClassName(keyword)}`} key={index}>
                            {keyword}
                        </li>
                    ),
                )
            }</ul>
            <div className="description">{project.description}</div>
            {
                project.todos && project.todos.length && (
                    <>
                        <div className="todos-title">Todo:</div>
                        <ul className="todos">{
                            project.todos && project.todos.map(
                                (todo: string, index: number) => (
                                    <li className="todo" key={index}>
                                        {todo}
                                    </li>
                                ),
                            )
                        }</ul>
                    </>
                )
            }
        </div>
    );
};
