import Nv from "./topnav";
import Tasklist from "./task";
import Ham from "./ham";
import { useLocation } from "react-router-dom";


const Home = () => {
    const locc = useLocation();
    return (
        <div>
             {window.innerWidth < 450 ? <Ham userid={locc.state.userid} uuid={locc.state.uuid} /> 
             :
              <Nv userid={locc.state.userid} uuid={locc.state.uuid} />}
            <Tasklist userid={locc.state.userid} uuid={locc.state.uuid} />
        </div>
    );
}

export default Home;