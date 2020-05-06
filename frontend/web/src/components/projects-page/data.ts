export type ProjectStateType = 'COMPLETE' | 'IN DEV' | 'CONCEPT';

export interface ProjectDataType {
    gitRepoId?: string;
    name: string;
    description: string;
    icon?: string;
    state: ProjectStateType;
    keywords: string[];
    todos?: string[];
}

export const data: ProjectDataType[] = [
    {
        gitRepoId: '251252675',
        name: 'Samsite',
        state: 'IN DEV',
        description:
            'As a developer in 2020 it would be criminal of me not to have a personal website. Using React/Redux on the front end and Flask (Python)/postgresql on the backend, I can create a rich experience for users. It will also allow me to keep developing with the latest technology and sink my teeth into any new features such as React hooks and try out libraries I may not interact with day to day, for example google maps.',
        keywords: ['React', 'Javascript', 'Python', 'Flask', 'Postgresql', 'REST'],
        todos: [
            'Add backend service to provide project data.',
            'Add backend service to provide travel information.',
            'Add backend service to provide static files.',
            'Add admin panel for updating backend data.',
            'Add travel page with map to display locations and navigate through pictures.',
        ],
    },
    {
        gitRepoId: '254667316',
        name: 'Flowervolution',
        state: 'IN DEV',
        description:
            'The basic idea behind this game is, using a seed, you are provided an environment and by setting the initial conditions you hope to create a sustainable and diverse ecosystem. It is an opportunity for me to experiment with basic game development, such as terrain generation and game UI/UX. The biggest difficulty I for see is developing a model for life and genetic reproduction that makes the game both pseudo-realistic and enjoyable to play.',
        keywords: ['Javascript'],
        todos: [
            'Create plant DNA data structure.',
            'Use terrain generation to create sunshine and water level models.',
            'Create visualisation of the game grid and views for the terrain, sunshine and water levels.',
        ],
    },
    {
        gitRepoId: '256488237',
        name: 'HAN (Home Automation Network)',
        state: 'IN DEV',
        description:
            'Home automation and IoT devices are becoming more and more popular, however the mostly use proprietary systems that are not always compatible and offer limited access to the internal workings. By creating my own devices I hope to be able to explore message queues and get a better understanding of IoT principles.',
        keywords: [
            'React',
            'Javascript',
            'Python',
            'Flask',
            'Postgresql',
            'REST',
            'Websockets',
            'MQTT',
        ],
        todos: [
            'Deploy first component with reporting',
            'Develop control systems',
            'Create interface for viewing collected data and controlling the systems',
        ],
    },
    {
        name: 'COSA (Car Operating System Alpha)',
        state: 'CONCEPT',
        description:
            'Cars provide a large amount of information over the OBD-II port in most modern cars. Using an adapter and a raspberry pi (or other similar single-board computer), I hope to explore creating live visualisations of the data provided and, dependent on the storage capacity of the computer, journey based/historical visualisation of relevant metrics.',
        keywords: ['React', 'Javascript', 'Python', 'Flask', 'Postgresql'],
        todos: [
            'Source an adapter for OBD-II port.',
            'Develop data consumption and distribution service.',
            'Create frontend for displaying data.',
        ],
    },
    {
        gitRepoId: '261787982',
        name: 'Directory explorer',
        state: 'COMPLETE',
        description:
            'A small piece of code to display the contents of a directory with child directory contents to a depth specified by the user.',
        keywords: ['Python', 'Shell'],
    },
];
