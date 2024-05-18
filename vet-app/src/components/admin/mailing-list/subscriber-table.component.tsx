import React, { useCallback, useEffect, useRef, useState } from "react";
import { Card, Col, Input, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { ISubscriber } from "../../../models/subscriber.model";
import { useSubscriber } from "../../../hooks/subscriber.hook";
import { NoContent } from "../../shared/no-content/no-content.component";
import slugify from "slugify";
import { useDispatch } from "react-redux";
import search from "../../../utils/search";
import { fetchSubscriberSuccess } from "../../../redux/subscriber.slice";
import { SpinnerComponent } from "../../shared/spinner";
import { useSubscriberColumn } from "./subscriber-column.component";
import { SubscriberService } from "../../../services/subscriber.service";

const SubscriberTable: React.FC = () => {
  const { subscribers, setSubscriber, initialFetch } = useSubscriber();
  const router = useNavigate();
  const { subscriberTableColumns } = useSubscriberColumn();

  const [query, setQuery] = useState<string>("");
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const getSubscribers = useCallback(async (): Promise<ISubscriber[]> => {
    setLoading(true);
    const response = await SubscriberService.list();
    const { data } = response;

    return data;
  }, []);

  const resultSubscribers: ISubscriber[] = subscribers.filter((client) =>
    search(client, ["email"], query, false)
  );

  const onChange = (query: any) => {
    setQuery(query.target.value);
  };

  const inputRef = useRef(null);

  // const route = use
  const handleRowClick = (subscriber: ISubscriber) => {
    setSubscriber(subscriber);
    router(`/admin/subscribers/${slugify(subscriber.email, "-")}`);
  };

  useEffect(() => {
    (async () => {
      const subscriberDATas = await getSubscribers();
      dispatch(fetchSubscriberSuccess([...subscriberDATas]));
      setLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <SpinnerComponent message="Subscribers loading..." height="65vh" />;
  }

  return (
    <>
      {subscribers && subscribers.length ? (
        <Card
          title={
            <Col xs={24} md={10} lg={6}>
              <Input.Search
                placeholder="Search by email"
                onChange={(subscriber) => onChange(subscriber)}
              />
            </Col>
          }
          bordered={false}
          size="small"
        >
          <Table<ISubscriber>
            dataSource={
              resultSubscribers && resultSubscribers.length > 0 ? resultSubscribers : subscribers
            }
            columns={subscriberTableColumns}
            style={{ borderRadius: 0 }}
            size={"small"}
            rowKey={"id"}
            onRow={(record: ISubscriber) => {
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
        <NoContent title="No data for subscriber" buttonLabel="Add Subscriber" />
      )}
    </>
  );
};

export default SubscriberTable;
