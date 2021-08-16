import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import './App.css';
import { Task as TaskComponent } from "./Task";
import { AppState, Task } from "./__types/app";


function App() {
	/**
	 * States
	 */
	const [appState, setAppState] = useState<AppState>({ loading: true, tasks: [] });

	/**
	 * Functions
	 */
	async function getTasks(quantity: number = 3): Promise<void> {
		// Set a loading state
		setAppState({ ...appState, loading: true });

		const res = await axios.get(`http://localhost:3003/task-list?quantity=${quantity}`);

		if (res.status !== 200) {
			setAppState({ loading: false, tasks: [], errorMessage: "Error getting API task list" });
		}

		const tasks: Task[] = appState.tasks.concat(res.data);
		setAppState({ loading: false, tasks });
	}

	function completeTask(taskId: string) {
		const taskIndex = appState.tasks.findIndex(task => task.uuid === taskId);
		if (taskIndex < 0) {
			return;
		}
		
		const copyTasks: Task[] = {...appState.tasks};
		copyTasks[taskIndex].done = true;
	}

	/**
	 * Hooks
	 */
	useEffect(() => {
		getTasks();
	}, []);

	/**
	 * Renders
	 */
	if (appState.loading) {
		return (
			<div className="loading-wrapper">Loading...</div>
		);
	}

	return (
		<div className="task-wrapper">
			<div className="tasks-container">
				{appState.tasks.map((task, idx) => (
					<TaskComponent key={`task-${task.uuid}`} index={idx + 1} completeTask={completeTask} task={task}/>
				))}
			</div>
		</div>
	);
}

export default App;
