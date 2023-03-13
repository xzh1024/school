import fs from 'fs';

export default function () {
  return {
    name: 'vite-plugin-local-store-version',
    config(c: any, { mode = '' }) {
      const textName = 'env.production';
      if (mode === 'development') {
        // textName = '.env.development';
        return;
      }
      fs.readFile(textName, 'utf8', (err: any, data: any) => {
        if (err) {
        } else {
          if (data.indexOf('VITE_LOCAL_STORE_VERSION') > -1) {
            const val = data.match(/(VITE_LOCAL_STORE_VERSION=\s*)(\d+)/)?.[2];
            console.log(Number(val) + 1);
            data = data.replace(
              /(VITE_LOCAL_STORE_VERSION\S*\s*)(\d+)/,
              `$1${Number(val) + 1}`
            );
          } else {
            data += `VITE_LOCAL_STORE_VERSION=1 \r`;
          }
          fs.writeFile(textName, data, () => {
            if (err) throw err;
            console.log('writeFile success');
          });
          // console.log(data);
        }
      });
    }
  };
}
