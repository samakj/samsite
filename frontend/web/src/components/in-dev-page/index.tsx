import React, { useState } from 'react';

import '@samsite/components/in-dev-page/style.scss';
import { InDevPagePropsType } from '@samsite/components/in-dev-page/types';
import { AsyncImage } from '@samsite/components/ui/async-image';
import { Typewriter } from '@samsite/components/typewriter';

export const InDevPage: React.FunctionComponent<InDevPagePropsType> = ({}) => {
    const [typewriterComplete, updateTypewriteComplete] = useState(false);

    return (
        <main className="in-dev-page page-width-wrapper">
            <AsyncImage
                alt="In Dev"
                srcProgression={['/static/svg/dev.svg']}
                containerClass="anim-image-container"
                imageClass="anim-image"
            />
            <Typewriter
                className="title"
                message="Page currently in development"
                onComplete={() => updateTypewriteComplete(true)}
            />
            <span className={`description -${ typewriterComplete ? 'show' : 'hide' }`}>
                Please check back in some vague and usually baseless amount of time for updates.
            </span>
        </main>
    );
};
