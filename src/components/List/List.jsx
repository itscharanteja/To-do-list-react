import React, { useEffect, useState } from "react";
import "./List.scss";

const List = () => {
  const [tasks, setTasks] = useState([
    {
      id: 12,
      task: "newTask",
      completed: false,
    },
    {
      id: 34,
      task: "newTask1234",
      completed: false,
    },
  ]);
  const [newTask, setNewTask] = useState("");
  const [time, setTime] = useState("Morning");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState("");
  const hours = new Date().getHours();
  useEffect(() => {
    if (hours >= 6 && hours < 12) {
      setTime("Morning");
    } else if (hours >= 12 && hours < 16) {
      setTime("Afternoon");
    } else if (hours >= 16 && hours <= 20) {
      setTime("Evening");
    } else {
      setTime("Night");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let greetingImage = null;

  // Set the image based on the time of day
  if (time === "Morning") {
    greetingImage = (
      <img src="assets/morning.png" className="greeting" alt="Morning" />
    );
  } else if (time === "Afternoon") {
    greetingImage = (
      <img src="assets/sun.png" className="greeting" alt="Afternoon" />
    );
  } else if (time === "Evening") {
    greetingImage = (
      <img src="assets/sunset.png" className="greeting" alt="Evening" />
    );
  } else {
    greetingImage = (
      <img src="assets/night.png" className="greeting" alt="Night" />
    );
  }

  const addTask = () => {
    if (newTask.trim() === "") {
      alert("Enter a task to add!");
    }
    if (newTask.trim() !== "") {
      const newTaskItem = {
        id: Date.now(),
        task: newTask,
        completed: false,
      };

      setTasks([...tasks, newTaskItem]);
      setNewTask("");
    }
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);

    // setTimeout(() => {
    //   const taskToDelete = updatedTasks.find((task) => taskId === task.id);
    //   if (taskToDelete && taskToDelete.completed) {
    //     deleteTask(taskId);
    //   }
    // }, 2000);
  };

  const handleEdit = (taskId, taskContent) => {
    setEditingTaskId(taskId);
    setEditedTask(taskContent);
  };

  const saveEditedTask = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === editingTaskId ? { ...task, task: editedTask } : task
    );
    setTasks(updatedTasks);
    setEditingTaskId(null);
    setEditedTask("");
  };

  return (
    <div className="listComp">
      <h1>
        To-Do List <img src="assets/to-do-list.png" alt="img" />
      </h1>

      <h3>
        Good {time} {greetingImage}
      </h3>

      <div className="list">
        <h2>Tasks</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              {editingTaskId === task.id ? (
                <input
                  type="text"
                  value={editedTask}
                  onChange={(e) => {
                    setEditedTask(e.target.value);
                  }}
                  onBlur={saveEditedTask}
                  autoFocus
                />
              ) : (
                <>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                  />
                  <span
                    style={{
                      textDecoration: task.completed ? "line-through" : "none",
                    }}
                  >
                    {task.task}
                  </span>
                </>
              )}

              <button
                onClick={() => {
                  handleEdit(task.id, task.task);
                }}
                className="btn"
              >
                <img src="assets/edit.png" alt="*" />
              </button>
              <button onClick={() => deleteTask(task.id)} className="btn">
                <img src="assets/delete.png" alt="*" />
              </button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTask} className="button">
          Add Task
        </button>
      </div>
    </div>
  );
};

export default List;
