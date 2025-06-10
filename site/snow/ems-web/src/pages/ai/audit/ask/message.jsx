import { observer } from 'mobx-react';
import React from 'react';
import Loading from './loading';

function Index(props) {
  const { content, loading, isQuest } = props;
  return (
    <div
      id={`ai-history-${props.id}`}
      className={
        isQuest
          ? 'w-full overflow-hidden flex items-center justify-end mb-[20px] animate__animated animate__fadeInUp'
          : 'w-full overflow-hidden flex items-center mb-[20px] animate__animated animate__fadeInUp'
      }
    >
      <div
        className={
          isQuest
            ? `text-[#fff] bg-[#2C68FF] text-sm font-normal leading-[24px] tracking-[0px] px-[20px] py-3 rounded-2xl rounded-br-none`
            : `text-[#0B0D0F] bg-[#fff] text-sm font-normal leading-[24px] tracking-[0px] px-[20px] py-3 rounded-2xl rounded-bl-none`
        }
      >
        <div className="flex items-center">
          {content}
          {!isQuest && loading && (
            <div className={content ? 'ml-2' : ''}>
              <Loading />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default observer(Index);
