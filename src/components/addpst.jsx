import React, { useState } from "react";
import Nv from "./topnav";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Addpst = () => {
  const par = useParams();
  const navv = useNavigate();
  const [fdata, setfdata] = useState({
    username: localStorage.getItem("userid"),
    uuid : localStorage.getItem("uuid"),
    task_heading: "",
    description: "",
    completed: false,
  });

  const changefdata = (event) => {
    const { name, value } = event.target;
    setfdata({ ...fdata, [name]: value });
  };

  const submit = (event) => {
    event.preventDefault();
    if (!localStorage.getItem("userid")) {
      alert("Not logged in");
      return;
    }

    console.log(fdata);

    fetch("https://task-scheduler-kt4g.onrender.com/add", {
      method: "POST",
      body: JSON.stringify(fdata),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.text())
      .then((data) => {
        if (data === "inserted") {
          navv(`/home`);
        }
        else{
          alert(data);
          setTimeout(() => {
            navv('/home')},
            1000
          );
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <Nv />
      <form
        onSubmit={submit}
        style={{
          margin: "5% auto",
          width: "60%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <label htmlFor="discussion_heading" style={{ marginBottom: "8px" }}>
          Title:
        </label>
        <input name="task_heading" placeholder="Enter the title of the new Task ..." required={true}
         value={fdata.task_heading} onChange={changefdata} style={{ padding: "8px", marginBottom: "16px", width : "70%" }}/>
        <label htmlFor="content" style={{ marginBottom: "8px" }}>
          Content:
        </label>
        <textarea
          name="description"
          placeholder="Enter the description of the Task ..."
          required={true}
          value={fdata.description}
          onChange={changefdata}
          style={{ padding: "8px", marginBottom: "16px", height: "150px",width : "70%" }}
        />
        <button type="submit" style={{padding: "8px 16px", backgroundColor: "orange", border: "none", borderRadius: "4px", cursor: "pointer"}}>
          Add
        </button>
      </form>
    </div>
  );
};

export default Addpst;
