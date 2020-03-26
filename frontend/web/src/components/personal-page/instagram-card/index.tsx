import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';

import '@samsite/components/personal-page/instagram-card/style.scss';
import {
    InstagramCardPropsType,
    IntagramProfilePicturePropsType,
    IntagramUsernamePropsType,
    IntagramMostRecentPropsType,
} from '@samsite/components/personal-page/instagram-card/types';
import { AsyncImage } from '@samsite/components/ui/async-image';
import {
    getCardUserMediaSelector,
    getCardUserSelector
} from '@samsite/components/personal-page/instagram-card/selectors';
import { fetchInstagramMe } from '@samsite/fetchers/instagram/users';
import { fetchInstagramMedia } from '@samsite/fetchers/instagram/media';
import { InstagramMediaStateType } from '@samsite/store/handlers/instagram/types';

const InstagramProfilePicture: React.FunctionComponent<IntagramProfilePicturePropsType> = ({ picture }) =>
    picture ?
        <AsyncImage
            alt="Instagram avatar"
            srcProgression={[picture.mediaUrl]}
            containerClass="profile-picture-container"
            imageClass="profile-picture"
        /> :
        <div className="profile-picture-container -placeholder"/>;

const InstagramUsername: React.FunctionComponent<IntagramUsernamePropsType> = ({ user }) =>
    user ?
        <div className="username">
            @{ user.username }
        </div> :
        <div className="username -placeholder" />;

const InstagramMostRecent: React.FunctionComponent<IntagramMostRecentPropsType> = ({ media }) => {
    const IMAGES_TO_SHOW = 8;

    const mostRecent = Object.values(media || {}).sort(
        (
            a: InstagramMediaStateType,
            b: InstagramMediaStateType,
        ): number => a.timestamp < b.timestamp ? 1 : -1
    );
    mostRecent.push(...Array(IMAGES_TO_SHOW).fill(null));

    return (
        <div className="most-recent">
            {
                mostRecent.slice(0, IMAGES_TO_SHOW).map(
                    (post: InstagramMediaStateType, index: number): JSX.Element =>
                        post ?
                            <a href={post.permalink} target="_blank" key={post.id}>
                                <AsyncImage
                                    alt={post.caption}
                                    srcProgression={[post.mediaUrl]}
                                    containerClass="most-recent-media-container"
                                    imageClass="most-recent-media"
                                />
                            </a>:
                            <div className="most-recent-media-container -placeholder" key={index} />
                )
            }
        </div>
    )
}

const DumbInstagramCard: React.FunctionComponent<InstagramCardPropsType> = ({
    user,
    media,
    onFetchInstagramMe,
    onFetchInstagramMedia,
}) => {
    useEffect(
        () => {
            onFetchInstagramMe();
        },
        [],
    );
    useEffect(
        () => {
            user && Object.values(user.media).forEach(
                (id: string): void => onFetchInstagramMedia(id)
            )
        },
        [user ? Object.keys(user.media).length : 0],
    );

    const profilePictureSrc = media &&
        media[process.env.REACT_APP_INSTAGRAM_PROFILE_PICTURE_ID] &&
        media[process.env.REACT_APP_INSTAGRAM_PROFILE_PICTURE_ID].mediaUrl;

    return (
        <div className="instagram-card">
            <a className="profile-link" href="https://instagram.com/samakj">
                <InstagramProfilePicture
                    picture={ media && media[process.env.REACT_APP_INSTAGRAM_PROFILE_PICTURE_ID] }
                />
                <InstagramUsername
                    user={ user }
                />
            </a>
            <InstagramMostRecent media={ media } />
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    user: getCardUserSelector,
    media: getCardUserMediaSelector,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            onFetchInstagramMe: fetchInstagramMe,
            onFetchInstagramMedia: fetchInstagramMedia,
        },
        dispatch,
    );

export const InstagramCard = connect(
    mapStateToProps,
    mapDispatchToProps,
)(DumbInstagramCard);
