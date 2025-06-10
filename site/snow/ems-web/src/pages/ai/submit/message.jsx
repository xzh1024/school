import { Button, Upload } from 'antd';
import { observer } from 'mobx-react';
import React, { useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import useStores from '@s';
import Loading from './loading';

let img = false;

function Index(props) {
  const { content, loading, fullWidth, isQuest, showUpload, isHistory, isDisabled } = props;
  const { aiSubmit } = useStores();

  const isUpload = useRef(true);
  const tempId = useRef('');
  const [maxCount, setMaxCount] = useState(9);
  const uploadProps = {
    name: 'file',
    showUploadList: false,
    accept: '.pdf,image/*',
    multiple: true,
    maxCount: maxCount,
    responseType: 'blob',
    beforeUpload(file, fileList) {
      const fileSize = file.size / 1024 / 1024;
      if (fileSize > 10) {
        window.$message.warning('文件大小超出限制，请修改后重新上传！');
        return false;
      }

      if (isUpload.current) {
        isUpload.current = false;
        if (fileList.length > maxCount) {
          window.$message.warning(`最多上传${maxCount}个文件`);
          setTimeout(() => {
            isUpload.current = true;
          }, 500);
          return false;
        }

        const id = uuid();
        tempId.current = id;
        aiSubmit.addContent({
          id,
          answer: '雪宝正在上传文件，请稍等',
          loading: true,
        });
        aiSubmit.disabledBtn('showUpload');
      }

      if (fileList.length > maxCount) {
        return false;
      }
      // aiSubmit.sourceFile = fileList;
      // if (!img) {
      //   aiSubmit.addContent('', true, {
      //     showImg: true
      //   });
      //   img = true;
      // }
      if (aiSubmit.cos) {
        aiSubmit.cos
          .uploadToCos({
            key: 'itportal/dev/' + file.name,
            file: file,
          })
          .then(res => {
            const key = 'itportal/dev/' + file.name;
            const uid = file.uid;
            const fileData = {
              ...res,
              key,
              uid,
              file,
              url: `https://${res.Location}`,
              cosKey: `${res.ETag}_${uuid()}`,
            };
            aiSubmit.fileList.push(fileData);
            aiSubmit.billsList.push({
              file: {
                file: file,
              },
              url: fileData.url,
              cosKey: fileData.cosKey,
            });
            if (fileList.length === aiSubmit.fileList.length) {
              isUpload.current = true;
              aiSubmit.setMessage(tempId.current, {
                loading: false,
                answer: '',
                question: '_notRender',
                fileList: [...aiSubmit.fileList],
              });

              const id = uuid();
              aiSubmit.addContent({
                id,
                answer: '雪宝正在识别发票，请稍等',
                loading: true,
              });
              aiSubmit
                .aiChat(
                  '_notRender',
                  {
                    command: 'bill',
                    resources: aiSubmit.fileList.map(item => {
                      return {
                        cosKey: item.cosKey,
                        url: item.url,
                      };
                    }),
                  },
                  id,
                )
                .then(() => {
                  aiSubmit.fileList = [];
                });
            }
          });
      }
      return false;
    },
  };

  return (
    <div
      id={`ai-history-${props.id}`}
      className={
        isQuest
          ? 'flex items-center justify-end mb-[20px] animate__animated animate__fadeInUp'
          : fullWidth
          ? 'flex items-center mb-[20px] animate__animated animate__fadeInUp'
          : 'flex items-center mb-[20px] animate__animated animate__fadeInUp'
      }
    >
      <div
        className={
          isQuest
            ? `text-[#fff] bg-[#2C68FF] text-sm font-normal leading-[26px] tracking-[0px] px-[20px] py-4  rounded-2xl rounded-br-none`
            : fullWidth
            ? `text-[#0B0D0F] bg-[#fff] text-sm font-normal leading-[26px] tracking-[0px] px-[20px] py-4  rounded-2xl rounded-bl-none`
            : `text-[#0B0D0F] bg-[#fff] text-sm font-normal leading-[26px] tracking-[0px] px-[20px] py-4  rounded-2xl rounded-bl-none`
        }
      >
        <div className="flex items-center">
          <div>{content}</div>
          {!isQuest && loading && (
            <div className={content ? 'ml-2' : ''}>
              <Loading />
            </div>
          )}
        </div>
        {showUpload && !isQuest && !isHistory && !isDisabled && aiSubmit.initData.isStaffVendor !== 'N' && (
          <React.Fragment>
            <Upload {...uploadProps}>
              <Button ghost type="primary" className="rounded-md mt-2">
                上传发票
              </Button>
            </Upload>

            <Button
              ghost
              type="default"
              className="border-[#707B8C] text-[#707B8C] rounded-md ml-2"
              onClick={() => aiSubmit.cancelReimburse(props.id, '取消上传')}
            >
              取消
            </Button>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default observer(Index);
