import { fetchRequestHistoryStoreKey } from '@samsite/store/keys';
import { ActionTypeType, StateObjectType } from '@samsite/store/types';
import { fetchActionMethods } from '@samsite/factories/fetch/constants';
import {
    FetchActionType,
    RequestHistoryTimingsType,
    RequestHistoryType,
} from '@samsite/factories/fetch/types';

const getFetchMethod = (actionType: ActionTypeType): string | null => {
    for (const method in fetchActionMethods) {
        // @ts-ignore: Doesn't notice that method are the keys of fetchActionMethods
        if (actionType.includes(fetchActionMethods[method])) {
            return method;
        }
    }
    return null;
};

const fetchRequestHistoryReducer = (
    state: StateObjectType<RequestHistoryType> = {},
    action: FetchActionType<any>,
): StateObjectType<RequestHistoryType> => {
    if (!action.type) {
        return state;
    }

    const fetchMethod = getFetchMethod(action.type);
    const actionTimings: RequestHistoryTimingsType = Object.assign(
        {},
        state[action.url] && state[action.url].timings,
    );

    if (fetchMethod === fetchActionMethods.PENDING) {
        actionTimings.request = action.timestamp;
    } else {
        actionTimings.response = action.timestamp;
        actionTimings.duration = actionTimings.response - actionTimings.request;
    }

    return Object.assign({}, state, {
        [action.url]: Object.assign({}, state[action.url], {
            status: fetchMethod,
            error: action.error,
            timings: actionTimings,
        }),
    });
};

export const fetchRequestHistoryStoreHandler = {
    storeKey: fetchRequestHistoryStoreKey,
    reducer: fetchRequestHistoryReducer,
};
