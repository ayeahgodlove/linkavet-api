import React from 'react';
import { Button } from 'antd';
import "./app-button.less";

export const AppButton = (props) => {
  const { type, className = "", children } = props;

  return (
    <Button type={type} shape='round' className={`app-button ${className}`}>
      {children}
    </Button>
  )
}
