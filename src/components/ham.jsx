import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ham from "./ham.png";

const Tab = ({isclick}) => {
    return (
        isclick && <div style={{display : "flex",position: "absolute", zIndex : "50", width: "100%", height : "120px",flexDirection : "column", 
        justifyContent : "space-evenly", alignItems : "center", backgroundColor : "gray"}}>
        <div style={{backgroundColor : "black", color : "white", width : "fit-content",
    margin : "2%", padding : "10px", borderRadius : "10px"}}><Link style={{color : "white"}}to="/home">Home</Link></div>
        <div style={{backgroundColor : "black", color : "white", width : "fit-content",
    margin : "2%", padding : "10px", borderRadius : "10px"}}><Link style={{color : "white"}}to="/home">Support</Link></div>
        </div>
    )
}

const Ham = () => {
    const [userid, setUserid] = useState(localStorage.getItem("userid"));

  useEffect(() => {
    setUserid(localStorage.getItem("userid"));
  }, []); 

  const handleLogout = () => {
    localStorage.removeItem("userid");
    localStorage.removeItem("uuid");
    setUserid(null);
  };
    const [isopen, setopen] = useState(false);
    return (
        <>
        <div className="navv" style = {nav}>
            <img style={{marginLeft : "10%"}} onClick={() => {setopen(!isopen)}}
            height={"50px"}
            src={ham} />
            {userid && <div style={{overflowWrap : "break-word"}}><Link style={{fontSize : "20px",
        marginTop : "5px"}} to="/profile">{userid}</Link></div>}
            {!userid ? (
        <div style={{marginLeft : "auto", marginRight : "10%"}}>
          <Link to="/login" ><button className="btnlgout" type="submit" style={{width : "fit-content", backgroundColor : "orange" ,
                  borderRadius : "5px", padding: "10px 20px", color : "white", border : "none"}}>
              Login/Signup
          </button>
          </Link>
        </div>
      ) : (
        <div style={{ marginRight : "10%"}}>
          <Link to="/"><button className="btnlgout" type="submit" onClick={handleLogout} style={{width : "fit-content", backgroundColor : "orange" ,
                  borderRadius : "5px", padding: "10px 20px", color : "white", border : "none"}}>
              Logout
          </button>
          </Link>
        </div>
      )}
        </div>
        <Tab isclick={isopen} />
        </>
    );
}

const nav = {
    display: "flex",
    justifyContent: "space-between",
    padding : "10px",
    borderRadius: "20px",
    borderBottom : "1px solid black",
  };

export default Ham;