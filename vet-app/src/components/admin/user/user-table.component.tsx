import React, { useCallback, useEffect, useRef, useState } from "react";
import { Card, Col, Input, Table, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../../models/user.model";
import { useUser } from "../../../hooks/user.hook";
import { NoContent } from "../../../components/shared/no-content/no-content.component";
import slugify from "slugify";
import { useDispatch } from "react-redux";
import search from "../../../utils/search";
import { fetchUserSuccess } from "../../../redux/user.slice";
import { SpinnerComponent } from "../../../components/shared/spinner";
import { useUserColumn } from "./user-column.component";
import { UserService } from "../../../services/user.service";

const UserTable: React.FC = () => {
  const { users, setUser, initialFetch } = useUser();
  const router = useNavigate();
  const { userTableColumns } = useUserColumn();

  const [query, setQuery] = useState<string>("");
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const getUsers = useCallback(async (): Promise<IUser[]> => {
    setLoading(true);
    const response = await UserService.list();
    const { data } = response;

    return data;
  }, []);

  const resultUsers: IUser[] = users.filter((client) =>
    search(
      client,
      [
        "firstname",
        "lastname",
        "username",
        "city",
        "email",
        "phoneNumber",
      ],
      query,
      false
    )
  );

  const onChange = (query: any) => {
    setQuery(query.target.value);
  };

  const { Paragraph } = Typography;

  const inputRef = useRef(null);

  // const route = use
  const handleRowClick = (user: IUser) => {
    setUser(user);
    router(`/admin/users/${slugify(user.username, "-")}`);
  };

  useEffect(() => {
    (async () => {
      const userDATas = await getUsers();
      dispatch(fetchUserSuccess([...userDATas]));
      setLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <SpinnerComponent message="Users loading..." height="65vh" />;
  }

  return (
    <>
      {users && users.length ? (
        <Card
          title={
            <Col xs={24} md={10} lg={6}>
              <Input.Search
                placeholder="Search by name"
                onChange={(user) => onChange(user)}
              />
            </Col>
          }
          bordered={false}
          size="small"
        >
          <Table<IUser>
            dataSource={
              resultUsers && resultUsers.length > 0 ? resultUsers : users
            }
            columns={userTableColumns}
            style={{ borderRadius: 0 }}
            size={"small"}
            rowKey={"id"}
            onRow={(record: IUser) => {
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
        <NoContent title="No data for user" buttonLabel="Add User" />
      )}
    </>
  );
};

export default UserTable;
