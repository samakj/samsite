import { StateObjectType } from '@samsite/store/types';
import { TravelLocalityStateType } from '@samsite/store/handlers/travel/types';

export interface TravelPagePropsType {
    localities: StateObjectType<TravelLocalityStateType>,
    onFetchTravelLocalities: () => void,
}
