import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useEffect, useState, useReducer, useContext } from 'react';
import { auth } from '../firebase';
import { AuthContext } from './AuthContext';

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  console.log("Current user in ChatContext:", currentUser?.uid);
  const INITIAL_STATE = {
    chatId: 'null',
    user: {}
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        //add
        if(!currentUser?.uid || !action.payload.uid) {
          console.log('Either current user or selected user UID is missing');
          return state;
        }
        return {
          user: action.payload,
          chatId: currentUser.uid > action.payload.uid
          ? currentUser.uid + action.payload.uid
          : action.payload.uid + currentUser.uid
        };

      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data:state, dispatch }}>
      {children}
      </ChatContext.Provider>
    );
};

export default ChatContextProvider;