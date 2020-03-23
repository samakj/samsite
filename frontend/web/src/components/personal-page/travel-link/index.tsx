import React from 'react';

import '@samsite/components/personal-page/travel-link/style.scss';
import { TravelLinkPropsType } from '@samsite/components/personal-page/travel-link/types';
import { AsyncImage } from '@samsite/components/ui/async-image';
import { Link } from 'react-router-dom';

export const TravelLink: React.FunctionComponent<TravelLinkPropsType> = ({}) => {
    return (
        <Link to="/personal/travel/" className="travel-link">
            <AsyncImage
                alt="world-map"
                srcProgression={['/static/img/world-map.png']}
                containerClass="world-map-image-container"
                imageClass="world-map-image"
            />
            <span className="link-text">View My Travels</span>
            <AsyncImage
                alt="go"
                srcProgression={['/static/svg/right-triangle.svg']}
                containerClass="link-image-container"
                imageClass="link-image"
            />
        </Link>
    );
};
