import { Button, Card, Col, Empty, Input, Table, Typography } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { contactTableColumns } from "./contact-column.component";

import { useDispatch } from "react-redux";
import slugify from "slugify";
import { useModalContext } from "../../../context/app-modal.context";
import { useContact } from "../../../hooks/contact.hook";
import { useNavigate } from "react-router-dom";
import { IContact } from "../../../models/contact";
import search from "../../../utils/search";
import { fetchcontactSuccess } from "../../../redux/contact.slice";
import { SpinnerComponent } from "../../shared/spinner";
import { API_URL } from "../../../config/constant";

const { Search } = Input;
export function ContactTable() {
  const { setContent, setShow, setTitle, setWidth } = useModalContext();
  const { contacts, setContact } = useContact();
  const router = useNavigate();

  const [query, setQuery] = useState<string>("");
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();


  const getContacts = useCallback(async (): Promise<IContact[]> => {
    setLoading(true)
    const response = await fetch(`${API_URL}/api/contacts`);
    const { data } = await response.json();
    return data;
  }, []);

  const resultContacts: IContact[] = contacts.filter((client) =>
    search(client, ["name","email"], query, false)
  );

  const onChange = (query: any) => {
    setQuery(query.target.value)
  }

  const handleRowClick = (contact: IContact) => {
    setContact(contact);
    router(`/admin/contacts/${slugify(contact.name, "-")}`);
  };

  const { Paragraph } = Typography;
  
  const inputRef = useRef(null);
  
  useEffect(() => {
    (async () => {
      const contactDATas = await getContacts();
      dispatch(fetchcontactSuccess([...contactDATas]));
      setLoading(false)
    })();
  }, []);

  if (isLoading) {
    return <SpinnerComponent message="Contacts loading..." height="65vh" />;
  }
  return (
    <>
      {contacts && contacts.length > 0 ? (
        <Card
          title={
            <Col xs={24} md={10} lg={6}>
              <Search placeholder="Search by name" onChange={(contact) => onChange(contact)} />
            </Col>
          }
          bordered={false}
          size="small"
        >
          <Table
            columns={contactTableColumns}
            dataSource={resultContacts && resultContacts.length > 0 ? resultContacts : contacts}
            style={{ borderRadius: 0 }}
            rowKey={"id"}
            onRow={(record: IContact) => {
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
                No contacts at this moment
              </Paragraph>
            </>
          }
        />
      )}
    </>
  );
}
