import { useState } from "react";

// import Select, { components, OptionProps } from "react-select";
import "flatpickr/dist/themes/light.css";
import Flatpickr from "react-flatpickr";
import { RiCloseFill } from "react-icons/ri";
import { Button, Input, Form, Modal, Typography, Row, Col, Select } from "antd";
import { emptyEvent, IEvent } from "../../models/event.model";
import { useEvent } from "hooks/event.hook";
import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

export const isObjEmpty = (obj: IEvent) => Object.keys(obj).length === 0;

const { TextArea } = Input;

interface FooterAddOrUpdateProps {
  selectedEvent: IEvent;
  handleAddEvent: () => void;
  handleResetInputValues: () => void;
  handleUpdateEvent: () => void;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const FooterAddOrUpdate: React.FC<FooterAddOrUpdateProps> = ({
  handleAddEvent,
  handleResetInputValues,
  handleUpdateEvent,
  selectedEvent,
  setIsModalVisible,
}) => {
  if (
    isObjEmpty(selectedEvent) ||
    (!isObjEmpty(selectedEvent) && !selectedEvent.title.length)
  ) {
    return (
      <>
        <Button
          onClick={() => {
            handleAddEvent();
            handleResetInputValues();
          }}
          type="primary"
          block
        >
          Add
        </Button>
      </>
    );
  } else {
    return (
      <>
        <Button
          type="primary"
          onClick={() => {
            setIsModalVisible(true);
            handleResetInputValues();
            handleUpdateEvent();
          }}
          block
        >
          Update
        </Button>
      </>
    );
  }
};

interface FooterCancelOrDeleteProps {
  selectedEvent: IEvent;
  handleDeleteEvent: () => void;
  handleResetInputValues: () => void;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const FooterCancelOrDelete: React.FC<FooterCancelOrDeleteProps> = ({
  handleResetInputValues,
  selectedEvent,
  setIsModalVisible,
  handleDeleteEvent,
}) => {
  if (
    isObjEmpty(selectedEvent) ||
    (!isObjEmpty(selectedEvent) && !selectedEvent.title.length)
  ) {
    return (
      <>
        <Button
          onClick={() => {
            handleResetInputValues();
          }}
          type="primary"
          block
          ghost
        >
          Cancel
        </Button>
      </>
    );
  } else {
    return (
      <>
        <Button
          type="primary"
          onClick={() => {
            setIsModalVisible(true);
            handleResetInputValues();
            handleDeleteEvent();
          }}
          block
          ghost
        >
          Delete
        </Button>
      </>
    );
  }
};

interface IProps {
  calendarApi: any;
  refetchEvents: () => void;
  handleCancel: () => void;
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const AddEventSidebar: React.FC<IProps> = ({
  calendarApi,
  handleCancel,
  isModalVisible,
  refetchEvents,
  setIsModalVisible,
}) => {
  const { addEvent, removeEvent, setEvent, updateEvent, selectedEvent } =
    useEvent();
  const [form] = Form.useForm();

  const [desc, setDesc] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [guests, setGuests] = useState<string[]>([]);
  const [allDay, setAllDay] = useState(false);
  const [endPicker, setEndPicker] = useState<Date>(new Date());
  const [startPicker, setStartPicker] = useState<Date>(new Date());
  const [value, setValue] = useState<string>("Travel");

  const options = [
    { value: "Travel", label: "Travel", badge: "#C903FF" },
    { value: "Social", label: "Social", badge: "#00F7BF" },
    { value: "Work", label: "Work", badge: "#FFC700" },
    { value: "Important", label: "Important", badge: "#FF0022" },
  ];

  const onFinish = () => {
    if (
      isObjEmpty(selectedEvent) ||
      (!isObjEmpty(selectedEvent) && !selectedEvent.title.length)
    ) {
      handleAddEvent();
    } else {
      handleUpdateEvent();
    }
  };

  console.log("value: ", value);
  // Adds New Event
  const handleAddEvent = () => {
    const obj: IEvent = {
      title,
      start: startPicker,
      end: endPicker,
      allDay,
      display: "block",
      extendedProps: {
        calendar: value,
        description: desc.length ? desc : `${undefined}`,
        guests: guests,
        location: location,
      },
      id: "",
      userId: "",
      url: url,
    };
    debugger;
    addEvent(obj);
    refetchEvents();
    handleCancel();
  };

  // Reset Input Values on Close
  const handleResetInputValues = () => {
    setEvent(emptyEvent);
    setTitle("");
    setDesc("");
    setValue("Travel");
    setStartPicker(new Date());
    setEndPicker(new Date());
    setIsModalVisible(false);
  };

  // (UI) updateEventInCalendar
  const updateEventInCalendar = (
    updatedEventData: IEvent,
    propsToUpdate: any,
    extendedPropsToUpdate: any
  ) => {
    const existingEvent = calendarApi.getEventById(updatedEventData.id);

    // Set event properties except date related
    for (let index = 0; index < propsToUpdate.length; index++) {
      const propName = propsToUpdate[index];
      existingEvent.setProp(propName, updatedEventData[propName]);
    }

    // Set date related props
    existingEvent.setDates(updatedEventData.start, updatedEventData.end, {
      allDay: updatedEventData.allDay,
    });

    // Set event's extendedProps
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < extendedPropsToUpdate.length; index++) {
      const propName = extendedPropsToUpdate[index];
      existingEvent.setExtendedProp(
        propName,
        updatedEventData.extendedProps[propName]
      );
    }
  };

  // Updates Event in Store
  const handleUpdateEvent = () => {
    const eventToUpdate: IEvent = {
      id: selectedEvent.id,
      title: selectedEvent.title.length > 0 ? selectedEvent.title : title,
      allDay: selectedEvent.allDay ? selectedEvent.allDay : allDay,
      start:
        selectedEvent.start instanceof Date ? selectedEvent.start : startPicker,
      end: selectedEvent.start instanceof Date ? selectedEvent.end : endPicker,
      extendedProps: {
        description:
          selectedEvent.extendedProps.description.length > 0
            ? selectedEvent.extendedProps.description
            : desc,
        calendar:
          selectedEvent.extendedProps.calendar.length > 0
            ? selectedEvent.extendedProps.calendar
            : value,
        guests:
          selectedEvent.extendedProps.guests.length > 0
            ? selectedEvent.extendedProps.guests
            : guests,
        location:
          selectedEvent.extendedProps.location.length > 0
            ? selectedEvent.extendedProps.location
            : location,
      },
      userId: selectedEvent.userId,
      url: selectedEvent.url.length > 0 ? selectedEvent.url : url,
    };

    const propsToUpdate = ["id", "title"];
    const extendedPropsToUpdate = ["calendar", "description"];

    updateEvent(eventToUpdate);
    updateEventInCalendar(eventToUpdate, propsToUpdate, extendedPropsToUpdate);
    setIsModalVisible(false);
  };

  // (UI) removeEventInCalendar
  const removeEventInCalendar = (eventId: string) => {
    calendarApi.getEventById(eventId).remove();
  };

  const handleDeleteEvent = () => {
    removeEvent(selectedEvent);
    removeEventInCalendar(selectedEvent.id);
    setIsModalVisible(false);
  };

  const modalTitle = (
    <h5 className="modal-title">
      {selectedEvent && selectedEvent.title && selectedEvent.title.length
        ? "Update"
        : "Add"}
      Event
    </h5>
  );

  return (
    <Modal
      open={isModalVisible}
      styles={{
        header: {
          borderBottom: "1px solid #f5f5f5",
        },
      }}
      title={<Typography.Title level={4}>{modalTitle}</Typography.Title>}
      onCancel={() => {
        handleResetInputValues();
        handleCancel();
      }}
      className="hp-modal-p-24"
      footer={
        <Row justify="center" gutter={[18, 18]}>
          <Col span={12}>
            <FooterCancelOrDelete
              handleDeleteEvent={handleDeleteEvent}
              handleResetInputValues={handleResetInputValues}
              selectedEvent={selectedEvent}
              setIsModalVisible={setIsModalVisible}
            />
          </Col>

          <Col span={12}>
            <FooterAddOrUpdate
              handleAddEvent={handleAddEvent}
              handleResetInputValues={handleResetInputValues}
              handleUpdateEvent={handleUpdateEvent}
              selectedEvent={selectedEvent}
              setIsModalVisible={setIsModalVisible}
            />
          </Col>
        </Row>
      }
      centered
      closeIcon={
        <RiCloseFill className="remix-icon text-color-black-100" size={24} />
      }
      width={500}
    >
      <Form
        layout="vertical"
        form={form}
        //was onSubmit before
        onFinish={onFinish}
      >
        <Form.Item label="Event Title :">
          <Input
            id="title"
            name="title"
            style={{ width: "100%" }}
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Item>

        <Row gutter={[16, 16]}>
          <Col sm={24} md={12}>
            <Form.Item label="From :">
              <Flatpickr
                required
                id="startDate"
                name="startDate"
                style={{ width: "100%" }}
                onChange={(date) => setStartPicker(date[0])}
                value={startPicker}
                options={{
                  enableTime: allDay === false,
                  dateFormat: "d M Y - H:i K",
                  static: true,
                }}
              />
            </Form.Item>
          </Col>
          <Col sm={24} md={12}>
            <Form.Item label="To :" style={{ width: "100%" }}>
              <Flatpickr
                required
                id="endDate"
                name="endDate"
                style={{ width: "100%" }}
                onChange={(date) => setEndPicker(date[0])}
                value={endPicker}
                options={{
                  enableTime: allDay === false,
                  dateFormat: "d M Y - H:i K",
                  static: true,
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col sm={24} md={12}>
            <Form.Item label="Event :">
              <Select
                id="label"
                value={value}
                options={options}
                allowClear={true}
                onChange={(value: any) => setValue(value)}
              />
            </Form.Item>
          </Col>
          <Col sm={24} md={12}>
            <Form.Item label="Event Location :">
              <Input
                id="location"
                name="location"
                style={{ width: "100%" }}
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Event Url :">
          <Input
            id="url"
            name="url"
            style={{ width: "100%" }}
            placeholder="Url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Description :">
          <TextArea
            style={{ width: "100%" }}
            name="text"
            id="description"
            rows={4}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Description"
          />
        </Form.Item>

        <Form.List
          name="guests"
          rules={[
            {
              validator: async (_, guests) => {
                if (!guests || guests.length < 1) {
                  return Promise.reject(new Error("At least 3 guests"));
                } else {
                  return Promise.resolve(); // Resolve the Promise when validation passes
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  label={index === 0 ? "Guests" : ""}
                  required={false}
                  key={field.key}
                  style={{ marginBottom: 10 }}
                >
                  <div style={{ display: "flex" }}>
                    <Form.Item
                      {...field}
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: "Please input guest or delete this field.",
                        },
                      ]}
                      style={{ width: "100%" }}
                    >
                      <Input
                        placeholder="guest"
                        onChange={(e) => setGuests([e.target.value])}
                      />
                    </Form.Item>
                    {fields.length > 1 ? (
                      <div style={{ marginLeft: 5 }}>
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => remove(field.name)}
                          style={{ fontSize: 20, opacity: 0.6 }}
                        />
                      </div>
                    ) : null}
                  </div>
                </Form.Item>
              ))}
              <Form.Item style={{ marginBottom: 15 }}>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                >
                  Add guests
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default AddEventSidebar;
