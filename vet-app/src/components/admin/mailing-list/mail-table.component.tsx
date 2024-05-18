import React, { useCallback, useEffect, useRef, useState } from "react";
import { Card, Col, Input, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { IMail } from "../../../models/mail.model";
import { useMail } from "../../../hooks/mail.hook";
import { NoContent } from "../../shared/no-content/no-content.component";
import slugify from "slugify";
import { useDispatch } from "react-redux";
import search from "../../../utils/search";
import { fetchMailSuccess } from "../../../redux/mail.slice";
import { SpinnerComponent } from "../../shared/spinner";
import { useMailColumn } from "./mail-column.component";
import { MailService } from "../../../services/mail.service";

const MailTable: React.FC = () => {
  const { mails, setMail } = useMail();
  const router = useNavigate();
  const { mailTableColumns } = useMailColumn();

  const [query, setQuery] = useState<string>("");
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const getMails = useCallback(async (): Promise<IMail[]> => {
    setLoading(true);
    const response = await MailService.list();
    const { data } = response;

    return data;
  }, []);

  const resultMails: IMail[] = mails.filter((client) =>
    search(client, ["senderEmail"], query, false)
  );

  const onChange = (query: any) => {
    setQuery(query.target.value);
  };

  const inputRef = useRef(null);

  // const route = use
  const handleRowClick = (mail: IMail) => {
    setMail(mail);
    router(`/admin/mails/${slugify(mail.senderEmail, "-")}`);
  };

  useEffect(() => {
    (async () => {
      const mailDATas = await getMails();
      dispatch(fetchMailSuccess([...mailDATas]));
      setLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <SpinnerComponent message="Mails loading..." height="65vh" />;
  }

  return (
    <>
      {mails && mails.length ? (
        <Card
          title={
            <Col xs={24} md={10} lg={6}>
              <Input.Search
                placeholder="Search by email"
                onChange={(mail) => onChange(mail)}
              />
            </Col>
          }
          bordered={false}
          size="small"
        >
          <Table<IMail>
            dataSource={
              resultMails && resultMails.length > 0 ? resultMails : mails
            }
            columns={mailTableColumns}
            style={{ borderRadius: 0 }}
            size={"small"}
            rowKey={"id"}
            onRow={(record: IMail) => {
              return {
                onClick: (e) => {
                  console.log(e);
                  handleRowClick(record);
                },
              };
            }}
            ref={inputRef}
          />
        </Card>
      ) : (
        <NoContent title="No data for mail" buttonLabel="Add Mail" />
      )}
    </>
  );
};

export default MailTable;
