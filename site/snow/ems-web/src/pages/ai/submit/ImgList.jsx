import SvgIcon from '@c/svgIcon';
import { Image } from 'antd';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import useStores from '@s';

const ImgList = props => {
  const { imgList, fileList } = props;
  const { aiSubmit } = useStores();

  const [list, setList] = React.useState([]);

  useEffect(() => {
    if (fileList && fileList.length) {
      updateList(fileList);
    }
  }, [fileList]);

  const updateList = async sourceFile => {
    const res = [];
    for (let i = 0; i < sourceFile.length; i++) {
      const file = sourceFile[i];
      const isPdf = file.url.split('.').pop().toLocaleLowerCase() === 'pdf';
      file.isPdf = isPdf;
      res.push(file);
    }
    setList(res);
  };

  // 获取图片base64
  const imgBase64 = file => {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = function (err) {
        reject();
      };
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'center',
      }}
    >
      <Image.PreviewGroup>
        {list.map((image, index) => {
          if (image.isPdf) {
            return <SvgIcon key={index} name="pdf"></SvgIcon>;
          }
          return (
            <Image
              onLoad={() => (aiSubmit.toggleScroll = !!aiSubmit.toggleScroll)}
              key={index}
              src={image.url}
              style={{
                width: '64px',
                height: '64px',
                objectFit: 'cover',
              }}
            />
          );
        })}
      </Image.PreviewGroup>
    </div>
  );
};

export default observer(ImgList);
