import {
    ActionTypeType,
    ActionTypeObjectType,
    ActionObjectType,
    ActionMethodsType,
} from '@samsite/store/types';
import { KeyedObjectType } from '@samsite/types/generic-object-types';
import { FetchActionGeneratorType, FetchActionObjectType, FetchActionType } from '@samsite/factories/fetch/types';

const defaultFetchActionGenerator = <PayloadValueType>(type: ActionTypeType) => (
    payload?: KeyedObjectType<any>,
    url?: string,
    error?: Error,
    timestamp?: number,
): FetchActionType<PayloadValueType> => ({
    payload,
    error,
    url,
    type,
    timestamp: timestamp || +new Date(),
});

export const generateFetchActionsObject = <PayloadValueType>(
    actionKeys: ActionTypeObjectType,
    actionMethods: ActionMethodsType,
    actionGenerator?: FetchActionGeneratorType<PayloadValueType>,
): FetchActionObjectType<PayloadValueType> =>
    Object.keys(actionMethods).reduce(
        (
            acc: FetchActionObjectType<PayloadValueType>,
            actionMethod: string,
        ): FetchActionObjectType<PayloadValueType> => {
            acc[actionMethod] = (actionGenerator || defaultFetchActionGenerator)(
                actionKeys[actionMethod],
            );
            return acc;
        },
        {},
    );
