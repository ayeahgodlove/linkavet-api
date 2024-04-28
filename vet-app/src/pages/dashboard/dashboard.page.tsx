import {
  // Calendar,
  CalendarProps,
  Card,
  Carousel,
  Col,
  Row,
  TabsProps,
} from "antd";
import React from "react";
import "./dashboard.style.scss";
import { FaHospitalUser } from "react-icons/fa";
import { LiaSchoolSolid } from "react-icons/lia";
import { RiReservedFill } from "react-icons/ri";
import { MdEmergency } from "react-icons/md";
import { useAuth } from "../../hooks/auth/auth.hook";
import { Navigate } from "react-router-dom";
import { Tabs } from "antd";
import { FloatButton } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import useWindowSize from "../../hooks/shared/window-resize.hook";
import UploadResourceComponent from "../../components/user-docs/upload-resource.component";
import { Dayjs } from "dayjs";
import CalenderComponent from "../../components/calendar/calendar.component";

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
      children: (
        <>
          <UploadResourceComponent />
        </>
      ),
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

  if (!isAuthenticated || !user) {
    return <Navigate to={"/auth/login"} />;
  }

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

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

      <Row justify={"center"} align={"middle"}>
        <Col xs={22} md={18}>
          <Card
            bordered={false}
            title={
              <>
                <div style={wrapperStyle}>
                  {/* <Calendar fullscreen={false} onPanelChange={onPanelChange} /> */}
                  <CalenderComponent />
                </div>
              </>
            }
            style={{
              top: "-400px",
              marginBottom: 25,
            }}
          />
        </Col>

        <Col xs={22} md={18}>
          <Card
            bordered={false}
            size="default"
            style={{
              top: "-400px",
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
        </Col>
      </Row>

      <FloatButton icon={<CommentOutlined />} />
    </>
  );
};

const wrapperStyle: React.CSSProperties = {
  width: "100%",
  // height:"250px"
  // border: `1px solid ${token.colorBorderSecondary}`,
  // borderRadius: token.borderRadiusLG,
};

export default DashboardPage;
