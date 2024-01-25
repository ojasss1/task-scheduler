import React, { useEffect, useState } from "react";
import "./tasklist.css";
import del from "./delete.svg"; 
import complete from "./complete.svg";
import undo from "./undo.png";
import { Link } from "react-router-dom";

const TaskList = () => {
  const [task, setTasks] = useState([
  ]);

  const handleDeleteTask = (id) => {
    fetch("http://localhost:5000/deltask", {
      method: "POST",
    body: JSON.stringify({
      "uuid" : localStorage.getItem("uuid"),
      "id" : id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(r => (r.json()))
  .then(d => {
  })
  .catch(e => {console.log(e)});
  };


  useEffect(() => {
    fetch("http://localhost:5000/getall", {
      method: "POST",
    body: JSON.stringify({
      "uuid" : localStorage.getItem("uuid"),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(r => (r.json()))
  .then(d => {
    setTasks(d);
  })
  .catch(e => {console.log(e)});
  }, [handleDeleteTask])

  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      const newId = task.length > 0 ? task[task.length - 1]._id + 1 : 1;
      setTasks([...task, { _id: newId, task_heading: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const handleToggleComplete = (id) => {
    setTasks(
      task.map((task) =>
        task._id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const calccompleted = (arr) => {
    var cnt = 0;
    if (arr.length == 0) return 0;
    arr.forEach(d => {
      if (d.completed) cnt++;
    })

    return cnt;
  }

  return (
    <div style={{display : "flex"}}>
      <div style={{ display: "flex", flex : 1, justifyContent: "space-evenly", alignItems: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div>No of tasks: {task.length}</div>
          <div>Completed: {
            calccompleted(task)
            }</div>
        </div>
      </div>

      <div style={{flex : 1}}>
    <div className="task-list" style={{width : "500px"}}>
      <h1>Your Tasks</h1>
      <div className="add-task" style={{justifyContent : "center"}}>
        {/* <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new Task . . ."
        /> */}
        <Link to="/addtask" style={{backgroundColor : "#fca311",
      padding : "4px", borderRadius : "4px",
      color : "white",
      }}>Add Task</Link>
      </div>
      <ul>
        {task.map((task) => (
          <li key={task._id} style={{
            textAlign : "right",
          }}>
            <Link to={`/task/${task._id}`}><div
              style={{ textDecoration: task.completed ? "line-through" : "none",
            wordBreak : "break-word" }}
            >
              {task.task_heading}
            </div>
            </Link>
            <div>
                {task.completed ? <img src={undo} height={"50px"}
                 onClick={() => handleToggleComplete(task._id)}/> 
                : 
                <img src={complete} onClick={() => handleToggleComplete(task._id)}/>}
              <img src={del} height={"50px"} 
              style={{marginLeft : "10px"}}
              onClick={() => handleDeleteTask(task._id)}/>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
    </div>
  );
};

export default TaskList;
