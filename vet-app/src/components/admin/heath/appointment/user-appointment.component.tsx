import { Card, Col, Empty, Input, Table, Typography } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAppointmentColumn } from "./appointment-column.component";

import { useDispatch } from "react-redux";
import slugify from "slugify";
import { useNavigate } from "react-router-dom";
import search from "utils/search";
import { SpinnerComponent } from "components/shared/spinner";
import { useAppointment } from "hooks/health/appointment.hook";
import { IAppointment } from "models/health/appointment";
import { fetchAppointmentSuccess } from "redux/health/appointment.slice";
import { useAuth } from "hooks/auth/auth.hook";
import { API_URL } from "config/constant";

const { Search } = Input;
export function UserAppointmentTable() {
  const { appointments, setAppointment } = useAppointment();
  const router = useNavigate();
  const { userAppointmentColumns } = useAppointmentColumn();
  const { user } = useAuth();
  const [query, setQuery] = useState<string>("");
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const getAppointments = useCallback(async (): Promise<IAppointment[]> => {
    setLoading(true);
    const response = await fetch(`${API_URL}/api/appointments`);
    const { data } = await response.json();
    return data;
  }, []);

  const resultAppointments: IAppointment[] = appointments
    .filter((a) => a.userId === user.id)
    .filter((appointment) =>
      search(
        appointment,
        ["fullName", "email", "appointmentDate"],
        query,
        false
      )
    );

  const onChange = (query: any) => {
    setQuery(query.target.value);
  };

  const handleRowClick = (appointment: IAppointment) => {
    setAppointment(appointment);
    router(
      `/appointments/${slugify(appointment.fullName, {
        lower: true,
        replacement: "-",
      })}`
    );
  };

  const { Paragraph } = Typography;

  const inputRef = useRef(null);

  useEffect(() => {
    (async () => {
      const appointmentDATas = await getAppointments();
      dispatch(fetchAppointmentSuccess([...appointmentDATas]));
      setLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <SpinnerComponent message="Appointments loading..." height="65vh" />;
  }
  return (
    <>
      {appointments && appointments.length > 0 ? (
        <Card
          title={
            <Col xs={24} md={10} lg={6}>
              <Search
                placeholder="Search by name"
                onChange={(appointment) => onChange(appointment)}
              />
            </Col>
          }
          bordered={false}
          size="small"
        >
          <Table
            size="small"
            columns={userAppointmentColumns}
            dataSource={
              resultAppointments && resultAppointments.length > 0
                ? resultAppointments
                : appointments
            }
            style={{ borderRadius: 0 }}
            rowKey={"id"}
            onRow={(record: IAppointment) => {
              return {
                onClick: () => {
                  handleRowClick(record);
                },
              };
            }}
            ref={inputRef}
          />
        </Card>
      ) : (
        <Empty
          style={{ backgroundColor: "#f3f3f3", padding: "2rem" }}
          description={
            <>
              <Paragraph style={{ marginBottom: 10 }}>
                No appointments at this moment
              </Paragraph>
            </>
          }
        />
      )}
    </>
  );
}
