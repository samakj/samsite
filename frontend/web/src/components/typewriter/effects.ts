import { uniformRandomNo, randomChoice } from '@samsite/utils/random';
import { sleep } from '@samsite/utils/sleep';
import { DelayPropsType, StepType } from './types';

const mistakeCharacters: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');

const getStepDelay = (delay: DelayPropsType, cursorPosition: number): number => {
    let stepDelay: number = uniformRandomNo(delay.average, delay.deviation);

    if (!cursorPosition) {
        stepDelay += delay.initial;
    }

    return stepDelay;
};

const getNextStep = (
    prevStep: StepType,
    message: string,
    delay: DelayPropsType,
    mistakeRate: number,
): StepType => {
    let stepDelay: number = getStepDelay(delay, prevStep.cursorPosition);
    const makeMistake: boolean = Math.random() < mistakeRate;
    const newStep: StepType = Object.assign({}, prevStep);

    if (prevStep.isMistake) {
        newStep.message = prevStep.message.slice(0, -1);
        newStep.isMistake = false;
        stepDelay += delay.mistake;
    } else if (makeMistake) {
        newStep.isMistake = true;
        newStep.message += randomChoice(mistakeCharacters);
    } else {
        newStep.cursorPosition += 1;
        newStep.message = message.slice(0, newStep.cursorPosition);
    }

    newStep.delay = stepDelay;
    return newStep;
};

export const stepEffectHandler = (
    message: string,
    delay: DelayPropsType,
    mistakeRate: number,
    prevStep: StepType,
    updateStep: Function,
    isComplete: boolean,
    updateIsComplete: Function,
    onComplete: () => void,
) => {
    if (message) {
        if (prevStep.cursorPosition < message.length) {
            const newStep = getNextStep(prevStep, message, delay, mistakeRate);
            sleep(newStep.delay).then(() => updateStep(newStep));
        } else if (!isComplete) {
            updateIsComplete(true);
            if (onComplete) onComplete();
        }
    }
};
