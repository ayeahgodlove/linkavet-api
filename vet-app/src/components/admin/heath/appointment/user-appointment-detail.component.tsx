import { Badge, Card, Col, List, Row, Tag, TimePicker, Typography } from "antd";
import CopyToClipboard from "components/shared/copy-to-clipboard.component";
import dayjs from "dayjs";
import { useAppointment } from "hooks/health/appointment.hook";
import { useUser } from "hooks/user.hook";
import { STATUS } from "models/shared/status.enum";
import React from "react";
import { format } from "utils/format";

const UserAppointmentDetailComponent: React.FC = () => {
  const { appointment } = useAppointment();
  const { getUser } = useUser();
  const user = getUser(appointment.doctorId);
  return (
    <Card bordered={false} size="small">
      <List
        size="small"
        dataSource={[
          {
            label: "Doctor",
            value: user.firstname + " " + user.lastname,
          },
          {
            label: "Appointment Date",
            value: format.date(appointment.appointmentDate),
          },

          {
            label: "Appointment Time",
            value: (
              <TimePicker
                bordered={false}
                clearIcon={false}
                value={dayjs(appointment.appointmentTime)}
                style={{ width: 100}}
              />
            ),
          },

          {
            label: "Symptoms",
            value: appointment.symptoms,
          },
          {
            label: "Status",
            value:
              appointment.status === STATUS.APPROVED ? (
                <Tag color="#87d068">{appointment.status}</Tag>
              ) : appointment.status === STATUS.PENDING ? (
                <Tag color="#941c50">{appointment.status}</Tag>
              ) : (
                <Tag color="#f50">{appointment.status}</Tag>
              ),
          },
          {
            label: "ROOM ID",
            value: <CopyToClipboard code={appointment.roomId} />,
          },
          {
            label: "Is Comfirmed?",
            value: appointment.isConfirmed ? (
              <Badge color="green" text="YES" />
            ) : (
              <Badge color="red" text="NO" />
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

export default UserAppointmentDetailComponent;
