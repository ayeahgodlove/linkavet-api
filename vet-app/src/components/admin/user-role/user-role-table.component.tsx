import React, { useCallback, useEffect, useRef, useState } from "react";
import { Card, Col, Input, Table, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { IUserRole } from "models/user-role.model";
import { useUserRole } from "hooks/user-role.hook";
import { NoContent } from "components/shared/no-content/no-content.component";
import slugify from "slugify";
import { useDispatch } from "react-redux";
import search from "utils/search";
import { fetchUserRoleSuccess } from "redux/user-role.slice";
import { SpinnerComponent } from "components/shared/spinner";
import { useUserRoleColumn } from "./user-role-column.component";
import { UserRoleService } from "services/user-role.service";

const UserRoleTable: React.FC = () => {
  const { userRoles, setUserRole, initialFetch } = useUserRole();
  const router = useNavigate();
  const { userRoleTableColumns } = useUserRoleColumn();

  const [query, setQuery] = useState<string>("");
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const getUserRoles = useCallback(async (): Promise<IUserRole[]> => {
    setLoading(true);
    const response = await UserRoleService.list();
    const { data } = response;

    return data;
  }, []);

  const resultUserRoles: IUserRole[] = userRoles.filter((client) =>
    search(client, ["role"], query, false)
  );

  const onChange = (query: any) => {
    setQuery(query.target.value);
  };

  const { Paragraph } = Typography;

  const inputRef = useRef(null);

  // const route = use
  const handleRowClick = (userRole: IUserRole) => {
    setUserRole(userRole);
    router(`/admin/user-roles/${slugify(userRole.userId, "-")}`);
  };

  useEffect(() => {
    (async () => {
      const userRoleDATas = await getUserRoles();
      dispatch(fetchUserRoleSuccess([...userRoleDATas]));
      setLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <SpinnerComponent message="UserRoles loading..." height="65vh" />;
  }

  return (
    <>
      {userRoles && userRoles.length ? (
        <Card
          title={
            <Col xs={24} md={10} lg={6}>
              <Input.Search
                placeholder="Search by name"
                onChange={(userRole) => onChange(userRole)}
              />
            </Col>
          }
          bordered={false}
          size="small"
        >
          <Table<IUserRole>
            dataSource={
              resultUserRoles && resultUserRoles.length > 0
                ? resultUserRoles
                : userRoles
            }
            columns={userRoleTableColumns}
            style={{ borderRadius: 0 }}
            size={"small"}
            rowKey={"id"}
            onRow={(record: IUserRole) => {
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
        <NoContent title="No data for userRole" buttonLabel="Add UserRole" />
      )}
    </>
  );
};

export default UserRoleTable;
