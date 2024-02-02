import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Nv from "./topnav";
import Ham from "./ham";


const TaskDetails = (props) => {
  const locc = useLocation();
  const { taskId } = useParams();
  const [tasks, settasks] = useState([]);
  useEffect(() => {
    fetch("https://task-scheduler-kt4g.onrender.com/getall", {
      method: "POST",
    body: JSON.stringify({
      "uuid" : locc.state.uuid,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(r => (r.json()))
  .then(d => {
    settasks(d);
  })
  .catch(e => {console.log(e)});
  }, [])
  const task = tasks.find((todo) => todo._id === (taskId));

  return (
    <>
     {window.innerWidth < 450 ? <Ham userid={locc.state.userid} uuid={locc.state.uuid} />
      : 
      <Nv userid={locc.state.userid} uuid={locc.state.uuid} />}
    <div className="task-details-container">
      <h1 className="task-details-heading">Task Details</h1>
      {task && (
        <div className="task-details">
          <h2 className="task-name">{task.task_heading}</h2>
          <p className="task-info">{task.description}</p>
          <p className="task-time">Time: {task.time}</p>
          <p className="task-notes">Notes: {task.notes}</p>
        </div>
      )}
    </div>
    </>
  );
};

export default TaskDetails;
