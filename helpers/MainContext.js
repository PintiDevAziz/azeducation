import React, { createContext, useState } from 'react';

export const MainContext = createContext();
export const MainContextProvider = ({ children }) => {
  const [query, setQuery] = useState('');
  const data = {
    query,
    setQuery,
  };
  return <MainContext.Provider value={data}>{children}</MainContext.Provider>;
};
