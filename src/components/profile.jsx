import React, { useEffect, useState } from "react";
import Nv from "./topnav";
import prof from "./profile.png";
import Ham from "./ham";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Profile = () => {
    const locc = useLocation();
    const navv = useNavigate();
    const [profile_data, setprofile_data] = useState({
        uid : "NIL",
        name : "NIL",
        age : "NIL",
        email : "NIL",
        Occupation : "NIL",
        Married: "NIL",
        Bio : "NIL",
        Full_Name : "NIL",
        Linkedin : "NIL",
        Github : "NIL",
        Instagram : "NIL",
        username : "NIL",
        profile_pic : ""
    });

    useEffect(() => {

        fetch(`https://task-scheduler-kt4g.onrender.com/getprofile/${locc.state.uuid}`)
        .then(r => r.json())
        .then(d => {
            if (d.msg === "Error"){
                alert("Some error occured, please try later");
                navv("/home", {state:{uuid : locc.state.uuid, userid : locc.state.userid}});
            }
            
            else{
                setprofile_data(d.msg);
            }
        })
        .catch(e => {
            console.log(e)
        });

    }, [])

    return (
    <div>
         {window.innerWidth < 450 ? <Ham userid={locc.state.userid} uuid={locc.state.uuid} /> 
         : 
         <Nv userid={locc.state.userid} uuid={locc.state.uuid}/>}
        <div className="text-center"><div className="m-[20px]">
            <span className="bg-[#fca311] rounded-md py-[8px] px-[16px]">
                <Link to="/update_profile" state={{userid : locc.state.userid, uuid : locc.state.uuid,
                pro_data : profile_data}}>
                    Update Profile
                </Link>
                </span>
            </div>
        </div>
        <div className="m-[20px] mb-0 md:m-[100px]">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-10 w-full">
                <div className="col-span-1 row-span-1 p-4 rounded-md bg-[#e6e9f0] order-1">
                    <img src={prof} className="m-auto w-[100px] md:w-[150px]"/>
                    <h1 className="m-[5px] whitespace-nowrap font-bold">{
                        profile_data.username
                    }</h1>
                    <center><h6 className="font-medium break-words">{
                        profile_data.Bio
                    }</h6></center>
                </div>
                <div className="col-span-2 row-span-1 md:row-span-2 order-3 md:order-2
                 bg-[#e6e9f0] rounded-md p-[5px] lg:p-[70px]">
                    <p className="border-b p-4 m-4 border-gray-500">Full Name  <span className="ml-[20px] lg:ml-[100px] font-light
                    ">{profile_data.Full_Name}</span></p>
                    <p className="border-b p-4 m-4 border-gray-500">Email  
                    <span className="ml-[20px] lg:ml-[100px] relative right-0
                    font-light">{profile_data.email}</span></p>
                    <p className="border-b p-4 m-4 border-gray-500">Occupation  <span className="ml-[20px] lg:ml-[100px]
                    font-light">{profile_data.Occupation}</span></p>
                    <p className="border-b p-4 m-4 border-gray-500">Age  <span className="ml-[20px] lg:ml-[100px]
                    font-light">{profile_data.age}</span></p>
                    <p className="p-4 m-4 border-gray-500">Married  <span className="ml-[20px] lg:ml-[100px]
                    font-light">{profile_data.Married}</span></p>
                </div>
                <div className="bg-[#e6e9f0] row-span-1 col-span-1 h-full self-center rounded-md order-2 md:order-3
                p-[2px] lg:p-12">
                    <p className="m-4">{profile_data.Linkedin}</p>
                    <p className="m-4">{profile_data.Instagram}</p>
                    <p className="m-4">{profile_data.Github}</p>
                </div>
            </div>
            <div>

            </div>
        </div>
    </div>
    );
}

export default Profile;