import React from "react";
import { Card } from "antd";

interface IProps {
  pdfUrl: string;
  pdfName: string;
}
const PdfViewer = ({ pdfUrl, pdfName }: IProps) => {
  return (
    <Card
      title={pdfName}
      bordered={false}
      style={{ width: "100%", height: "100%" }}
      styles={{ body: { padding: 0 } }}
    >
      <iframe
        src={`${pdfUrl}`}
        title={pdfName}
        style={{ width: "100%", height: 300, border: "none" }}
      />
    </Card>
  );
};

export default PdfViewer;
