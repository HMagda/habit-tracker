import React from 'react';

const TokenContext = React.createContext<{
  token: string | undefined;
  setToken: React.Dispatch<React.SetStateAction<string | undefined>>;
}>({
  token: undefined,
  setToken: () => {},
});

export default TokenContext;
