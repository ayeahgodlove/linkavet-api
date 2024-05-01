import React, { useState } from "react";
import { Row, Col, Button, Card, Drawer, Dropdown } from "antd";
import { RiCloseFill, RiMenuFill } from "react-icons/ri";

import MenuProfile from "./menu.component";
import "./profile.scss";

export default function Profile({ children }) {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Row gutter={[32, 32]} justify={"center"}>
      <Drawer
        placement="left"
        closable={true}
        onClose={onClose}
        open={visible}
        closeIcon={<RiCloseFill size={30} />}
        width={250}
      >
        <MenuProfile
          onCloseDrawer={onClose}
          moreBtnCheck="none"
          footer="none"
        />
      </Drawer>

      <Col xs={24} md={20} className="user-profile_container">
        <div className={"user-profile_hamburger_icon"}>
          <Button
            type="text"
            icon={<RiMenuFill size={24} />}
            onClick={showDrawer}
          ></Button>
        </div>
        <Card bordered={false} hoverable>
          <Row>
            <MenuProfile className={"user-profile_menu"} />
            <Col xs={24} lg={16}>{children}</Col>
          </Row> 
        </Card>
      </Col>
    </Row>
  );
}
