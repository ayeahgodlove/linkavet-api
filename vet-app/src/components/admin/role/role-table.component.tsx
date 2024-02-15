import React, { useCallback, useEffect, useRef, useState } from "react";
import { Card, Col, Input, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { IRole } from "models/role.model";
import { useRole } from "hooks/role.hook";
import { NoContent } from "components/shared/no-content/no-content.component";
import slugify from "slugify";
import { useDispatch } from "react-redux";
import search from "utils/search";
import { fetchRoleSuccess } from "redux/role.slice";
import { SpinnerComponent } from "components/shared/spinner";
import { useRoleColumn } from "./role-column.component";
import { RoleService } from "services/role.service";

const RoleTable: React.FC = () => {
  const { roles, setRole, initialFetch } = useRole();
  const router = useNavigate();
  const { roleTableColumns } = useRoleColumn();

  const [query, setQuery] = useState<string>("");
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const getRoles = useCallback(async (): Promise<IRole[]> => {
    setLoading(true);
    const response = await RoleService.list();
    const { data } = response;

    return data;
  }, []);

  const resultRoles: IRole[] = roles.filter((client) =>
    search(client, ["name"], query, false)
  );

  const onChange = (query: any) => {
    setQuery(query.target.value);
  };

  const inputRef = useRef(null);

  // const route = use
  const handleRowClick = (role: IRole) => {
    setRole(role);
    router(`/admin/roles/${slugify(role.name, "-")}`);
  };

  useEffect(() => {
    (async () => {
      const roleDATas = await getRoles();
      dispatch(fetchRoleSuccess([...roleDATas]));
      setLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <SpinnerComponent message="Roles loading..." height="65vh" />;
  }

  return (
    <>
      {roles && roles.length ? (
        <Card
          title={
            <Col xs={24} md={10} lg={6}>
              <Input.Search
                placeholder="Search by name"
                onChange={(role) => onChange(role)}
              />
            </Col>
          }
          bordered={false}
          size="small"
        >
          <Table<IRole>
            dataSource={
              resultRoles && resultRoles.length > 0 ? resultRoles : roles
            }
            columns={roleTableColumns}
            style={{ borderRadius: 0 }}
            size={"small"}
            rowKey={"id"}
            onRow={(record: IRole) => {
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
        <NoContent title="No data for role" buttonLabel="Add Role" />
      )}
    </>
  );
};

export default RoleTable;
