import React, { useEffect, useState } from 'react';

import '@samsite/components/ui/async-image/style.scss';
import { AsyncImagePropsType } from '@samsite/components/ui/async-image/types';
import { proressiveImageLoad } from '@samsite/components/ui/async-image/hooks';
import { noImageSrc } from '@samsite/components/ui/async-image/config';

export const AsyncImage: React.FunctionComponent<AsyncImagePropsType> = ({
    alt,
    containerClass,
    imageClass,
    srcProgression,
}) => {
    const [src, updateSrc] = useState(noImageSrc);

    useEffect(
        () => {
            const unloadFunction = proressiveImageLoad(srcProgression, updateSrc);
            return unloadFunction;
        },
        [],
    );

    return (
        <div className={`async-image-container ${containerClass}`}>
            <img
                src={src}
                alt={alt}
                className={`async-image ${imageClass}`}
            />
        </div>
    );
};
