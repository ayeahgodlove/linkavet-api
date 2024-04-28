import  { useState, useEffect } from "react";
import { Layout, Row, Col, Card, Button, Drawer } from "antd";
import { RiMenuFill, RiCloseFill } from "react-icons/ri";

// Component
import Calendar from "./calendar";
import Sidebar from "./sidebar";
import AddEventSidebar from "./add-event-sidebar";

import { useEvent } from "../../hooks/event.hook";
import { emptyEvent, IEvent } from "../../models/event.model";
import "./calendar.less";
import React from "react";
// Colors
const calendarsColor = {
  Travel: "travel",
  Social: "social",
  Work: "work",
  Important: "important",
};

const { Sider, Content } = Layout;

const CalenderComponent: React.FC = () => {
  const [calendarApi, setCalendarApi] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isDrawervisible, setIsDrawerVisible] = useState<boolean>(false);

  const {
    fetchEvent,
  } = useEvent();
  // Redux

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Object
  const blankEvent: IEvent = {
    ...emptyEvent,
    title: "",
    start: new Date(),
    end: new Date(),
    allDay: false,
    extendedProps: {
      calendar: "",
      guests: [],
      location: "",
      description: "",
    },
  };

  // RefetchEvents
  const refetchEvents = () => {
    if (calendarApi !== null) {
      calendarApi.refetchEvents();
    }
  };

  // Fetch Events
  useEffect(() => {
    fetchEvent();
  }, []);

  return (
    <Layout>
      <Drawer
        title=" "
        placement="left"
        closable={true}
        onClose={closeDrawer}
        open={isDrawervisible}
        closeIcon={<RiCloseFill size={24} />}
      >
        <Sidebar
          showModal={showModal}
        />
      </Drawer>

      <Content>
        <Row className="open-calenda-on-mobile">
          <Button
            type="text"
            icon={<RiMenuFill size={24} />}
            onClick={showDrawer}
          />
        </Row>

        <Card bordered={false}>
          <Row>
            <Sider
              // theme={customise.theme == "light" ? "light" : "dark"}
              theme="light"
              width={256}
            >
              <Sidebar
                showModal={showModal}
              />
            </Sider>

            <Col flex="1 1">
              <Calendar
                blankEvent={blankEvent}
                calendarApi={calendarApi}
                calendarsColor={calendarsColor}
                setCalendarApi={setCalendarApi}
                showModal={showModal}
              />
            </Col>
          </Row>
        </Card>

        {/* modal form: add event */}
        <AddEventSidebar
          calendarApi={calendarApi}
          refetchEvents={refetchEvents}
          handleCancel={handleCancel}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      </Content>
    </Layout>
  );
};

export default CalenderComponent;
