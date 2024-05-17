import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Col, Menu } from "antd";
import { FaIdCard } from "react-icons/fa6";
import { TbLicense } from "react-icons/tb";
import { GiDiploma } from "react-icons/gi";
import { API_URL_UPLOADS_AVATARS } from "config/constant";
import { useAuth } from "hooks/auth/auth.hook";
import { useUser } from "hooks/user.hook";

export default function UploadMenu(props: any) {
  const { user } = useAuth();
  const { users } = useUser();

  const avatar = users.find((u) => u.id === user.id);

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
          <Avatar
            src={`${API_URL_UPLOADS_AVATARS}/${avatar?.avatar}`}
            size={100}
          />
        </div>

        <Menu mode="inline" theme={"light"}>
          <Menu.Item key="id-card" icon={<FaIdCard />} style={{ padding: 30 }}>
            <Link to="/verification/id-card">ID CARD</Link>
          </Menu.Item>
          <Menu.Item key="license" icon={<TbLicense />}>
            <Link to="/verification/license">License</Link>
          </Menu.Item>
          <Menu.Item key="diploma" icon={<GiDiploma />}>
            <Link to="/verification/diploma">Diploma</Link>
          </Menu.Item>
        </Menu>
      </div>
    </Col>
  );
}
