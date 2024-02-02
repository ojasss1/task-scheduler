import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ham from "./ham.png";

const Tab = ({isclick, userid, uuid}) => {
    return (
        isclick && <div style={{display : "flex",position: "absolute", zIndex : "50", width: "100%", height : "120px",flexDirection : "column", 
        justifyContent : "space-evenly", alignItems : "center", backgroundColor : "gray"}}>
        <div style={{backgroundColor : "black", color : "white", width : "fit-content",
    margin : "2%", padding : "10px", borderRadius : "10px"}}><Link style={{color : "white"}}to="/home" state={{userid : userid, uuid : uuid}}>Home</Link></div>
        <div style={{backgroundColor : "black", color : "white", width : "fit-content",
    margin : "2%", padding : "10px", borderRadius : "10px"}}><Link style={{color : "white"}}to="/home" state={{userid : userid, uuid : uuid}}>Support</Link></div>
        </div>
    )
}

const Ham = (props) => {
    const [userid, setUserid] = useState(props.userid);

  useEffect(() => {
    setUserid(props.userid);
  }, [props.userid]); 

  const handleLogout = () => {
  };
    const [isopen, setopen] = useState(false);
    return (
        <>
        <div className="navv" style = {nav}>
            <img style={{marginLeft : "10%", height : "50px"}} onClick={() => {setopen(!isopen)}}
            src={ham} />
            {userid && <div style={{overflowWrap : "break-word"}}><Link style={{fontSize : "20px",
        marginTop : "5px"}} to="/profile" state={{userid : props.userid, uuid : props.uuid}}>{userid}</Link></div>}
            {!userid ? (
        <div style={{marginLeft : "auto", marginRight : "10%"}}>
          <Link to="/login" state={{userid : props.userid, uuid : props.uuid}}><button className="btnlgout" type="submit" style={{width : "fit-content", backgroundColor : "orange" ,
                  borderRadius : "5px", padding: "10px 20px", color : "white", border : "none"}}>
              Login/Signup
          </button>
          </Link>
        </div>
      ) : (
        <div style={{ marginRight : "10%"}}>
          <Link to="/" state={{userid : props.userid, uuid : props.uuid}}><button className="btnlgout" type="submit" onClick={handleLogout} style={{width : "fit-content", backgroundColor : "orange" ,
                  borderRadius : "5px", padding: "10px 20px", color : "white", border : "none"}}>
              Logout
          </button>
          </Link>
        </div>
      )}
        </div>
        <Tab isclick={isopen} userid={props.userid} uuid={props.uuid} />
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