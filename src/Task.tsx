import axios from "axios";
import React from "react";
import { useState } from "react";
import { TaskProps, TaskState } from "./__types/task";


function Task(props: TaskProps) {
	const { index, task, completeTask } = props;

	/**
	 * State
	 */
	const [taskState, setTaskState] = useState<TaskState>({ showModal: false, loading: false });

	/**
	 * Functions
	 */
	function toggleModal(open: boolean) {
		setTaskState({ ...taskState, showModal: open });
	}

	async function complete() {
		setTaskState({ ...taskState, loading: true });

		const res = await axios.put("http://localhost:3003/tasks", {
			taskId: task.uuid,
			done: true,
		});

		if (res.status !== 200) {
			setTaskState({ ...taskState, loading: false, errorMessage: "Error getting API task list" });
		}

		completeTask(task.uuid);
		setTaskState({ ...taskState, loading: false });
	}

	/**
	 * Renders
	 */
	return (
		<>
			<div className={`task ${task.done ? "done-task" : ""}`.trim()} onClick={() => toggleModal(true)}>
				<div>Task#{index}</div>
				<div className="task-title">{task.title}</div>
			</div>

			{taskState.showModal && (
				<div className="modal-wrapper">
					<div className="modal">
						{!taskState.loading && (
							<>
								<div style={{ flexGrow: 1 }}>Task#{index} - {task.title}</div>
								<div style={{ alignSelf: "flex-end" }}>
									<button disabled={task.done} style={{ marginRight: 12 }} onClick={complete}>Complete</button>
									<button onClick={() => toggleModal(false)}>Close</button>
								</div>
							</>
						)}

						{taskState.loading && (
							<div style={{ textAlign: "center" }}>Completing...</div>
						)}
					</div>
				</div>
			)}
		</>
	);
}

export { Task };
