import { useEffect } from "react";
import Nv from "./topnav";
import { useNavigate } from "react-router-dom";
import Ham from "./ham";

const Blank = () => {
    const nav = useNavigate();
    useEffect(() => {
        localStorage.getItem("userid") ? nav("/home") : nav("/login");
    },[])
    return(
        <div>
            
            {window.innerWidth < 450 ? <Ham /> : <Nv />}
        </div>
    );
}


export default Blank;