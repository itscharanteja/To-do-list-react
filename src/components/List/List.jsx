import React, { useEffect, useState } from "react";
import "./List.scss";

const List = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [time, setTime] = useState("Morning");
  const [newTime, setNewTime] = useState("");
  const [newPriority, setNewPriority] = useState("🔴");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState("");
  const [showAddFields, setShowAddFields] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [deletedTasks, setDeletedTasks] = useState([]);

  useEffect(() => {
    // For Greeting the user
    const hours = new Date().getHours();

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

  useEffect(() => {
    // For Storing the saved tasks to local storage

    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      try {
        // Attempt to parse the retrieved data
        const parsedTasks = JSON.parse(storedTasks);
        setTasks(parsedTasks);
      } catch (error) {
        // Handle parsing error
        console.error("Error parsing tasks:", error);
      }
    }
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
    setShowAddFields(true);
  };
  const saveTask = () => {
    if (
      newTask.trim() === "" ||
      newTime.trim() === "" ||
      newPriority.trim() === ""
    ) {
      alert("Enter all task details!");
      return;
    }

    const newTaskItem = {
      id: Date.now(),
      task: newTask,
      completed: false,
      time: newTime,
      priority: newPriority,
    };
    const updatedTasks = [...tasks, newTaskItem];
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    setNewTask("");
    setNewTime("");
    setNewPriority("🔴");
    setShowAddFields(false);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    const taskToDelete = tasks.find((task) => task.id === taskId);

    if (taskToDelete) {
      const storedTasks = localStorage.getItem("tasks");
      if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks);
        const updateStoredTasks = parsedTasks.filter(
          (task) => task.id !== taskId
        );
        localStorage.setItem("tasks", JSON.stringify(updateStoredTasks));
      }
      setDeletedTasks([...deletedTasks, taskToDelete]);
    }

    setTasks(updatedTasks);
  };

  const toggleTaskCompletion = (taskId) => {
    console.log(completedTasks);
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);

    const taskToMove = tasks.find((task) => task.id === taskId);

    if (taskToMove && taskToMove.completed) {
      setCompletedTasks([...completedTasks, taskToMove]);
    } else {
      const updatedCompletedTasks = completedTasks.filter(
        (task) => task.id !== taskId
      );
      setCompletedTasks(updatedCompletedTasks);
    }
  };

  const handleEdit = (taskId, taskContent) => {
    setEditingTaskId(taskId);
    setEditedTask(taskContent);
  };

  const saveEditedTask = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === editingTaskId ? { ...task, task: editedTask } : task
    );

    const saveTask = [updatedTasks];
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    console.log(saveTask);
    setTasks(updatedTasks);
    setEditingTaskId(null);
    setEditedTask("");
  };

  const clearTasks = () => {
    localStorage.clear();
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
                    {task.task} - {task.time} - {task.priority}
                  </span>
                </>
              )}

              <button
                onClick={() => {
                  handleEdit(task.id, task.task);
                }}
                className="btn"
              >
                <img src="assets/edit.png" alt="Edit" />
              </button>
              <button onClick={() => deleteTask(task.id)} className="btn">
                <img src="assets/delete.png" alt="Delete" />
              </button>
            </li>
          ))}
        </ul>
        {completedTasks.length > 0 && (
          <div className="completed-tasks">
            <h2>Completed Tasks</h2>
            <ul>
              {completedTasks.map((task) => (
                <li key={task.id} className="completed-task-item">
                  {/* Display completed tasks */}
                  {task.task}
                </li>
              ))}
            </ul>
          </div>
        )}

        {showAddFields && (
          <div className="addTaskFields">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task"
            />
            <input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              placeholder="Select time"
            />
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value)}
              className="priority"
            >
              <option value="🔴">High</option>
              <option value="🟠">Medium</option>
              <option value="🟢">Low</option>
            </select>
            <button onClick={saveTask} className="button">
              Save Task
            </button>
          </div>
        )}

        {/* Button to show/hide the input fields */}
        {!showAddFields && (
          <button onClick={addTask} className="button">
            Add Task
          </button>
        )}
        {tasks.length > 0 && (
          <button onClick={clearTasks} className="clearTasks">
            Clear all tasks
          </button>
        )}
      </div>
    </div>
  );
};

export default List;
