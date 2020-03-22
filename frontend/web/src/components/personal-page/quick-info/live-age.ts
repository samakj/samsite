import { useEffect, useState } from 'react';
import Timeout = NodeJS.Timeout;

export const liveAge = (updateRate: number = 1000): string => {
    const dateOfBirth = +new Date('21 May 1995');
    let ageUpdateTimeout: Timeout = null;
    const [ageMilliseconds, setAgeMilliseconds] = useState(+new Date() - dateOfBirth);

    useEffect(
        () => {
            clearTimeout(ageUpdateTimeout);
            // @ts-ignore: Conflict between number and Timeout
            ageUpdateTimeout = setTimeout(
                () => setAgeMilliseconds(+new Date() - dateOfBirth),
                updateRate,
            );
            return () => clearTimeout(ageUpdateTimeout);
        },
        [ageMilliseconds],
    );

    return Math.floor(ageMilliseconds / 1000).toLocaleString();
};
