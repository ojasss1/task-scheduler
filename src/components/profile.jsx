import React from "react";
import Nv from "./topnav";
import "./profile.css";
import prof from "./profile.png";
import Ham from "./ham";

const Profile = () => {
    return (
    <div>
         {window.innerWidth < 450 ? <Ham /> : <Nv />}
        <div>
            <div className="profile-container">
                <div className="profile-photo">
                    <img src={prof} />
                </div>
                <div>

                </div>
            </div>
        </div>
    </div>
    );
}

export default Profile;