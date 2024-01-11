// import { useDispatch, useSelector } from "react-redux";
// import { IRootState } from "redux/store";
// import { setSessionAction } from "redux/shared/session.slice";
import React, { useState, createContext, useContext } from "react";

interface Session {
  title: string;
  message: string;
  icon: any; // Adjust this type as per your requirement
  redirectTo: string | null;
  isRedirect: boolean;
}

interface IMessageContext {
  session: Session;
  handleMessageChange: (newSession: Session) => void;
}

const initialSession: Session = {
  title: "",
  message: "",
  icon: null,
  redirectTo: null,
  isRedirect: false,
};

const MessageContext = createContext<IMessageContext>({
  session: initialSession,
  handleMessageChange: () => {}, // Placeholder function
});

export const MessageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, setSession] = useState<Session>(initialSession);
  const handleMessageChange = (newSession: Session) => {
    debugger
    setSession(newSession);
    console.log("new: ", newSession);
  };

  return (
    <MessageContext.Provider value={{ session, handleMessageChange }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessageContext = (): IMessageContext =>
  useContext(MessageContext);

// const useSession = () => {
//   const session = useSelector<
//     IRootState,
//     {
//       title: string;
//       message: string;
//       icon: null | React.ReactNode;
//       redirectTo: null | string;
//       isRedirect: boolean;
//     }
//   >((state) => state.session);

//   const dispatch = useDispatch();

//   const setSession = (session: {
//     title: string;
//     message: string;
//     icon: null | React.ReactNode;
//     redirectTo: null | string;
//     isRedirect: boolean;
//   }) => {
//     dispatch(setSessionAction(session));
//   };

//   return {
//     session,
//     setSession,
//   };
// };

// export { useSession };
