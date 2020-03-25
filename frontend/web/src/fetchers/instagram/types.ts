export interface InstagramUserResponseType {
    username: string,
    media: {
        data: {id: string}[];
        paging: {
            cursors: {
                before: string;
                after: string;
            },
            next: string;
        }
    },
    account_type: string,
    media_count: number,
    id: string,
}

export interface InstagramMediaResponseType {
    caption: string;
    media_type: string;
    media_url: string;
    thumbnail_url?: string;
    permalink: string;
    timestamp: string;
    username: string;
    id: string;
}
