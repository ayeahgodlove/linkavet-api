import React, { useCallback, useEffect, useRef, useState } from "react";
import { Card, Col, Input, Table, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useUserSpecialtyColumn } from "./user-specialty-column.component";
import { IUserSpecialty } from "models/user-specialty.model";
import { useUserSpecialty } from "hooks/user-specialty.hook";
import { NoContent } from "components/shared/no-content/no-content.component";
import { useModalContext } from "context/app-modal.context";
import { useDispatch } from "react-redux";
import { UserSpecialtyForm } from "./user-specialty-form.component";
import { UpdateMode } from "models/shared/update-mode.enum";
import search from "utils/search";
import { fetchUserSpecialtySuccess } from "redux/user-specialty.slice";
import { SpinnerComponent } from "components/shared/spinner";
import slugify from "slugify";
import { API_URL } from "config/constant";

const { Search } = Input;

const UserSpecialtyTable: React.FC = () => {
  const { userSpecialties, setUserSpecialty, initialFetch } =
    useUserSpecialty();
  const { setContent, setShow, setTitle, setWidth } = useModalContext();
  const router = useNavigate();
  const { userSpecialtyTableColumns } = useUserSpecialtyColumn();

  const [query, setQuery] = useState<string>("");
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const createUserSpecialty = () => {
    setTitle("Create a Specialty");
    setWidth("35rem");
    setShow(true);
    setContent(
      <>
        <UserSpecialtyForm formMode={UpdateMode.ADD} isTrue={false} />
      </>
    );
  };

  const getUserSpecialtys = useCallback(async (): Promise<IUserSpecialty[]> => {
    setLoading(true);
    const response = await fetch(`${API_URL}/api/user-specialties`);
    const { data } = await response.json();
    return data;
  }, []);

  const resultUserSpecialtys: IUserSpecialty[] = userSpecialties.filter(
    (client) => search(client, ["specialty"], query, false)
  );

  const onChange = (query: any) => {
    setQuery(query.target.value);
  };

  const inputRef = useRef(null);

  // const route = use
  const handleRowClick = (userSpecialty: IUserSpecialty) => {
    setUserSpecialty(userSpecialty);
    router(`/admin/user-specialties/${slugify(userSpecialty.specialty, "-")}`);
  };

  useEffect(() => {
    (async () => {
      const userSpecialtyDATas = await getUserSpecialtys();
      dispatch(fetchUserSpecialtySuccess([...userSpecialtyDATas]));
      setLoading(false);
    })();
  }, []);

  if (isLoading) {
    return (
      <SpinnerComponent message="UserSpecialtys loading..." height="65vh" />
    );
  }

  return (
    <>
      {userSpecialties && userSpecialties.length ? (
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
          <Table<IUserSpecialty>
            dataSource={
              resultUserSpecialtys && resultUserSpecialtys.length > 0
                ? resultUserSpecialtys
                : userSpecialties
            }
            columns={userSpecialtyTableColumns}
            style={{ borderRadius: 0 }}
            size={"small"}
            rowKey={"id"}
            onRow={(record: IUserSpecialty) => {
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
          buttonLabel="Add UserSpecialty"
          handleClick={createUserSpecialty}
        />
      )}
    </>
  );
};

export default UserSpecialtyTable;
