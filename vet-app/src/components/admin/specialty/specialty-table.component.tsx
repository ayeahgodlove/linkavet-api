import React, { useCallback, useEffect, useRef, useState } from "react";
import { Card, Col, Input, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { useSpecialtyColumn } from "./specialty-column.component";
import { ISpecialty } from "../../../models/specialty.model";
import { useSpecialty } from "../../../hooks/specialty.hook";
import { NoContent } from "../../shared/no-content/no-content.component";
import { useModalContext } from "../../../context/app-modal.context";
import { useDispatch } from "react-redux";
import { SpecialtyForm } from "./specialty-form.component";
import { UpdateMode } from "../../../models/shared/update-mode.enum";
import search from "../../../utils/search";
import { fetchSpecialtySuccess } from "../../../redux/specialty.slice";
import { SpinnerComponent } from "../../shared/spinner";
import slugify from "slugify";
import { API_URL } from "../../../config/constant";

const { Search } = Input;

const SpecialtyTable: React.FC = () => {
  const { specialties, setSpecialty, initialFetch } =
    useSpecialty();
  const { setContent, setShow, setTitle, setWidth } = useModalContext();
  const router = useNavigate();
  const { specialtyTableColumns } = useSpecialtyColumn();

  const [query, setQuery] = useState<string>("");
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const createSpecialty = () => {
    setTitle("Create a Specialty");
    setWidth("35rem");
    setShow(true);
    setContent(
      <>
        <SpecialtyForm formMode={UpdateMode.ADD} isTrue={false} />
      </>
    );
  };

  const getSpecialtys = useCallback(async (): Promise<ISpecialty[]> => {
    setLoading(true);
    const response = await fetch(`${API_URL}/api/specialties`);
    const { data } = await response.json();
    console.log("data:", response)
    return data;
  }, []);

  const resultSpecialtys: ISpecialty[] = specialties.filter(
    (client) => search(client, ["specialty"], query, false)
  );

  const onChange = (query: any) => {
    setQuery(query.target.value);
  };

  const inputRef = useRef(null);

  // const route = use
  const handleRowClick = (userSpecialty: ISpecialty) => {
    setSpecialty(userSpecialty);
    router(`/admin/user-specialties/${slugify(userSpecialty.specialty, "-")}`);
  };

  useEffect(() => {
    (async () => {
      const userSpecialtyDATas = await getSpecialtys();
      console.log("userSpecialtyDATas: ", userSpecialtyDATas)
      dispatch(fetchSpecialtySuccess([...userSpecialtyDATas]));
      setLoading(false);
    })();
  }, []);

  if (isLoading) {
    return (
      <SpinnerComponent message="Specialtys loading..." height="65vh" />
    );
  }

  return (
    <>
      {specialties && specialties.length ? (
        <Card
          title={
            <Col xs={24} md={10} lg={6}>
              <Search
                placeholder="Search by name"
                onChange={(banner) => onChange(banner)}
              />
            </Col>
          }
          bordered={false}
          size="small"
        >
          <Table<ISpecialty>
            dataSource={
              resultSpecialtys && resultSpecialtys.length > 0
                ? resultSpecialtys
                : specialties
            }
            columns={specialtyTableColumns}
            style={{ borderRadius: 0 }}
            size={"small"}
            rowKey={"id"}
            onRow={(record: ISpecialty) => {
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
        <NoContent
          title="No data for userSpecialty"
          showButton={true}
          buttonLabel="Add Specialty"
          handleClick={createSpecialty}
        />
      )}
    </>
  );
};

export default SpecialtyTable;
