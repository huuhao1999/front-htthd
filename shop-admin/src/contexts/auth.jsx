import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const storedDataUser = localStorage.getItem('webnc_user');
    if (storedDataUser) {
      setUser(JSON.parse(storedDataUser));
      api.defaults.headers.Authorization = user.accessToken;
    }
  }, [user.accessToken]);
  function signOut() {
    setUser({});
    localStorage.removeItem('webnc_user');
  }
  async function signIn(entity) {
    console.log(entity);
    if(entity.email === 'tritrung232@gmail.com' && entity.password === '123456') {
      localStorage.setItem('storeId',1);
      setAuthenticated(true);
      }
  }
  async function signUp(entity) {
    const response = await api.post('/auth/signup', entity);
    return response;
  }
  async function getUser(id) {
    const response = await api.get(`/users/${id}`);
    return response;
  }
  async function otp(token_otp, entity) {
    api.defaults.headers.Authorization = `Bearer ${token_otp}`;
    const response = await api.post('/auth/otp', entity);
    return response;
  }
const users = [{email: 'tritrung232@gmail.com', password: '123456'}, {email: 'abc@gmail.com', password: 'Nguyen Van A'}, {email: 'tritrung@gmail.com', password: 'tritrung'}, {email: 'tritrung123@gmail.com', password: 'tritrung'}]

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        user,
        signIn,
        signUp,
        otp,
        signOut,
        getUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }
  return context;
}

export default AuthContext;
