import { createContext } from 'react';

export const ConnectContext = createContext({
    isConnect: false,
    userId: null,
    token: null,
    firstname: null,
    isAdmin: 0,
    login: () => {}
});