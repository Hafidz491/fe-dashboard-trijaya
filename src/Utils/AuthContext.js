import {React, useContext, useState, createContext} from 'react';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [token, setToken] = useState(null);
    const [currentUser, setCurrentUser] = useState({});

    function login(token, dataUser) {
        setToken(token);
        setCurrentUser(dataUser)
    }

    function logout() {
        setToken('');
    }

    const value = {
        token,
        login,
        logout,
        currentUser
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
