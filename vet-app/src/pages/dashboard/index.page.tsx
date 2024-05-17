import { Carousel } from "antd";
import { ROLES } from "config/constant";
import { useAuth } from "hooks/auth/auth.hook";
import React from "react";
import AppointmentDashboardPage from "./appointment-dashboard.page";
import ManageDashboardPage from "./manage-dashboard.page";
import "./dashboard.style.scss";

const DashboardPage = () => {
  const {  user } = useAuth();

  const isAppointment =
    user.roles.map((r) => r.name).includes(ROLES.PETOWNER) ||
    user.roles.map((r) => r.name).includes(ROLES.DOCTOR);

  const isManage =
    user.roles.map((r) => r.name).includes(ROLES.ADMIN) ||
    user.roles.map((r) => r.name).includes(ROLES.CREATOR);


  return (
    <>
      <Carousel effect="fade" autoplay>
        <div>
          <img style={contentStyle} src="./images/dogs/cute-cats.jpg" />
        </div>
        <div>
          <img style={contentStyle} src="./images/dogs/dog-423398.jpg" />
        </div>
        <div>
          <img style={contentStyle} src="./images/dogs/kittens-3535404.jpg" />
        </div>
        <div>
          <img
            style={contentStyle}
            src="./images/dogs/pexels-photo-4214919.jpeg"
          />
        </div>
      </Carousel>

      {/* petowners */}
      {isAppointment && <AppointmentDashboardPage />}
      {/* admins and others */}
      {
        isManage && <ManageDashboardPage />
      }
    </>
  );
};

const contentStyle: React.CSSProperties = {
  height: "75vh",
  color: "#fff",
  lineHeight: "75vh",
  textAlign: "center",
  background: "#364d79",
  width: "100%",
  objectFit: "cover",
  objectPosition: "center",
};

export default DashboardPage;
