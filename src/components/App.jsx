import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nv from "./topnav";
import Login from "./login";
import Sgnup from "./signup";
import Profile from "./profile";
import Home from "./home";
import TaskDetails from "./taskpage";
import Blank from "./blank";
import Addpst from "./addpst";
import Update_profile from "./update_profile";

function App() {
  return (
  <Router>
    <div>
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/" element={<Blank />} />
        <Route exact path="/update_profile" element={<Update_profile />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Sgnup />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/task/:taskId" element={<TaskDetails />} />
        <Route exact path="/addtask" element={<Addpst />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
