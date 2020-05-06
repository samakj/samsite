export const proressiveImageLoad = (srcProgression: string[], updateSrc: (src: string) => void): () => void => {
    let bestLoadedSrcIndex = -1;

    const finalImageIndex = srcProgression.length - 1;
    const images: HTMLImageElement[] = [];

    for (let index = finalImageIndex; index >= 0; index -= 1) {
        const image = new Image();
        const src = srcProgression[index];

        image.onload = () => {
            if (index > bestLoadedSrcIndex) {
                updateSrc(src);
                bestLoadedSrcIndex = index;
            }
        };
        image.src = src;
        images.push(image);

        if (index === finalImageIndex && image.complete) break;
    }

    return () => images.forEach((image: HTMLImageElement) => image.onload = null);
};
