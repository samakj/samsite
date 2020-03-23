export interface GitUserStateType {
    username: string;
    id: number;
    avatarUrl: string;
    url: string;
    reposUrl: string;
    name: string;
    company: string;
    blog: string;
    location: string;
    email: string;
    hireable: string;
    bio: string;
    publicRepos: number;
    publicGists: number;
}

export interface GitRepoStateType {
    id: number;
    name: string;
    fullName: string;
    private: boolean;
    url: string;
    description: string;
    commitsUrl: string;
    owner: {
        username: string;
        id: number;
    };
}

export interface GitCommitStateType {
    url: string;
    sha: string;
    message: string;
    date: string;
}
