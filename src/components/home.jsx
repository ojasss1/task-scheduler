import Nv from "./topnav";
import Tasklist from "./task";
import Ham from "./ham";


const Home = () => {

    return (
        <div>
             {window.innerWidth < 450 ? <Ham /> : <Nv />}
            <Tasklist />
        </div>
    );
}

export default Home;