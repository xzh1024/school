import React from 'react';
import Left from './left';
import Right from './right';

export default function Index({ hideAction }) {
  return (
    <div className="flex items-center w-full h-[56px] box-border bg-new-header px-5">
      <Left hideAction={hideAction}></Left>
      {!hideAction && <div className="flex-1 text-right">
        <Right></Right>
      </div>}
    </div>
  );
}
