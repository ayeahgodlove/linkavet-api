import { Card, Carousel, TabsProps } from "antd";
import React from "react";
import "./dashboard.style.scss";
import { FaHospitalUser } from "react-icons/fa";
import { LiaSchoolSolid } from "react-icons/lia";
import { RiReservedFill } from "react-icons/ri";
import { MdEmergency } from "react-icons/md";
import { useAuth } from "hooks/auth/auth.hook";
import { Navigate } from "react-router-dom";
import { Tabs } from "antd";
import { FloatButton } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import useWindowSize from "hooks/shared/window-resize.hook";
import { useMessageContext } from "context/session.context";

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

const onChange = (key: string) => {
  console.log(key);
};

const useTabHeaders = (width: number) => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: width > 768 ? "0 3rem" : "0 1rem",
          }}
        >
          <FaHospitalUser size={width > 768 ? 45 : 30} color="#3498db" />
          <p style={{ fontSize: 12, color: "#333" }}>Consultation</p>
        </div>
      ),
      children: `Content of Tab Pane 1`,
    },
    {
      key: "2",
      label: (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: width > 768 ? "0 3rem" : "0 1rem",
          }}
        >
          <RiReservedFill size={width > 768 ? 45 : 30} color="#3498db" />
          <p style={{ fontSize: 12, color: "#333" }}>Appointments</p>
        </div>
      ),
      children: `Content of Tab Pane 2`,
    },
    {
      key: "3",
      label: (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: width > 768 ? "0 3rem" : "0 1rem",
          }}
        >
          <LiaSchoolSolid size={width > 768 ? 45 : 30} color="#3498db" />
          <p style={{ fontSize: 12, color: "#333" }}>Resources</p>
        </div>
      ),
      children: `Content of Tab Pane 3`,
    },
    {
      key: "4",
      label: (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: width > 768 ? "0 3rem" : "0 1rem",
          }}
        >
          <MdEmergency size={width > 768 ? 45 : 30} color="#3498db" />
          <p style={{ fontSize: 12, color: "#333" }}>Emmergency</p>
        </div>
      ),
      children: `Content of Tab Pane 4`,
    },
  ];
  return {
    items,
  };
};

const DashboardPage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { width } = useWindowSize();
  const { items } = useTabHeaders(width);
  const { session } = useMessageContext();

  if (!isAuthenticated || !user) {
    return <Navigate to={"/auth/login"} />;
  }

  if (session.isRedirect) {
    return <Navigate to={session.redirectTo!} />;
  }

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
      <div className="carousel-caption">
        <h1 className="header-1">efficient & convenient</h1>
        <h2 className="header-2">Pet Care</h2>
      </div>

      <Card
        bordered={false}
        size="default"
        style={{
          margin: width > 768 ? "0 13.5rem" : "0 .5rem",
          top: "-200px",
        }}
      >
        <Tabs
          centered
          size="small"
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
          style={{ padding: 0 }}
        />
      </Card>
      <FloatButton icon={<CommentOutlined />} />
    </>
  );
};

export default DashboardPage;
