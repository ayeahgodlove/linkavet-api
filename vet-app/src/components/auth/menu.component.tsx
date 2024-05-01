import React from "react";
import { Link } from "react-router-dom";
import { Col, Menu } from "antd";
import { FiUser, FiActivity } from "react-icons/fi";
import { PiPasswordFill } from "react-icons/pi";
import SettingComponent from "./setting.component.component";
import { GrCircleInformation } from "react-icons/gr";

export default function MenuProfile(props: any) {
  return (
    <Col lg={8} className={props.className}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: props.className ? "2rem .6rem" : 0,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "0 0 1.5rem 0",
          }}
        >
          <SettingComponent />
        </div>

        <Menu mode="inline" theme={"light"}>
          <Menu.Item
            key="personel-information"
            icon={<FiUser />}
            style={{ padding: 30 }}
          >
            <Link to="/profile/personel-information">Personal Information</Link>
          </Menu.Item>
          <Menu.Item key="password-change" icon={<PiPasswordFill />}>
            <Link to="/profile/password-change">Password Change</Link>
          </Menu.Item>
          <Menu.Item key="specialty" icon={<GrCircleInformation />}>
            <Link to="/profile/specialty">Professional Information</Link>
          </Menu.Item>
          <Menu.Item key="activity" icon={<FiActivity />}>
            <Link to="/profile/activity">Activity Monitor</Link>
          </Menu.Item>
        </Menu>
      </div>
    </Col>
  );
}
