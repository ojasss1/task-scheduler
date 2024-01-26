import React, { useState } from "react";
import Nv from "./topnav";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp} from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/auth';
import load from "./load.gif";
import Ham from "./ham";

const firebaseConfig = {
  apiKey: "AIzaSyC2YMy095m2EJdE6Zg4MVb7JXqLKM8EW2Y",
  authDomain: "billinginv-78309.firebaseapp.com",
  projectId: "billinginv-78309",
  storageBucket: "billinginv-78309.appspot.com",
  messagingSenderId: "78167947791",
  appId: "1:78167947791:web:f4695c7d5a25ca0f91417a",
  measurementId: "G-SJ1BGYHR12"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

const Login = () => {
  const [fdata, setfdata] = useState({ email: "", passwd: "" });
  const navv = useNavigate();

  const handlefdata = (e) => {
    const { name, value } = e.target;
    setfdata({ ...fdata, [name]: value });
  };

  const [restxt, setrstext] = useState("");

  const handlesubmit = (e) => {
    e.preventDefault();
    setrstext(<img src={load} height={"80px"} />);
    signInWithEmailAndPassword(auth, fdata.email, fdata.passwd)
    .then((userCredential) => {

      setrstext("Login Successfull");
      const user = userCredential.user;
      localStorage.setItem("uuid", user.uid);
      // console.log(user);
      setTimeout(() => {
        navv(`/home`, { state: { userid: fdata.username } });
        localStorage.setItem("userid", user.displayName);
      }, 500);

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      setrstext("Please check your credentials")
    });

  //   fetch("http://localhost:5000/login", {
  //     method: "POST",
  //     body: JSON.stringify(fdata),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((r) => r.text())
  //     .then((d) => {
  //       setrstext(d);
  //       // if (d === "Login Successfull") {
  //       //   navv(`/`, { state: { userid: fdata.username } });
  //       //   localStorage.setItem("userid", fdata.username);
  //       // }
  //     })
  //     .catch((e) => console.log(e));
  // };
  }

  return (
    <div>
       {window.innerWidth < 450 ? <Ham /> : <Nv />}
      <form className="logn"
        onSubmit={handlesubmit}
        style={{display: "flex", flexDirection: "column",margin: "5% auto",padding: "20px",boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)",
          borderRadius: "10px",
        }}
      >
        <label htmlFor="email" style={{ marginBottom: "8px" }}>
          Email
        </label>
        <input type="email" name="email" placeholder="Enter your email address" required={true} onChange={handlefdata} value={fdata.email}
          style={{ padding: "10px", marginBottom: "16px", borderRadius: "5px" }}
        />
        <label htmlFor="passwd" style={{ marginBottom: "8px" }}>
          Password
        </label>
        <input
          type="password"
          name="passwd"
          placeholder="Enter your password"
          required={true}
          onChange={handlefdata}
          value={fdata.passwd}
          style={{ padding: "10px", marginBottom: "16px", borderRadius: "5px" }}
        />
        <button
          type="submit"
          style={{width: "fit-content", margin: "auto", padding: "10px 20px", backgroundColor: "orange",color: "white", border: "none",borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
        <p>
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
        {restxt && <p style={{margin: "auto", backgroundColor :"blue", borderRadius : "10px", padding : "8px 16px", color :"white"}}>{restxt}</p>}
      </form>
    </div>
  );
};

export default Login;
