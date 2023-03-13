import Cookies from 'js-cookie';

export const setCookie = (name: string, value: string, fixPath?: string) => {
  // @ts-ignore
  const path = import.meta?.env?.baseUrl;
  console.log(fixPath, 'fixPath');
  Cookies.set(name, value, {
    expires: 7,
    path: fixPath ? fixPath : `${path}`
  });
};

export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name);
};
