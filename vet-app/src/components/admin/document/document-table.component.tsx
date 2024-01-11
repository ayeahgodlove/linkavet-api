import React from "react";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import { documentTableColumns } from "./document-column.component";
import { useDocument } from "hooks/document.hook";
import { NoContent } from "components/shared/no-content/no-content.component";
import { IDocument } from "models/document";

type Prop = {
  createDocument: () => void
}
const DocumentTable: React.FC<Prop> = ({ createDocument }) => {
  const { documents, setDocument } = useDocument();
  const router = useNavigate();
  // const route = use
  const handleRowClick = (document: IDocument) => {
    setDocument(document);
    router(`/admin/documents/${document.id}`);
  };

  return (
    <>
      {documents && documents.length ? (
        <Table<IDocument>
          dataSource={documents}
          columns={documentTableColumns}
          size={"small"}
          rowKey={"id"}
          onRow={(record: IDocument) => {
            return {
              onClick: (e) => {
                console.log(e)
                handleRowClick(record);
              },
            };
          }}
        />
      ) : (
        <NoContent
          title="No data for document"
          showButton={true}
          buttonLabel="Add Document"
          handleClick={createDocument}
        />
      )}
    </>
  );
};

export default DocumentTable;
