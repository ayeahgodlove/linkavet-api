import { Button, Space } from "antd";
import React, { useState } from "react";
import { FiCopy } from "react-icons/fi";

interface IProp {
  code: string;
}
const CopyToClipboard: React.FC<IProp> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch (error) {
      console.error("Failed to copy code to clipboard:", error);
    }
  };
  return (
    <Space>
      <pre style={{ margin: 0 }}>
        <code>{code}</code>
      </pre>
      <Button type="default" onClick={handleCopyToClipboard}>
        {copied ? "Copied!" : <FiCopy size={20} />}
      </Button>
    </Space>
  );
};

export default CopyToClipboard;
