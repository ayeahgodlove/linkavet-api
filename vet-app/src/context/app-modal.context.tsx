import { Modal } from "antd";
import React from "react";
import { useEffect, createContext, FC, useState, useContext } from "react";

interface IAppModalContext {
  show: boolean;
  setShow: (value: boolean) => boolean;
  title: string;
  setTitle: (title: string) => void;
  content: React.ReactNode;
  setContent: (content: React.ReactNode) => void;
  width: string;
  setWidth: (width: string) => void;
  handleSave: () => any;
  setHandleSave: () => any;
}

export const AppModalContext = createContext<IAppModalContext | {}>({});

type Props = {
  children?: React.ReactNode;
};

export const AppModalProvider: FC<Props> = ({ children }) => {
  const [show, setShow] = useState<boolean>(false);
  const [content, setContent] = useState(<p>content here!</p>);
  const [width, setWidth] = useState("30rem");
  const [title, setTitle] = useState("Modal title");
  const [handleSave, setHandleSave] = useState();

  useEffect(() => {}, []);
  return (
    <>
      <AppModalContext.Provider
        value={{
          show,
          setShow,
          title,
          setTitle,
          content,
          setContent,
          width,
          setWidth,
          handleSave,
          setHandleSave,
        }}
      >
        <Modal
          title={title}
          open={show}
          width={width}
          onOk={handleSave}
          onCancel={() => setShow(false)}
          footer={null}
          maskClosable={false}
        >
          {content}
        </Modal>
        {children}
      </AppModalContext.Provider>
    </>
  );
};

export const useModalContext = () =>
  useContext<IAppModalContext>(AppModalContext as any);
