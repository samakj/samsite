import React from 'react';

import '@samsite/components/personal-page/style.scss';
import { PersonalPagePropsType } from '@samsite/components/personal-page/types.ts';
import { QuickInfo } from '@samsite/components/personal-page/quick-info';
import { TravelLink } from '@samsite/components/personal-page/travel-link';

export const PersonalPage: React.FunctionComponent<PersonalPagePropsType> = ({}) => {
    return (
        <main className="personal-page page-width-wrapper">
            <QuickInfo />
            <TravelLink />
        </main>
    );
};
