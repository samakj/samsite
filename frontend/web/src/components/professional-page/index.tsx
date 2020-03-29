import React from 'react';

import '@samsite/components/professional-page/style.scss';
import { ProfessionalPagePropsType } from '@samsite/components/professional-page/types';

export const ProfessionalPage: React.FunctionComponent<ProfessionalPagePropsType> = ({}) => {
    return (
        <main className="professional-page page-width-wrapper">
            <p className="personal-statement">
                I am a self taught developer, driven by the prospect of learning new architectures
                and languages, as well as extending my current knowledge enabling me to develop more
                performant, usable and readable programs. My engineering background has contributed
                largely to my methodical and component based approach to large projects and has
                allowed me to automate over half a million pounds of customer bonuses and promotions
                among my other achievements. I enjoy programming because it allows me to combine the
                creativity of developing a piece of software/API/webpage, with the analytical
                challenge of making it as efficient as possible for its specific use case.
            </p>

            <h1>Achievements</h1>
            <ul>
                <li>
                    Developing a number of cronjobs responsible for handling over half a million
                    pounds of customer bonuses and refunds.
                </li>
                <li>
                    Developing the full stack, from the database through to the REST API through to
                    the React code, for my first production component at the top of the company home
                    page.
                </li>
                <li>Achieving a 1st Class Masters of Engineering degree</li>
            </ul>

            <h1>Education</h1>

            <h2>MEng Ship Science/Offshore Engineering, University of Southampton</h2>
            <ul>
                <li>1st Class Masters Degree</li>
                <li>
                    Runner up in the Mandles Prize for Hydrofoil Excellence for our Group Design
                    Project
                </li>
                <li>Lloyds Register …</li>
            </ul>

            <h3>Relevant Modules</h3>
            <ul>
                <li>
                    <div className="grade-table">
                        <div className="title">Group Design Project</div>
                        <div className="grade">77</div>
                    </div>
                    <ul>
                        <li>Development of a Hydrofoiling Experimental Research Platform</li>
                        <li>
                            In this project we took an existing catamaran and retrofitted a
                            hydrofoil and foiling rudders to each hull. Once the initial design
                            phase was complete my roll was in the instrumentation and subsequent
                            processing of the data. This included: interfacing proprietary
                            measurement systems, along with ones developed by the team, with a
                            Raspberry Pi for data logging; processing the raw data to remove
                            anomalous results and infer other metrics; developing a web based data
                            visualiser which allowed us to sync numerous data streams with video
                            feeds to analyse points of interest.
                        </li>
                    </ul>
                </li>
                <li>
                    <div className="grade-table">
                        <div className="title">Maritime Robotics</div>
                        <div className="grade">62</div>
                    </div>
                </li>
                <li>
                    <div className="grade-table">
                        <div className="title">Systems Design and Computing for Ships</div>
                        <div className="grade">64</div>
                    </div>
                </li>
                <li>
                    <div className="grade-table">
                        <div className="title">Design and Computing</div>
                        <div className="grade">72</div>
                    </div>
                </li>
            </ul>

            <h2>A-Levels, Wallington County Grammar School</h2>
            <ul>
                <li>
                    <div className="grade-table">
                        <div className="title">Maths</div>
                        <div className="grade">A*</div>
                    </div>
                    </li>
                <li>
                    <div className="grade-table">
                        <div className="title">Further Maths</div>
                        <div className="grade">A</div>
                    </div>
                    </li>
                <li>
                    <div className="grade-table">
                        <div className="title">Physics</div>
                        <div className="grade">A*</div>
                    </div>
                    </li>
                <li>
                    <div className="grade-table">
                        <div className="title">Design & Technology</div>
                        <div className="grade">A</div>
                    </div>
                    </li>
            </ul>

            <h1>Employment</h1>

            <h2>Smarkets, July 2017 - July 2019</h2>
            <p>
                Smarkets is online and mobile betting exchange. The main site is a React app that
                leverages Redux and websockets to provide live pricing and data feeds. The backend
                is predominantly Python (Flask) microservices, with core exchange written in C++. I
                had many different roles at Smarkets based on my team composition changing
                throughout, some of the projects I worked on, and what they entailed, were:
            </p>

            <h3>Creation of promotion handlers.</h3>
            <ul>
                <li>Using event data to determine user eligibility</li>
                <li>
                    Interacting with many internal APIs to calculate user bonuses and refund
                    accordingly in users currency.
                </li>
                <li>Log data for reporting and performance monitoring</li>
                <li>Automatically generating reports shared to the whole company via Slack</li>
            </ul>

            <h3>Full stack rework of the main marketing banner on the home page.</h3>
            <ul>
                <li>
                    Redesigning the database structure and API layer to more closely follow a REST
                    architecture.
                </li>
                <li>Rewriting the React code for the front-end site.</li>
                <li>
                    Creating an internal admin page for non-tech team members to create, update and
                    schedule banners completely independently.
                </li>
            </ul>

            <h3>A complete rework of the promotional and corporate pages.</h3>
            <ul>
                <li>Splitting the pages into reusable templates.</li>
                <li>Abstracting the content away to a structured JSON file.</li>
                <li>
                    This allowed people with very minimal knowledge of Flask to generate new pages
                    and non-tech personnel to edit these pages by simply editing the JSON file, thus
                    reducing developer dependency/workload for these pages.
                </li>
                <li>
                    Implementing Google Tag Manager and Google Optimize tags to measure page
                    performance and A/B test features.
                </li>
            </ul>

            <h1>Hobbies & Interests</h1>
            <ul>
                <li>Challenging myself physically, weight training or woodworking.</li>
                <li>Coming up with new side projects to extend my knowledge as a developer.</li>
                <li>Cooking & baking to satisfy my near constant hunger.</li>
            </ul>

            <h1>References</h1>

            <h2>Smarkets</h2>
            <div className="reference-table">
                <div className="name">Robin Harrison</div>
                <div className="title">CTO</div>
                <a className="email" href="mailto:robin.harrison@smarkets.com">robin.harrison@smarkets.com</a>
            </div>
            <div className="reference-table">
                <div className="name">Jason Haciepiri</div>
                <div className="title">Team Member</div>
                <a className="email" href="mailto:jason.haciepiri@smarkets.com">jason.haciepiri@smarkets.com</a>
            </div>

            <h2>University</h2>
            <div className="reference-table">
                <div className="name">Dr Stephen W Boyd</div>
                <div className="title">Associate Professor</div>
                <a className="email" href="mailto:s.w.boyd@soton.ac.uk">s.w.boyd@soton.ac.uk</a>
            </div>
        </main>
    );
};
