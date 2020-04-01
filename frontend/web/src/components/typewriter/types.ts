export interface DelayPropsType {
    average: number;
    deviation: number;
    mistake: number;
    initial: number;
}

export interface TypewriterPropsType {
    className?: string;
    message: string;
    delay?: DelayPropsType;
    mistakeRate?: number;
    onComplete?: () => void;
}

export interface StepType {
    cursorPosition: number;
    message: string;
    isMistake: boolean;
    delay: number;
}
