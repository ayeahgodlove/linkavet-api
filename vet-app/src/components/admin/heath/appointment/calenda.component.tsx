import { Calendar, CalendarProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { IAppointment } from "models/health/appointment";
import React from "react";
import "./calenda.style.scss";

interface IProp {
  appointments: IAppointment[];
}
const CalendaComponent: React.FC<IProp> = ({ appointments }) => {
  function renderCell(cellValue) {
    const formattedDate = parseAppointmentDate(cellValue.format("YYYY-MM-DD"));
    const hasAppointment = appointments.some(
      (appointment) =>
        parseAppointmentDate(appointment.appointmentDate) === formattedDate
    );

    if (hasAppointment) {
      return (
        <>
            <div className="appointment-marker"> {cellValue.date()} </div>
        </>
      );
    }

    return null;
  }

  return (
    <>
      <div style={{ width: "100%" }}>
        <Calendar fullscreen={false} dateCellRender={renderCell} />
      </div>
    </>
  );
};

export default CalendaComponent;
function parseAppointmentDate(dateString) {
  return new Date(dateString).toLocaleDateString(); // Adjust format as needed
}
