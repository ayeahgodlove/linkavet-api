import React from "react";
import PasswordProfile from "components/auth/password-change.component";
import Profile from "components/auth/index.component";


const ProfilePasswordChangePage = () => {
  return (
    <div style={{ padding: "1rem 2rem" }}>
      <Profile>
        <PasswordProfile />
      </Profile>
    </div>
  );
};

export default ProfilePasswordChangePage;
