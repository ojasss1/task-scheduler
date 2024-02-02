import React, { useEffect, useState } from "react";
import del from "./delete.svg"; 
import complete from "./complete.svg";
import undo from "./undo.png";
import { Link } from "react-router-dom";

const TaskList = (props) => {
  const [task, setTasks] = useState([
  ]);

  const gettask = () => {
    fetch("https://task-scheduler-kt4g.onrender.com/getall", {
      method: "POST",
    body: JSON.stringify({
      "uuid" : props.uuid,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(r => (r.json()))
  .then(d => {
    setTasks(d);
  })
  .catch(e => {console.log(e)});
  }

  const handleDeleteTask = (id) => {
    fetch("https://task-scheduler-kt4g.onrender.com/deltask", {
      method: "POST",
    body: JSON.stringify({
      "uuid" : props.uuid,
      "id" : id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(r => (r.text()))
  .then(() => {
    gettask();
  })
  .catch(e => {console.log(e)});
  };

  useEffect(() => {
    gettask();
  }, [])

  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      const newId = task.length > 0 ? task[task.length - 1]._id + 1 : 1;
      setTasks([...task, { _id: newId, task_heading: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const handleToggleComplete = (id) => {
    fetch("https://task-scheduler-kt4g.onrender.com/complete",  {
      method: "POST",
    body: JSON.stringify({
      "uuid" : props.uuid,
      "id" : id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(r => r.text())
    .then(() => {
      gettask();
    })
    .catch(e => console.log(e));
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
    <div style={{display : "flex"}} className="main_div">
      <div className="info_div" style={{ display: "flex", flex : 1, justifyContent: "center", alignItems: "center" }}>
        <div style={{ textAlign: "center" ,width : "fit-content"}}>
          <div style={{margin : "10%", whiteSpace : "nowrap"}}>No of tasks: {task.length}</div>
          <div style={{margin : "10%", whiteSpace : "nowrap"}}>Completed: {
            calccompleted(task)
            }</div>
        </div>
      </div>

      <div style={{flex : 1}}>
    <div className="task-list">
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
      }} state={{userid : props.userid, uuid : props.uuid}}>Add Task</Link>
      </div>
      <ul>
        {task.map((task) => (
          <li key={task._id} style={{
            textAlign : "right",
          }}>
            <Link to={`/task/${task._id}`} state={{userid : props.userid, uuid : props.uuid}}><div
              style={{ textDecoration: task.completed ? "line-through" : "none",
            wordBreak : "break-word" }}
            >
              {task.task_heading}
            </div>
            </Link>
            <div>
                {task.completed ? <img className="ii inline h-[50px]" src={undo} 
                 onClick={() => handleToggleComplete(task._id)}/> 
                : 
                <img className="ii inline h-[50px]" src={complete} onClick={() => handleToggleComplete(task._id)}/>}
              <img className="ii inline h-[50px]" src={del}
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
