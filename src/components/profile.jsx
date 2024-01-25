import React from "react";
import Nv from "./topnav";
import "./profile.css";
import prof from "./profile.png";

const Profile = () => {
    return (
    <div>
        <Nv />
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