import { useEffect } from "react";
import Nv from "./topnav";
import { useNavigate } from "react-router-dom";
import Ham from "./ham";

const Blank = () => {
    const nav = useNavigate();
    useEffect(() => {
        nav("/login");
    },[])
    return(
        <div>
            
            {window.innerWidth < 450 ? <Ham userid = "" uuid = ""/> 
            : 
            <Nv userid = "" uuid = "" />}
        </div>
    );
}


export default Blank;