import React from 'react';

import '@samsite/components/ui/async-image/style.scss';
import { AsyncImagePropsType } from '@samsite/components/ui/async-image/types';
import { proressiveImageLoad } from '@samsite/components/ui/async-image/hooks';

export const AsyncImage: React.FunctionComponent<AsyncImagePropsType> = ({
    alt,
    containerClass,
    imageClass,
    srcProgression,
}) => {
    return (
        <div className={ `async-image-container ${containerClass}` }>
            <img src={ proressiveImageLoad(srcProgression) } alt={ alt } className={ `async-image ${ imageClass }` }/>
        </div>
    );
};
