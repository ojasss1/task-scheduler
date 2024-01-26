import { useEffect } from "react";
import Nv from "./topnav";
import { useNavigate } from "react-router-dom";

const Blank = () => {
    const nav = useNavigate();
    useEffect(() => {
        localStorage.getItem("userid") ? nav("/home") : nav("/login");
    },[])
    return(
        <div>
            
            <Nv />
        </div>
    );
}


export default Blank;