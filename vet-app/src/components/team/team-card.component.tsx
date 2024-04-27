import React from "react";
import { Card, Image, Space } from "antd";
import { createFromIconfontCN } from "@ant-design/icons";

import "./member.less";
import { IUserSpecialty } from "models/user-specialty.model";
import { API_URL_UPLOADS_AVATARS } from "config/constant";

interface IProp {
  team: IUserSpecialty;
}
export const TeamCard: React.FC<IProp> = ({ team }) => {
  const {
    username,
    fullname,
    specialty,
    title,
    avatar,
    facebook,
    twitter,
    linkedin,
  } = team;
  const { Meta } = Card;

  const IconFont = createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_2229651_awfgn4o1jo8.js",
  });

  return (
    <Card
      hoverable
      bordered={true}
      style={{ padding: 0 }}
      className="member"
      cover={
        avatar ? (
          <Image alt={username} src={`${API_URL_UPLOADS_AVATARS}/${avatar}`} />
        ) : (
          <Image alt={username} src={`/user-placeholder.jpg`} />
        )
      }
    >
      <Space className="member__contact">
        <a
          className="member__contact-link"
          href={facebook}
          target="_blank"
          rel="noreferrer"
        >
          <IconFont type="icon-facebook" />
        </a>
        <a
          className="member__contact-link"
          href={twitter}
          target="_blank"
          rel="noreferrer"
        >
          <IconFont type="icon-twitter" />
        </a>
        <a
          className="member__contact-link"
          href={linkedin}
          target="_blank"
          rel="noreferrer"
        >
          <IconFont type="icon-linkedin" />
        </a>
      </Space>
      <Meta title={fullname} description={title + " " + specialty} />
    </Card>
  );
};
