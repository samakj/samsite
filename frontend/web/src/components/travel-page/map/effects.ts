import Map = google.maps.Map;
import { RefObject } from 'react';

export const loadScriptEffectGenerator = (
    src: string,
    tagId: string,
    scriptLoaded: boolean,
    updateScriptLoaded: (value: boolean) => void,
): () => void => (): void => {
    if (!scriptLoaded && !document.getElementById(tagId)) {
        const tag = document.createElement('script');
        tag.id = tagId;
        tag.onload = () => updateScriptLoaded(true);
        tag.src = src;
        document.body.appendChild(tag);
    }
};

export const initGoogleMapObject = (
    containerRef: RefObject<HTMLDivElement>,
    mapOptions: google.maps.MapOptions,
    scriptLoaded: boolean,
    updateGoogleMapObject: (value: Map) => void,
): () => void => (): void => {
    if (scriptLoaded) {
        updateGoogleMapObject(
            new window.google.maps.Map(containerRef.current, mapOptions),
        );
    }
};
