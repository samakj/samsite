import { useState } from 'react';

import { isServerSide } from '@samsite/utils/render-side';
import { noImageSrc } from '@samsite/components/ui/async-image/config';

export const proressiveImageLoad = (srcProgression: string[]) => {
    if (isServerSide()) return noImageSrc;

    const [bestLoadedSrc, updateBestLoadedSrc] = useState(noImageSrc);
    const [bestLoadedSrcIndex, updateBestLoadedSrcIndex] = useState(-1);

    const finalImageIndex = srcProgression.length - 1;
    for (let index = finalImageIndex; index >= 0; index -= 1) {
        const image = new Image();
        const src = srcProgression[index];

        image.onload = () => {
            if (index > bestLoadedSrcIndex) {
                updateBestLoadedSrc(src);
                updateBestLoadedSrcIndex(index);
            }
        };
        image.src = src;

        if (index === finalImageIndex && image.complete) break;
    }

    return bestLoadedSrc;
};
