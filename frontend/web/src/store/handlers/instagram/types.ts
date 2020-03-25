export interface InstagramUserStateType {
    id: string;
    username: string;
    accountType: string;
    mediaCount: number;
    media: {[id: string]: string};
}

export interface InstagramMediaStateType {
    caption: string;
    mediaType: string;
    mediaUrl: string;
    thumbnailUrl?: string;
    permalink: string;
    timestamp: string;
    username: string;
    id: string;
}
