import { Card, Col, Empty, Input, Table, Typography } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useConsultationColumn } from "./consultation-column.component";

import { useDispatch } from "react-redux";
import slugify from "slugify";
import { useNavigate } from "react-router-dom";
import search from "utils/search";
import { SpinnerComponent } from "components/shared/spinner";
import { useConsultation } from "hooks/health/consultation.hook";
import { IConsultation } from "models/health/consultation";
import { fetchConsultationSuccess } from "redux/health/consultation.slice";

const { Search } = Input;
export function ConsultationTable() {
  const { consultations,  setConsultation } = useConsultation();
  const router = useNavigate();
  const { consultationTableColumns } = useConsultationColumn();

  const [query, setQuery] = useState<string>("");
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();


  const getConsultations = useCallback(async (): Promise<IConsultation[]> => {
    setLoading(true);
    const response = await fetch(`/api/consultations`);
    const { data } = await response.json();
    return data;
  }, []);

  const resultConsultations: IConsultation[] = consultations.filter(
    (consultation) => search(consultation, ["diagnosis"], query, false)
  );

  const onChange = (query: any) => {
    setQuery(query.target.value);
  };

  const handleRowClick = (consultation: IConsultation) => {
    setConsultation(consultation);
    router(
      `/admin/consultations/${slugify(consultation.diagnosis, {
        lower: true,
        replacement: "-",
      })}`
    );
  };

  const { Paragraph } = Typography;

  const inputRef = useRef(null);

  useEffect(() => {
    (async () => {
      const consultationDATas = await getConsultations();
      dispatch(fetchConsultationSuccess([...consultationDATas]));
      setLoading(false);
    })();
  }, []);

  if (isLoading) {
    return (
      <SpinnerComponent message="Consultations loading..." height="65vh" />
    );
  }
  return (
    <>
      {consultations && consultations.length > 0 ? (
        <Card
          title={
            <Col xs={24} md={10} lg={6}>
              <Search
                placeholder="Search by name"
                onChange={(consultation) => onChange(consultation)}
              />
            </Col>
          }
          bordered={false}
          size="small"
        >
          <Table
            columns={consultationTableColumns}
            dataSource={
              resultConsultations && resultConsultations.length > 0
                ? resultConsultations
                : consultations
            }
            style={{ borderRadius: 0 }}
            rowKey={"id"}
            onRow={(record: IConsultation) => {
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
                No consultations at this moment
              </Paragraph>
            </>
          }
        />
      )}
    </>
  );
}
