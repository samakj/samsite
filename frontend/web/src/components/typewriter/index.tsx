import React, { useState, useEffect } from 'react';

import { stepEffectHandler } from './effects';

import { TypewriterPropsType } from './types';
import './style.scss';

export const Typewriter: React.FunctionComponent<TypewriterPropsType> = ({
    className,
    message,
    delay,
    mistakeRate,
    onComplete,
}) => {
    const [step, updateStep] = useState({
        cursorPosition: 0,
        message: '',
        isMistake: false,
        delay: 0,
    });
    const [isComplete, updateIsComplete] = useState(false);

    useEffect(
        () =>
            stepEffectHandler(
                message,
                { average: 50, deviation: 30, mistake: 200, initial: 1000, ...delay },
                mistakeRate || 0.05,
                step,
                updateStep,
                isComplete,
                updateIsComplete,
                onComplete,
            ),
        [step, message],
    );

    return (
        <span className={`typewriter ${className || ''}`}>
            {step.message}
            {!isComplete ? <span className="cursor" /> : null}
        </span>
    );
};
