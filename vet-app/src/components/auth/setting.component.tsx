import { UploadOutlined } from "@ant-design/icons";
import { Avatar, Button, message, Space, Upload } from "antd";
import { API_URL, API_URL_UPLOADS_AVATARS } from "config/constant";
import { useAuth } from "hooks/auth/auth.hook";
import { useUser } from "hooks/user.hook";
import React, { useEffect } from "react";

const SettingComponent = () => {
  const { user } = useAuth();
  const { loadUsers, users } = useUser();
  const uploadUrl = `${API_URL}/api/users/upload/${user.id}`;
  
const avatar = users.find(u => u.id === user.id);

  const uploadProps = {
    name: "image",
    action: uploadUrl,
    headers: {
      authorization: "Bearer " + user.token,
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} avatar uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} avatar upload failed.`);
      }
    },
  };

  console.log(user)
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);
  return (
    <Space direction="vertical" align="center">
      <Avatar src={`${API_URL_UPLOADS_AVATARS}/${avatar?.avatar}`} size={100} />
      <Upload {...uploadProps} name="avatar">
        <Button icon={<UploadOutlined />}>Upload Image</Button>
      </Upload>
    </Space>
  );
};

export default SettingComponent;
