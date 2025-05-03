
import {
    createContext,
    useContext,
    useReducer,
  } from "react";
import { AuthContext } from "./AuthProvider";
  
  

  

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [state, dispatch] = useReducer(chatReducer, {
    chatId: "null",
    user: {},
  });

  function chatReducer(state, action) {
    switch (action.type) {
      case "CHANGE_USER":
        const newChatId =
          user.uid > action.payload.uid
            ? user.uid + action.payload.uid
            : action.payload.uid + user.uid;
        return {
          chatId: newChatId,
          user: action.payload,
        };
      default:
        return state;
    }
  }

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
