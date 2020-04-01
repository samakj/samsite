import React, { useState } from 'react';

import { HeaderPropsType } from './types';
import './style.scss';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

const DumbHeader: React.FunctionComponent<HeaderPropsType> = ({ onNavigate }) => {
    const navigateHome = (): void => onNavigate('/');
    const navigatePersonal = (): void => onNavigate('/personal/');
    const navigateDigitalCv = (): void => onNavigate('/digital-cv/');
    const navigateProjects = (): void => onNavigate('/projects/');

    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const toggleMobileNav = (): void => setMobileNavOpen(!mobileNavOpen);

    return (
        <header className="main-header">
            <div className="page-width-wrapper">
                <span className="name" onClick={navigateHome}>
                    Sam Jones
                </span>
                <nav className="main-navigation">
                    <ul className="nav-list">
                        <li className="nav-item" onClick={navigatePersonal}>
                            Personal
                        </li>
                        <li className="nav-item" onClick={navigateDigitalCv}>
                            Digital CV
                        </li>
                        <li className="nav-item" onClick={navigateProjects}>
                            Projects
                        </li>
                    </ul>
                </nav>
                <img
                    className="mobile-nav-icon"
                    src="/static/svg/menu.svg"
                    alt="Open Menu"
                    onClick={toggleMobileNav}
                />
                <nav className={`mobile-navigation -${mobileNavOpen ? 'open' : 'closed'}`}>
                    <ul className="nav-list">
                        <li className="nav-item" onClick={navigatePersonal}>
                            Personal
                        </li>
                        <li className="nav-item" onClick={navigateDigitalCv}>
                            Professional
                        </li>
                        <li className="nav-item" onClick={navigateProjects}>
                            Projects
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            onNavigate: push,
        },
        dispatch,
    );

export const Header = connect(
    mapStateToProps,
    mapDispatchToProps,
)(DumbHeader);
