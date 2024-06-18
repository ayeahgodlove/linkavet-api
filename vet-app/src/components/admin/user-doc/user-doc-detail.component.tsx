import { Button, Card, Col, Image, List, Row, Typography } from "antd";
import { useUserDoc } from "../../../hooks/user-doc.hook";
import React from "react";
import { API_URL_UPLOADS_USER_DOCS } from "config/constant";
import { useUser } from "hooks/user.hook";
import PdfViewer from "components/shared/pdf-viewer.componet";
import { FiDownload } from "react-icons/fi";

const UserDocDetailComponent: React.FC = () => {
  const { userDoc } = useUserDoc();
  const { getUser } = useUser();
  return (
    <Card bordered={false} size="small">
      <List
        size="small"
        dataSource={[
          {
            label: "User",
            value:
              getUser(userDoc.userId)?.firstname +
              getUser(userDoc.userId).lastname,
          },
          {
            label: "Image",
            value: (
              <Image
                src={`${API_URL_UPLOADS_USER_DOCS}/${userDoc.photo}`}
                width={250}
                height={250}
              />
            ),
          },
          {
            label: "Id Card",
            value: (
              <Button
                type="default"
                href={`${API_URL_UPLOADS_USER_DOCS}/${userDoc.idCard}`}
                download={true}
                icon={<FiDownload />}
              />
            ),
          },
          {
            label: "Liscense",
            value: (
              <Button
                type="default"
                href={`${API_URL_UPLOADS_USER_DOCS}/${userDoc.license}`}
                download={true}
                icon={<FiDownload />}
              />
            ),
          },
          {
            label: "Diploma",
            value: (
              <Button
                type="default"
                href={`${API_URL_UPLOADS_USER_DOCS}/${userDoc.diploma}`}
                download={true}
                icon={<FiDownload />}
              />
            ),
          },
        ]}
        renderItem={(item) => (
          <List.Item>
            <Row style={{ width: "100%" }}>
              <Col md={4}>
                <Typography.Text>{item.label}</Typography.Text>
              </Col>
              <Col md={20}>
                <Typography.Text>{item.value}</Typography.Text>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default UserDocDetailComponent;
