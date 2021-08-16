import { Task } from "./app";

/*------------------------------------------------------------------------
 * Types for Task component
 -----------------------------------------------------------------------*/
export type TaskProps = {
	index: number;
	task: Task;
	completeTask: (taskId: string) => void;
};

/*------------------------------------------------------------------------
 * Types for the task state
 -----------------------------------------------------------------------*/
export type TaskState = {
	showModal: boolean;
	loading: boolean;
	errorMessage?: string;
};
