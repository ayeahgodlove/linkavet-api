import React from "react";

import { Row, Col, Table, Typography } from "antd";
import { Link } from "react-router-dom";
import { useAppointment } from "hooks/health/appointment.hook";
import { useAppointmentColumn } from "components/admin/heath/appointment/appointment-column.component";
import { IAppointment } from "models/health/appointment";
import { ROLES } from "config/constant";
import { useAuth } from "hooks/auth/auth.hook";

export default function AppointmentTableDashboardCard() {
  const { userAppointmentColumns } = useAppointmentColumn();
  const { userAppointments } = useAppointment();
  const { user } = useAuth();
  const isAppointment = user.roles.map((r) => r.name).includes(ROLES.DOCTOR);

  return (
    <Row>
      <Col span={24}>
        <Row align="middle" justify="space-between">
          <Typography.Title level={4}>Your Appointment</Typography.Title>

          {isAppointment && (
            <Link to={"/admin/appointments"}>View all appointments</Link>
          )}
        </Row>

        <Table<IAppointment>
          columns={userAppointmentColumns}
          dataSource={userAppointments()}
          pagination={false}
          scroll={{ x: 700 }}
        />
      </Col>
    </Row>
  );
}
