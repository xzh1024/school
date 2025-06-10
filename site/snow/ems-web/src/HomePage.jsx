import { getToken } from '@api/index';
import storage from '@u/storage';
import React, { useEffect } from 'react';
import App from './App';
import { getParamsByUrl } from './utils/tools';

export default function HomePage() {
  // useEffect(() => {
  //   const code = getParamsByUrl('code');
  //   const token = storage.get(process.env.REACT_APP_TOKEN_FIELD, 'sessionStorage');
  //   if (!token && code) {
  //     getTokenByLdap(code);
  //   }
  // }, []);

  const getTokenByLdap = code => {
    getToken({
      userName: '',
      passWord: '',
      source: 'ldap',
      ldapCode: code
    }).then(res => {
      const data = res.data;
      storage.set(process.env.REACT_APP_TOKEN_FIELD, data.access_token, 'sessionStorage');
      storage.set('refreshToken', data.refresh_token, 'sessionStorage');
    });
  };

  return (
    <>
      <App />
      <div id="faWeb-container"></div>
      <div id="receipt-container"></div>
      <div id="ems-admin-container"></div>
      <div id='image-container-root'></div>
    </>
  );
}
