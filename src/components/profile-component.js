import React, { useEffect, useState } from "react";
import defaulephoto from "../image/user_photo/userdef.svg.jpg";
import { useParams, useNavigate } from "react-router-dom";
import UserProfile from "../services/userprofile.service";
import { format } from "date-fns";

const ProfileComponent = () => {
  let { _id } = useParams();

  let [profileData, setProfileData] = useState();

  const navigate = useNavigate();

  const handleEdite = () => {
    navigate("/profile/edit/" + _id);
  };

  useEffect(() => {
    UserProfile.getProfile(_id)
      .then((data) => {
        setProfileData(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container py-4 home_main">
      {profileData &&
        profileData.map((data) => {
          return (
            <div key={data._id} className="profile_main">
              <div className="profile_user">
                <div className="porfile_photo">
                  {data.photo && data.photo == "" && (
                    <img src={defaulephoto} alt="" />
                  )}
                  {data.photo && data.photo != "" && (
                    <img src={data.photo} alt="" />
                  )}
                </div>
                <h2>{data.username}</h2>
                <h4>{format(new Date(data.date), "yyyy-MM-dd")}</h4>
                <button onClick={handleEdite} className="profile_button">
                  編輯個人資料
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ProfileComponent;
