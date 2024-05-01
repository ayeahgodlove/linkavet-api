import React from "react";
import ActivityProfile from "components/auth/activity.component";
import Profile from "components/auth/index.component";

const ProfileActivityPage = () => {
  return (
    <div style={{ padding: "1rem 2rem" }}>
      <Profile>
        <ActivityProfile />
      </Profile>
    </div>
  );
};

export default ProfileActivityPage;
