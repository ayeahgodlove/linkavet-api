import React, { useCallback, useEffect, useRef, useState } from "react";
import { Card,  Table } from "antd";
import { useNavigate } from "react-router-dom";
import { IUserDoc } from "../../../models/user-doc.model";
import { useUserDoc } from "../../../hooks/user-doc.hook";
import { NoContent } from "../../shared/no-content/no-content.component";
import slugify from "slugify";
import { useDispatch } from "react-redux";
import { fetchUserDocSuccess } from "../../../redux/user-doc.slice";
import { SpinnerComponent } from "../../shared/spinner";
import { useUserDocColumn } from "./user-doc-column.component";
import { UserDocService } from "../../../services/user-doc.service";

const UserDocTable: React.FC = () => {
  const { userDocs, setUserDoc } = useUserDoc();
  const router = useNavigate();
  const { userDocTableColumns } = useUserDocColumn();

  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const getUserDocs = useCallback(async (): Promise<IUserDoc[]> => {
    setLoading(true);
    const response = await UserDocService.list();
    const { data } = response;

    return data;
  }, []);


  const inputRef = useRef(null);

  // const route = use
  const handleRowClick = (userDoc: IUserDoc) => {
    setUserDoc(userDoc);
    router(`/admin/user-docs/${slugify(userDoc.userId, "-")}`);
  };

  useEffect(() => {
    (async () => {
      const userDocDATas = await getUserDocs();
      dispatch(fetchUserDocSuccess([...userDocDATas]));
      setLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <SpinnerComponent message="UserDocs loading..." height="65vh" />;
  }

  return (
    <>
      {userDocs && userDocs.length ? (
        <Card
          bordered={false}
          size="small"
        >
          <Table<IUserDoc>
            dataSource={userDocs}
            columns={userDocTableColumns}
            style={{ borderRadius: 0 }}
            size={"small"}
            rowKey={"id"}
            onRow={(record: IUserDoc) => {
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
        <NoContent title="No data for Documents" buttonLabel="Add Documents" />
      )}
    </>
  );
};

export default UserDocTable;
