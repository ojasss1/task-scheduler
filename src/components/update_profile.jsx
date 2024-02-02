import { useLocation, useNavigate } from "react-router-dom";
import Nv from "./topnav";
import { useEffect, useState } from "react";
import Ham from "./ham";


const Update_profile = () => {
    const locc = useLocation();
    const navv = useNavigate();
    const [fdata, setfdata] = useState(locc.state.pro_data);

    const handlesubmit = (e) => {
        e.preventDefault();
        console.log(fdata)

        fetch("https://task-scheduler-kt4g.onrender.com/update_profile", {
            method : "POST",
            body : JSON.stringify(fdata),
            headers : {
                "Content-Type" : "application/json",
            }
        })
        .then(r => r.json())
        .then(d => {
            if (d.msg === "Success") navv("/profile",{ state:{userid : locc.state.userid, uuid : locc.state.uuid}});
            else{
                alert("Error occured");
                navv("/profile", {state:{userid : locc.state.userid, uuid : locc.state.uuid}})
            }
        })
        .catch(e => {
            alert("Error occured");
            console.log(e);
        })
    }

    useEffect(() => {
        (fdata.Married === "Yes") ? document.querySelectorAll("input")[5].checked = true
        : document.querySelectorAll("input")[6].checked = true;
    })

    const handlefdata = (e) => {
        const value = e.target.type === 'radio' ? e.target.id : e.target.value;
        if (e.target.type === "radio") {
            var nee = fdata;
            nee.Married = e.target.id;
            setfdata(nee)
        }
        else{
            setfdata({
            ...fdata,
            [e.target.name]: value,
            });
        }

        console.log(fdata.Married);
    }

    useEffect(() => {

    }, [])

    return (
        <div>
            {window.innerWidth < 450 ? <Ham userid={locc.state.userid} uuid={locc.state.uuid} /> 
             :
              <Nv userid={locc.state.userid} uuid={locc.state.uuid} />}

            <div>
                <form className="flex-col justify-center items-center w-[95%] md:w-[40%] m-auto my-[100px] p-[20px] 
                shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]"
                onSubmit={handlesubmit}>
                    <div className="m-[30px]">
                        <label htmlFor="Full_Name">Your Full Name : </label> <br></br>
                        <input  name="Full_Name" value={fdata.Full_Name} onChange={handlefdata}
                        className="w-full border-black border-2"/>
                    </div>
                    <div className="m-[30px]">
                        <label htmlFor="age"> Your Age : </label> <br></br>
                        <input  name="age" value={fdata.age} onChange={handlefdata}
                        className="w-full border-black border-2"/>
                    </div>
                    <div className="m-[30px]">
                        <label htmlFor="email"> Your Email : </label> <br></br>
                        <input  name="email" value={fdata.email} onChange={handlefdata}
                         className="w-full border-black border-2"/>
                    </div>
                    <div className="m-[30px]">
                        <label htmlFor="Occupation"> Your Occupation : </label> <br></br>
                        <input  name="Occupation" value={fdata.Occupation} onChange={handlefdata}
                        className="w-full border-black border-2"/>
                    </div>
                    <div className="m-[30px]">
                        <label htmlFor="Married"> Married ?: </label> <br></br>
                        <div className="flex justify-evenly">
                            <div className="">
                                <label htmlFor="Yes" className="mx-[5px]">Yes</label>
                                <input type="radio" id="Yes" onChange={handlefdata}
                                // checked={fdata.Married == 'Yes'}
                                name="Married" className="border-black border-2"/>
                            </div>
                            <div className="">
                                <label htmlFor="No" className="mx-[5px]">No</label>
                                <input type="radio" onChange={handlefdata}
                                // checked={fdata.Married === "No"}
                                id="No" name="Married" className="border-black border-2"/>
                            </div>
                        </div>
                    </div>
                    <div className="m-[30px]">
                        <label htmlFor="Bio"> Your Bio : </label> <br></br>
                        <input  name="Bio" value={fdata.Bio} onChange={handlefdata}
                        className="w-full border-black border-2"/>
                    </div>
                    <div className="m-[30px]">
                        <label htmlFor="Linkedin"> Your Linkedin link : </label> <br></br>
                        <input  name="Linkedin" value={fdata.Linkedin} onChange={handlefdata}
                        className="w-full border-black border-2"/>
                    </div>
                    <div className="m-[30px]">
                        <label htmlFor="Github"> Your Github link : </label> <br></br>
                        <input  name="Github" value={fdata.Github} onChange={handlefdata}
                        className="w-full border-black border-2"/>
                    </div>
                    <div className="m-[30px]">
                        <label htmlFor="Instagram"> Your Instagram link : </label> <br></br>
                        <input  name="Instagram" value={fdata.Instagram} onChange={handlefdata}
                        className="w-full border-black border-2"/>
                    </div>
                    <div className="m-[50px] text-center">
                        <button type="submit" className="bg-orange-400 rounded-md py-[8px] px-[16px]">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Update_profile;