import { UploadFile, message } from "antd";
import { useState } from "react";

export const useUpload = () => {
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);

  const progress = {
    strokeColor: {
      "0%": "#108ee9",
      "100%": "#87d068",
    },
    strokeWidth: 3,
    format: (percent: any) => percent && `${parseFloat(percent.toFixed(2))}%`,
  };

  const onRemove = (file: UploadFile<any>) => {
    setFileList((prevFileList) =>
      prevFileList.filter((item: any) => item.uid !== file.uid)
    );
  };
  const beforeUpload = (file: UploadFile<any>) => {
    const maxSize = 2 * 1024 * 1024; // 2MB
    const fileSize = file.size as number;
    if (fileSize > maxSize) {
      message.error("File must be smaller than 2MB");
      return false;
    }
    setFileList((prevFileList) => [...prevFileList, file]);
    return true;
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onChangeUpload = (info: any) => {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return {
    fileList,
    progress,
    onChangeUpload,
    beforeUpload,
    onRemove,
    normFile,
  };
};
