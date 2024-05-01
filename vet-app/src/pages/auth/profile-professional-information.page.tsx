import React from "react";
import Profile from "components/auth/index.component";
import ProfessionalInfoProfile from "components/auth/personel-professional.component";

const ProfileProfessionalInformationPage = () => {
  return (
    <div style={{ padding: "1rem 2rem" }}>
      <Profile>
        <ProfessionalInfoProfile />
      </Profile>
    </div>
  );
};

export default ProfileProfessionalInformationPage;
