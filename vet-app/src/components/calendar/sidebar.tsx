import React from "react";

import { Col, Row, Button, Checkbox, Typography } from "antd";

import { RiCalendarEventLine } from "react-icons/ri";
import { useEvent } from "../../hooks/event.hook";

// Filters
const filters = [
  {
    label: "Travel",
    color: "travel",
  },
  {
    label: "Social",
    color: "social",
  },
  {
    label: "Work",
    color: "work",
  },
  {
    label: "Important",
    color: "important",
  },
];
interface IProps {
  showModal: () => void;
}
const Sidebar: React.FC<IProps> = ({ showModal }) => {
  const { updateFilter, selectedCalendars, updateAllFiltersAction } =
    useEvent();

  const handleShowEvent = () => {
    showModal();
  };
  return (
    <Row justify={"center"} style={{ padding: "30px 15px" }}>
      <Col span={24}>
        <h3>Calendar</h3>

        <Button
          type="primary"
          onClick={handleShowEvent}
          block
          style={{ margin: "1.5rem 0" }}
          icon={<RiCalendarEventLine className="remix-icon" size={17} />}
        >
          New Event
        </Button>

        <Typography.Title level={5}>Calendars</Typography.Title>

        <Checkbox
          id="view-all"
          style={{ marginTop: 10 }}
          checked={selectedCalendars.length === filters.length}
          onChange={(e) => updateAllFiltersAction(e.target.checked)}
        >
          Select All
        </Checkbox>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: 180,
          }}
        >
          {filters.length &&
            filters.map((filter, index) => {
              return (
                <Checkbox
                  key={index}
                  id={filter.label}
                  onChange={() => updateFilter(filter.label)}
                  checked={selectedCalendars.includes(filter.label)}
                  defaultChecked={true}
                  className="hp-mb-8"
                  data-color={filter.color}
                >
                  {filter.label}
                </Checkbox>
              );
            })}
        </div>
      </Col>

      <Row
        className="hp-calendar-menu-footer hp-w-100"
        align="bottom"
        justify="center"
      >
        <img src={"/calendar/sidebar.svg"} alt="illustration" />
      </Row>
    </Row>
  );
};

export default Sidebar;
