import React, { useEffect, useRef, memo } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { IEvent } from "../../models/event.model";
import { useEvent } from "hooks/event.hook";

interface IProps {
  blankEvent: IEvent;
  calendarApi: any;
  calendarsColor: any;
  setCalendarApi: React.Dispatch<any>;
  showModal: () => void;
}
const Calendar: React.FC<IProps> = ({
  blankEvent,
  calendarApi,
  calendarsColor,
  setCalendarApi,
  showModal,
}) => {
  const {events, setEvent, updateEvent} = useEvent()
  const calendarRef = useRef<any>(null);

  const calendarOptions = {
    events: events.length ? events : [],
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin],
    initialView: "dayGridMonth",
    headerToolbar: {
      start: "prev,next,title",
      end: "dayGridMonth,timeGridWeek,timeGridDay",
    },
    editable: true,
    eventResizableFromStart: true,
    dragScroll: true,
    dayMaxEvents: 2,
    navLinks: true,

    eventClassNames({ event: calendarEvent }) {
      const colorName =
        calendarsColor[calendarEvent._def.extendedProps.calendar];

      return [`bg-light-${colorName}`];
    },

    eventClick({ event: clickedEvent }) {
      setEvent(clickedEvent);
      showModal();
    },

    dateClick(info) {
      const ev = blankEvent;
      ev.start = info.date;
      ev.end = info.date;
      setEvent(ev);
    },

    eventDrop({ event: droppedEvent }) {
      updateEvent(droppedEvent);
    },

    eventResize({ event: resizedEvent }) {
      updateEvent(resizedEvent);
    },

  };

  useEffect(() => {
    if (calendarApi === null) {
      setCalendarApi(calendarRef.current.getApi());
    }
  }, [calendarApi]);

  return <FullCalendar ref={calendarRef} {...calendarOptions} />;
};

export default memo(Calendar);
