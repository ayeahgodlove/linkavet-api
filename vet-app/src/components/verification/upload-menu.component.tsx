import React from "react";
import { Col } from "antd";
import SettingComponent from "components/auth/setting.component.component";

export default function UploadMenu(props: any) {

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
        <SettingComponent />
      </div>
    </Col>
  );
}
