import React from 'react';

import '@samsite/components/personal-page/quick-info/style.scss';
import { QuickInfoPropsType } from '@samsite/components/personal-page/quick-info/types.ts';
import { AsyncImage } from '@samsite/components/ui/async-image';
import { copyTextToClipboard } from '@samsite/utils/copy-text';
import { liveAge } from '@samsite/components/personal-page/quick-info/live-age';

export const QuickInfo: React.FunctionComponent<QuickInfoPropsType> = ({}) => {
    const copyEmail = (): void => copyTextToClipboard('samakj@live.co.uk');

    return (
        <div className="quick-info">
            <AsyncImage
                srcProgression={['/static/img/sam-on-a-camel.jpeg']}
                containerClass="display-picture-container"
                imageClass="display-picture"
                alt="sam-on-a-camel"
            />

            <div className="info-container">
                <div className="infos">
                    <div className="info">
                        <div className="title">Name</div>
                        <div className="value">Sam Jones</div>
                    </div>
                    <div className="info">
                        <div className="title">Age</div>
                        <div className="value">{liveAge()}s</div>
                    </div>
                    <div className="info">
                        <div className="title">Travel</div>
                        <div className="value">27 Countries, 4 Continents</div>
                    </div>
                    <div className="info">
                        <div className="title">Special Ability</div>
                        <div className="value">Uselss facts for every situation</div>
                    </div>
                </div>

                <div className="links">
                    <a className="link" href="/static/pdf/cv.pdf" download="Samuel Jones CV.pdf">
                        <AsyncImage
                            srcProgression={['/static/svg/file.svg']}
                            containerClass="link-image-container"
                            imageClass="link-image"
                            alt="Download"
                        />
                        <span className="link-text">CV</span>
                    </a>
                    <div className="link" onClick={copyEmail}>
                        <AsyncImage
                            srcProgression={['/static/svg/copy.svg']}
                            containerClass="link-image-container"
                            imageClass="link-image"
                            alt="Copy"
                        />
                        <span className="link-text">samakj@live.co.uk</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
