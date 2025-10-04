export enum Sender {
  User = 'user',
  Assistant = 'assistant',
}

export enum Intent {
    CREATE_TASK = 'CREATE_TASK',
    READ_TASKS = 'READ_TASKS',
    UPDATE_TASK = 'UPDATE_TASK',
    DELETE_TASK = 'DELETE_TASK',
    RECOMMENDATION = 'RECOMMENDATION',
    UPDATE_PREFERENCES = 'UPDATE_PREFERENCES',
    CHAT = 'CHAT',
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export interface Recommendation {
    type: 'book' | 'movie' | 'recipe';
    title: string;
    description: string;
}

export interface Message {
  id: number;
  sender: Sender;
  text: string;
  tasks?: Task[];
  recommendations?: Recommendation[];
}

export interface UserPreferences {
    book?: string;
    movie?: string;
    recipe?: string;
}