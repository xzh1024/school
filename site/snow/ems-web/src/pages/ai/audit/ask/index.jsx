import React, { useEffect } from 'react';
import { getAiSession } from '@api/ai';
import { observer } from 'mobx-react';
import useStores from '@s';
import Main from './main';

function Index() {
  const { aiDriverFare: aiStore } = useStores();

  const get_ai_sessioned = async () => {
    const { data } = await getAiSession(sessionStorage.getItem('AI_TOKEN'));
    sessionStorage.setItem('aiSession', data);
    aiStore.aiSession = data;
  };

  useEffect(() => {
    get_ai_sessioned();
    aiStore.getSessionHistoryPage(true);
  }, []);

  return (
    <React.Fragment>
      <Main />
    </React.Fragment>
  );
}

export default observer(Index);
