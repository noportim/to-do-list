export interface Task {
  _id: string;
  title: string;
  text?: string;
  createdAt?: string;
}

export interface Task {
  _id: string;
  title: string;
  text?: string;
}

export interface TaskState {
  tasks: Task[];
  currentTask: Task | null;
  loading: boolean;
  message?: string;
}

export const initialState: TaskState = {
  tasks: [],
  currentTask: null,
  loading: false,
};
