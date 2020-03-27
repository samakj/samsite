import { StateObjectType } from '@samsite/store/types';
import {
    InstagramMediaStateType,
    InstagramUserStateType,
} from '@samsite/store/handlers/instagram/types';

export interface InstagramCardPropsType {
    username: string;
    user: InstagramUserStateType;
    media: StateObjectType<InstagramMediaStateType>;

    onFetchInstagramMe: () => void;
    onFetchInstagramMedia: (id: string) => void;
}

export interface IntagramProfilePicturePropsType {
    picture: InstagramMediaStateType;
}

export interface IntagramUsernamePropsType {
    user: InstagramUserStateType;
}

export interface IntagramMostRecentPropsType {
    media: StateObjectType<InstagramMediaStateType>;
}
